class Tactile.DonutRenderer extends Tactile.RendererBase
  Tactile = window.Tactile or {}
  name: "donut"
  specificDefaults:
    cartesian: false
    minMargin: 10
    unstack: true

  initialize: =>
    @stackedInnerRadius = @series.stackedInnerRadius unless @series.stackedInnerRadius is undefined
    @stackedOuterRadius = @series.stackedOuterRadius unless @series.stackedOuterRadius is undefined
    @innerRadius = @series.innerRadius unless @series.innerRadius is undefined
    @outerRadius = @series.outerRadius unless @series.outerRadius is undefined
    @stackedIndex = @series.stackedIndex unless @series.stackedIndex is undefined

  render: (transition, transitionSpeed) =>
    @_checkData()

    @_setOuterRadius()
    @_setInnerRadius()
    @_setStackedOuterRadius()
    @_setStackedInnerRadius()

    @transition = transition if transition
    @seriesCanvas().selectAll("donut-arc")
      .data(@series.stack).enter().append("path")

    @transition.selectAll(".#{@_nameToId()} path")
      .attr("class", "donut-arc")
      .attr("transform", "translate(#{@_xOffset()},#{@_yOffset()})")
      .attr("d", (d, i) =>
        arc = d3.svg.arc()
          .startAngle(@_startAngle(d, i))
          .endAngle(@_endAngle(d, i))
          .innerRadius(if @unstack then @getInnerRadius() else @getStackedInnerRadius())
          .outerRadius(if @unstack then @getOuterRadius() else @getStackedOuterRadius())()
      )
      .attr("stroke", "white")
      .attr("fill", ((d) -> d.color), "stroke")

    @seriesCanvas().append("svg:text")
      .text(@series.name)
      .attr("class", "donut-label")
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", 15)
      .attr("x", @_xOffset())
      .attr("y", @_yOffset())
      .attr("opacity", if @unstack then 1 else 0)

    @setupTooltips()

  setupTooltips: =>
    if @series.tooltip
      @seriesCanvas().selectAll("path").tooltip (d, i) =>
        color: @series.color
        graph: @graph
        text: @series.tooltip(d)
        gravity: "right"
        displacement: [-10, 0]# because tooltip have left margin 10

  getOuterRadius: =>
    @outerRadius

  getInnerRadius: =>
    @innerRadius

  getStackedOuterRadius: =>
    @stackedOuterRadius

  getStackedInnerRadius: =>
    @stackedInnerRadius

  getMaxOuterRadius: =>
    max = undefined
    @graph.renderers.filter(
      (r) =>
        r.name == @name
    ).forEach((r) =>
      radius = r.getOuterRadius()
      if !isNaN(radius) and radius?
        if !isNaN(max) and max?
          max = radius if max < radius
        else
          max = radius
    )
    max

  getMaxInnerRadius: =>
    max = undefined
    @graph.renderers.filter(
      (r) =>
        r.name == @name
    ).forEach((r) =>
      radius = r.getInnerRadius()
      if !isNaN(radius) and radius?
        if !isNaN(max) and max?
          max = radius if max < radius
        else
          max = radius
    )
    max

  getMaxStackedOuterRadius: =>
    max = undefined
    @graph.renderers.filter(
      (r) =>
        r.name == @name
    ).forEach((r) =>
      radius = r.getStackedOuterRadius()
      if !isNaN(radius) and radius?
        if !isNaN(max) and max?
          max = radius if max < radius
        else
          max = radius
    )
    max

  getMaxStackedInnerRadius: =>
    max = undefined
    @graph.renderers.filter(
      (r) =>
        r.name == @name
    ).forEach((r) =>
      radius = r.getStackedInnerRadius()
      if !isNaN(radius) and radius?
        if !isNaN(max) and max?
          max = radius if max < radius
        else
          max = radius
    )
    max

  stackTransition: (transition, transitionSpeed) =>
    return unless @unstack
    @unstack = false
    xMargin = (@graph.width() - @getMaxStackedOuterRadius() * 2) / 2
    yMargin = (@graph.height() - @getMaxStackedOuterRadius() * 2) / 2

    xOffset = xMargin + @getMaxStackedOuterRadius() + (@getMaxStackedOuterRadius() - @getMaxOuterRadius()) * Math.cos((2 * Math.PI / @_donutsCount()) * @_donutIndex() - Math.PI / 2)
    yOffset = yMargin + @getMaxStackedOuterRadius() + (@getMaxStackedOuterRadius() - @getMaxOuterRadius()) * Math.sin((2 * Math.PI / @_donutsCount()) * @_donutIndex() - Math.PI / 2)

    transition.selectAll(".#{@_nameToId()} path")
      .duration(transitionSpeed / 3)
      .attr("transform", "translate(#{xOffset},#{yOffset})")

    transition.selectAll(".#{@_nameToId()} text.donut-label")
      .duration(transitionSpeed / 3)
      .attr("x", xOffset)
      .attr("y", yOffset)

    transition.selectAll(".#{@_nameToId()} text.donut-label")
      .delay(transitionSpeed / 3)
      .duration(transitionSpeed / 3)
      .attr("opacity", 0)

    transition.selectAll(".#{@_nameToId()} path")
      .delay(transitionSpeed * 2 / 3)
      .duration(transitionSpeed / 3)
      .attr("transform", "translate(#{@_xOffset()},#{@_yOffset()})")
      .attrTween("d", (d, i) =>
        iInnerRadius = d3.interpolate(@getInnerRadius(), @getStackedInnerRadius())
        iOuterRadius = d3.interpolate(@getOuterRadius(), @stackedOuterRadius)
        iStartAngle = d3.interpolate(@_startAngle(d, i, true), @_startAngle(d, i, false))
        iEndAngle = d3.interpolate(@_endAngle(d, i, true), @_endAngle(d, i, false))
        (t) =>
          d3.svg.arc()
            .startAngle(iStartAngle(t))
            .endAngle(iEndAngle(t))
            .innerRadius(iInnerRadius(t))
            .outerRadius(iOuterRadius(t))()
      )


  unstackTransition: (transition, transitionSpeed) =>
    return if @unstack
    @unstack = true
    xMargin = (@graph.width() - @getMaxStackedOuterRadius() * 2) / 2
    yMargin = (@graph.height() - @getMaxStackedOuterRadius() * 2) / 2

    xOffset = xMargin + @getMaxStackedOuterRadius() + (@getMaxStackedOuterRadius() - @getMaxOuterRadius()) * Math.cos((2 * Math.PI / @_donutsCount()) * @_donutIndex(false) - Math.PI / 2)
    yOffset = yMargin + @getMaxStackedOuterRadius() + (@getMaxStackedOuterRadius() - @getMaxOuterRadius()) * Math.sin((2 * Math.PI / @_donutsCount()) * @_donutIndex(false) - Math.PI / 2)

    transition.selectAll(".#{@_nameToId()} path")
      .duration(transitionSpeed / 3)
      .attr("transform", "translate(#{xOffset},#{yOffset})")
      .attrTween("d", (d, i) =>
        iInnerRadius = d3.interpolate(@getStackedInnerRadius(), @getInnerRadius())
        iOuterRadius = d3.interpolate(@getStackedOuterRadius(), @getOuterRadius())
        iStartAngle = d3.interpolate(@_startAngle(d, i, false), @_startAngle(d, i, true))
        iEndAngle = d3.interpolate(@_endAngle(d, i, false), @_endAngle(d, i, true))
        (t) =>
          d3.svg.arc()
            .startAngle(iStartAngle(t))
            .endAngle(iEndAngle(t))
            .innerRadius(iInnerRadius(t))
            .outerRadius(iOuterRadius(t))()
      )
    transition.selectAll(".#{@_nameToId()} text.donut-label")
      .duration(transitionSpeed / 3)
      .attr("x", xOffset)
      .attr("y", yOffset)

    transition.selectAll(".#{@_nameToId()} text.donut-label")
      .delay(transitionSpeed / 3)
      .duration(transitionSpeed / 3)
      .attr("opacity", 1)

    transition.selectAll(".#{@_nameToId()} path")
      .delay(transitionSpeed * 2 / 3)
      .duration(transitionSpeed / 3)
      .attr("transform", "translate(#{@_xOffset()},#{@_yOffset()})")

    transition.selectAll(".#{@_nameToId()} text.donut-label")
      .delay(transitionSpeed * 2 / 3)
      .duration(transitionSpeed / 3)
      .attr("x", @_xOffset())
      .attr("y", @_yOffset())

  _donutsPerLine: =>
    Math.floor (@graph.width() - @minMargin) / (@getMaxOuterRadius() * 2 + @minMargin)

  _xOffset: =>
    if @unstack
      xMargin = (@graph.width() - @_donutsInLine(@_lineIndex()) * @getMaxOuterRadius() * 2) / (@_donutsInLine(@_lineIndex()) + 1)
      xOffset = @_indexInLine() * (xMargin + @getMaxOuterRadius() * 2) + xMargin + @getMaxOuterRadius()
    else
      xMargin = (@graph.width() - @getMaxStackedOuterRadius() * 2) / 2
      xOffset = xMargin + @getMaxStackedOuterRadius()

  _yOffset: =>
    if @unstack
      yMargin = (@graph.height() - @_linesCount() * @getMaxOuterRadius() * 2) / (@_linesCount() + 1)
      yOffset = @_lineIndex() * (yMargin + @getMaxOuterRadius() * 2) + yMargin + @getMaxOuterRadius()
    else
      yMargin = (@graph.height() - @getMaxStackedOuterRadius() * 2) / 2
      yOffset = yMargin + @getMaxStackedOuterRadius()

  _startAngle: (d, i, unstack) =>
    unstack = @unstack if unstack is undefined
    dataAmount = 0
    @series.stack.forEach((d) =>
      dataAmount += d.value if !isNaN(d.value) and d.value?
    )

    if unstack
      scal = d3.scale.linear()
        .domain([0, dataAmount])
        .range([0, 2 * Math.PI])
      arcStartAngle = 0
    else
      scal = d3.scale.linear()
        .domain([0, dataAmount])
        .range([0, 2 * Math.PI / @_donutsCount() - 0.04])
      arcStartAngle = (2 * Math.PI / @_donutsCount()) * @_donutIndex(unstack) - Math.PI / @_donutsCount()

    k = 0
    while k < i
      arcStartAngle += scal(@series.stack[k].value) if !isNaN(@series.stack[k].value) and @series.stack[k].value?
      k++
    arcStartAngle

  _endAngle: (d, i, unstack) =>
    unstack = @unstack if unstack is undefined
    dataAmount = 0
    @series.stack.forEach((d) =>
      dataAmount += d.value if !isNaN(d.value) and d.value?
    )

    if unstack
      scal = d3.scale.linear()
        .domain([0, dataAmount])
        .range([0, 2 * Math.PI])
      arcEndAngle = 0
    else
      scal = d3.scale.linear()
        .domain([0, dataAmount])
        .range([0, 2 * Math.PI / @_donutsCount() - 0.04])
      arcEndAngle = (2 * Math.PI / @_donutsCount()) * @_donutIndex(unstack) - Math.PI / @_donutsCount()

    k = 0
    while k <= i
      arcEndAngle += scal(@series.stack[k].value) if !isNaN(@series.stack[k].value) and @series.stack[k].value?
      k++
    arcEndAngle

  _donutIndex: (unstack) =>
    unstack = @unstack if unstack is undefined
    if unstack || (@stackedIndex is undefined)
      return 0 if @rendererIndex == 0 || @rendererIndex is undefined
      renderers = @graph.renderers.slice(0, @rendererIndex)
      _.filter(renderers,(r) => r.name == @name).length
    else
      @stackedIndex


  _lineIndex: =>
    Math.floor @_donutIndex() / @_donutsPerLine()

  _linesCount: =>
    Math.ceil @_donutsCount() / @_donutsPerLine()

  _donutsCount: =>
    @graph.series.filter(
      (d) =>
        d.renderer == @name
    ).length()

  _donutsInLine: (lineIndex) =>
    lineCount = Math.ceil @_donutsCount() / @_donutsPerLine()
    if (lineIndex >= lineCount)
      0
    else if lineIndex is (lineCount - 1)
      @_donutsCount() - lineIndex * @_donutsPerLine()
    else
      @_donutsPerLine()

  _indexInLine: =>
    Math.floor @_donutIndex() - @_lineIndex() * @_donutsPerLine()

  _calculateOuterRadius: =>
    donutsCount = @_donutsCount()
    width = @graph.width()
    height = @graph.height()
    margin = @minMargin
    lastRadius = 0
    linesCount = 1

    loop
      donutsInLine = Math.ceil donutsCount / linesCount
      donutWidth = ((width - margin) / donutsInLine) - margin
      donutHeig  = ((height - margin) / linesCount) - margin
      newRadius = Math.min(donutWidth, donutHeig)
      newRadius = newRadius / 2
      if newRadius > lastRadius
        lastRadius = newRadius
        linesCount++
      else
        break

    lastRadius

  _setOuterRadius: =>
    if isNaN(@outerRadius) or !@outerRadius?
      @outerRadius = @getMaxOuterRadius()
      if isNaN(@outerRadius) or !@outerRadius?
        @outerRadius = @_calculateOuterRadius()

  _setInnerRadius: =>
    if isNaN(@innerRadius) or !@innerRadius?
      @innerRadius = @getMaxInnerRadius()
      if isNaN(@innerRadius) or !@innerRadius?
        @innerRadius = @getOuterRadius() * 0.6

  _setStackedOuterRadius: =>
    if isNaN(@stackedOuterRadius) or !@stackedOuterRadius?
      @stackedOuterRadius = @getMaxStackedOuterRadius()
      if isNaN(@getMaxStackedOuterRadius()) or !@stackedOuterRadius?
        @stackedOuterRadius = (Math.min(@graph.width(), @graph.height()) - @minMargin*2) / 2

  _setStackedInnerRadius: =>
    if isNaN(@stackedInnerRadius) or !@stackedInnerRadius?
      @stackedInnerRadius = @getMaxStackedInnerRadius()
      if isNaN(@stackedInnerRadius) or !@stackedInnerRadius?
        @stackedInnerRadius = @getStackedOuterRadius() * 0.6

  _checkData: ()=>
    data = @series.stack
    data.forEach((d, i) =>
      @utils.checkNumber(d.value, "#{@name} renderer data[#{i}].value")
      @utils.checkString(d.color, "#{@name} renderer data[#{i}].color")
    )

