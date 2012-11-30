module.exports = class HoverDetailMulti

  constructor: (args) ->
    graph = @graph = args.graph
    @option = args.option
    @xFormatter = (x) ->
      new Date(x * 1000).toUTCString()

    @yFormatter = (y) ->
      y.toFixed 2

    element = @element = document.createElement("div")
    element.className = "detail"
    @visible = true
    graph.element.appendChild element
    @lastEvent = null
    @_addListeners()
    @onShow = args.onShow
    @onHide = args.onHide
    @onRender = args.onRender
    @formatter = @formatter
    position = $(graph.element).find('g:first').position()

  formatter: (series, x, y, formattedX, formattedY) ->
    series.name + ":&nbsp;" + formattedY

  update: (e) =>
    hoverDetail = this
    graph = hoverDetail.graph
    e = e or hoverDetail.lastEvent
    return unless e
    hoverDetail.lastEvent = e
    return unless e.target.nodeName.match(/^(path|svg|rect)$/)
    eventX = e.offsetX or e.layerX
    eventY = e.offsetY or e.layerY
    origin = hoverDetail.getStatus()
    target = hoverDetail.targetIndex(e)
    dataIndex = target.index
    defaultRenderer = graph.defaultRenderer or "stack"
    seriesGroup = {}
    rendererOrder = ["stack", "area", "line", "draggableLine", "scatterplot", "bar"]
    graph.order.forEach (order) ->
      index = rendererOrder.indexOf(order)
      if index >= 0
        rendererOrder.splice index, 1
        rendererOrder.push order

    graph.series.forEach (series) ->
      rendererName = defaultRenderer
      return if series.disabled
      rendererName = series.renderer if series.hasOwnProperty("renderer")
      unless seriesGroup.hasOwnProperty(rendererName)
        seriesGroup[rendererName] =
          series: []
          element: null
      seriesGroup[rendererName].series.push series

    element = hoverDetail.element
    option = hoverDetail.option
    element.innerHTML = ""
    rendererOrder.forEach (rendererName) ->
      return unless seriesGroup.hasOwnProperty(rendererName)
      return if target.renderer isnt rendererName
      series = seriesGroup[rendererName]
      graph.series = series.series
      
      graph.series.active = ->
        graph.series.filter (s) ->
          not s.disabled


      stackedData = graph.stackData()
      graph.discoverRange()
      position = $(graph.element).find("g.#{rendererName}").position()
      hoverDetail.setParam option[rendererName]
      return unless stackedData[0][dataIndex]
      domainX = stackedData[0][dataIndex].x
      formattedXValue = hoverDetail.xFormatter(domainX)
      graphX = graph.x(domainX)
      order = 0
      detail = graph.series.active().map((s) ->
        order: order++
        series: s
        name: s.name
        value: s.stack[dataIndex]
      )
      activeItem = undefined
      sortFn = (a, b) ->
        (a.value.y0 + a.value.y) - (b.value.y0 + b.value.y)

      domainMouseY = graph.y.magnitude.invert(graph.element.offsetHeight - eventY)
      detail.sort(sortFn).forEach ((d) ->
        d.formattedYValue = (if (hoverDetail.yFormatter.constructor is Array) then hoverDetail.yFormatter[detail.indexOf(d)](d.value.y) else hoverDetail.yFormatter(d.value.y))
        d.graphX = graphX
        d.graphY = graph.y(d.value.y0 + d.value.y)
        if domainMouseY > d.value.y0 and domainMouseY.toFixed() - 1 < d.value.y0 + d.value.y and not activeItem
          activeItem = d
          d.active = true
      ), hoverDetail

      left = graph.x(domainX)
      element.style.left = left + "px"
      if hoverDetail.visible
        hoverDetail.render
          detail: detail
          domainX: domainX
          formattedXValue: formattedXValue
          mouseX: eventX
          mouseY: eventY


    hoverDetail.putStatus origin

  targetIndex: (e) ->
    target = {}

    e = e or @lastEvent
    return unless e
    @lastEvent = e
    return unless e.target.nodeName.match(/^(path|svg|rect)$/)
    hoverDetail = this
    graph = hoverDetail.graph
    eventX = e.offsetX or e.layerX
    eventY = e.offsetY or e.layerY
    leftOffset = eventX
    leftOffset = if leftOffset > 0 then leftOffset else 0
    domainX = graph.x.invert(leftOffset)
    stackedData = graph.stackedData
    topSeriesData = stackedData.slice(-1).shift()
    domainIndexScale = d3.scale.linear().domain([topSeriesData[0].x, topSeriesData.slice(-1).shift().x + 1]).range([0, topSeriesData.length])
    approximateIndex = Math.floor(domainIndexScale(domainX))
    dataIndex = approximateIndex or 0
    i = approximateIndex

    while i < stackedData[0].length - 1
      break if not stackedData[0][i] or not stackedData[0][i + 1]
      if stackedData[0][i].x <= domainX and stackedData[0][i + 1].x > domainX
        stackedData[0][i].x
        dataIndex = i
        break
      if stackedData[0][i + 1].x <= domainX
        i++
      else
        i--
    
    
    target.index = dataIndex
    return target unless stackedData[0][dataIndex]
    domainX = stackedData[0][dataIndex].x
    formattedXValue = @xFormatter(domainX)
    graphX = graph.x(domainX)
    order = 0
    detail = graph.series.active().map((s) ->
      order: order++
      series: s
      name: s.name
      value: s.stack[dataIndex]
    )
    activeItem = undefined
    sortFn = (a, b) ->
      (a.value.y0 + a.value.y) - (b.value.y0 + b.value.y)

    domainMouseY = graph.y.magnitude.invert(graph.element.offsetHeight - eventY)
    detail.sort(sortFn).forEach ((d) ->
      d.formattedYValue = (if (@yFormatter.constructor is Array) then @yFormatter[detail.indexOf(d)](d.value.y) else @yFormatter(d.value.y))
      d.graphX = graphX
      d.graphY = graph.y(d.value.y0 + d.value.y)
      activeItem = d
      d.active = true
    ), this
    
    target.renderer = activeItem.series.renderer if activeItem
    target

  hide: ->
    @visible = false
    @element.classList.add "inactive"
    @onHide()  if typeof @onHide is "function"

  show: ->
    @visible = true
    @element.classList.remove "inactive"
    @onShow()  if typeof @onShow is "function"

  render: (args) ->
    element = @element
    detail = args.detail
    domainX = args.domainX
    mouseX = args.mouseX
    mouseY = args.mouseY
    formattedXValue = args.formattedXValue
    xLabel = document.createElement("div")
    xLabel.className = "x_label"
    xLabel.innerHTML = formattedXValue
    element.appendChild xLabel
    detail.forEach ((d) ->
      item = document.createElement("div")
      item.className = "item"
      item.innerHTML = @formatter(d.series, domainX, d.value.y, formattedXValue, d.formattedYValue)
      item.style.top = @graph.y(d.value.y0 + d.value.y) + "px"
      element.appendChild item
      dot = document.createElement("div")
      dot.className = "dot"
      dot.style.top = item.style.top
      dot.style.borderColor = d.series.color
      element.appendChild dot
      if d.active
        item.className = "item active"
        dot.className = "dot active"
    ), this
    @show()
    @onRender args  if typeof @onRender is "function"

  _addListeners: ->
    @graph.element.addEventListener "mousemove", ((e) ->
      @visible = true
      @update e)
    .bind(this), false
    @graph.onUpdate (() ->
      @update())
    .bind(this)
    @graph.element.addEventListener "mouseout", ((e) ->
      @hide()  if e.relatedTarget and not (e.relatedTarget.compareDocumentPosition(@graph.element) & Node.DOCUMENT_POSITION_CONTAINS))
    .bind(this), false

  getStatus: ->
    graph = @graph
    origin_renderer = graph.renderer
    origin_series = graph.series
    origin_vis = graph.vis
    origin_stackedData = graph.stackedData
    origin_x = graph.x
    origin_y = graph.y
    renderer: origin_renderer
    series: origin_series
    vis: origin_vis
    stackedData: origin_stackedData
    x: origin_x
    y: origin_y

  putStatus: (status) ->
    graph = @graph
    graph.renderer = status["renderer"]  if status.hasOwnProperty("renderer")
    graph.series = status["series"]  if status.hasOwnProperty("series")
    graph.vis = status["vis"]  if status.hasOwnProperty("vis")
    graph.stackedData = status["stackedData"]  if status.hasOwnProperty("stackedData")
    graph.x = status["x"]  if status.hasOwnProperty("x")
    graph.y = status["y"]  if status.hasOwnProperty("y")

  setParam: (param) ->
    if param
      @onShow = param.onShow
      @onHide = param.onHide
      @onRender = param.onRender
      @xFormatter = param.xFormatter or (x) ->
        new Date(x * 1000).toUTCString()

      @yFormatter = param.yFormatter or (y) ->
        y.toFixed 2

      @formatter = param.formatter or @formatter
    else
      @onShow = @onHide = @onRender = null
      @xFormatter = (x) ->
        new Date(x * 1000).toUTCString()

      @yFormatter = (y) ->
        y.toFixed 2

      @formatter = @formatter
