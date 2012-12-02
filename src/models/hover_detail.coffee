module.exports = class HoverDetail
  defaults: 
    showXlabel: true

  constructor: (args) ->
    args = _.extend({}, @defaults, args)
    graph = @graph = args.graph
    @xFormatter = args.xFormatter or (x) ->
      new Date(x * 1000).toUTCString()

    @yFormatter = args.yFormatter or (y) ->
      y.toFixed 2

    @showXlabel = args.showXlabel
    element = @element = document.createElement("div")
    element.className = "detail"
    element.classList.add "no-line" unless @showXlabel
    
    @visible = true
    graph.element.appendChild element
    @lastEvent = null
    @_addListeners()
    @onShow = args.onShow
    @onHide = args.onHide
    @onRender = args.onRender
    @formatter = args.formatter or @formatter

  formatter: (series, x, y, formattedX, formattedY, d) ->
    series.name + ":&nbsp;" + formattedY

  update: (e) ->
    e = e or @lastEvent
    return unless e
    @lastEvent = e
    return unless e.target.nodeName.match(/^(path|svg|rect)$/)
    graph = @graph
    
    eventX = e.offsetX or e.layerX
    eventY = e.offsetY or e.layerY
    leftOffset = eventX
    leftOffset = if leftOffset > 0 then leftOffset else 0
    domainX = graph.x.invert(leftOffset)
    stackedData = graph.stackedData
    topSeriesData = stackedData.slice(-1).shift()
    domainIndexScale = d3.scale.linear().domain([topSeriesData[0].x, topSeriesData.slice(-1).shift().x + 1]).range([0, topSeriesData.length])
    approximateIndex = Math.floor(domainIndexScale(domainX))
    dataIndex = Math.min(approximateIndex or 0, stackedData[0].length - 1)
    i = approximateIndex
    
    while i < stackedData[0].length - 1
      break if not stackedData[0][i] or not stackedData[0][i + 1]
      if stackedData[0][i].x <= domainX and stackedData[0][i + 1].x > domainX
        dataIndex = i
        break
      if stackedData[0][i + 1].x <= domainX
        i++
      else
        i--

    domainX = stackedData[0][dataIndex].x
    formattedXValue = @xFormatter(domainX)
    graphX = graph.x(domainX)
    order = 0
    detail = graph.series.map (s) ->
      order: order++
      series: s
      name: s.name
      value: s.stack[dataIndex]
    
    activeItem = undefined
    sortFn = (a, b) ->
      (a.value.y0 + a.value.y) - (b.value.y0 + b.value.y)

    domainMouseY = graph.y.magnitude.invert(graph.element.offsetHeight - eventY)
    detail.sort(sortFn).forEach ((d) ->
      d.formattedYValue = (if (@yFormatter.constructor is Array) then @yFormatter[detail.indexOf(d)](d.value.y) else @yFormatter(d.value.y))
      d.graphX = graphX
      d.graphY = graph.y(d.value.y0 + d.value.y)
      if domainMouseY > d.value.y0 and domainMouseY < d.value.y0 + d.value.y and not activeItem
        activeItem = d
        d.active = true
    ), @
    @element.innerHTML = ""
    
    left = graph.x(domainX)
    @element.style.left = left + "px"
    if @visible
      @render
        detail: detail
        domainX: domainX
        formattedXValue: formattedXValue
        mouseX: eventX
        mouseY: eventY


  hide: ->
    @visible = false
    @element.classList.add "inactive"
    @onHide()  if typeof @onHide is "function"

  show: ->
    @visible = true
    @element.classList.remove "inactive"
    @onShow() if typeof @onShow is "function"

  render: (args) ->
    detail = args.detail
    domainX = args.domainX
    mouseX = args.mouseX
    mouseY = args.mouseY
    formattedXValue = args.formattedXValue
    xLabel = document.createElement("div")
    xLabel.className = "x_label"
    xLabel.innerHTML = formattedXValue
    
    if @showXlabel
      @element.appendChild xLabel
      
    detail.forEach ((d) ->
      item = document.createElement("div")
      item.className = "item"
      item.innerHTML = @formatter(d.series, domainX, d.value.y, formattedXValue, d.formattedYValue, d)
      item.style.top = @graph.y(d.value.y0 + d.value.y) + "px"
      @element.appendChild item
      dot = document.createElement("div")
      dot.className = "dot"
      dot.style.top = item.style.top
      dot.style.borderColor = d.series.color
      @element.appendChild dot
      if d.active
        item.className = "item active"
        dot.className = "dot active"
    ), @
    @show()
    @onRender args  if typeof @onRender is "function"

  _addListeners: ->
    @graph.element.addEventListener("mousemove", ((e) ->
      @visible = true
      @update e
    ).bind(@), false)
    
    @graph.onUpdate (() =>
      @update()
    ).bind(@)
    
    @graph.element.addEventListener "mouseout", ((e) ->
      @hide() if e.relatedTarget and not (e.relatedTarget.compareDocumentPosition(@graph.element) & Node.DOCUMENT_POSITION_CONTAINS)
    ).bind(@), false