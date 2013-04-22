class Tactile.DonutRenderer extends Tactile.RendererBase
  Tactile = window.Tactile or {}
  name: "donut"
  specificDefaults:
    cartesian: false
    minMargin: 20
    unstack: true
    stackedInnerRadius: 200
    stackedOuterRadius: 330
    innerRadius: 70
    outerRadius: 120

  initialize: =>
    @stackedInnerRadius = @series.stackedInnerRadius unless @series.stackedInnerRadius is undefined
    @stackedOuterRadius = @series.stackedOuterRadius unless @series.stackedOuterRadius is undefined
    @innerRadius = @series.innerRadius unless @series.innerRadius is undefined
    @outerRadius = @series.outerRadius unless @series.outerRadius is undefined
    @stackedIndex = @series.stackedIndex unless @series.stackedIndex is undefined

  render: (transition, transitionSpeed) =>
    @transition = transition if transition
    @seriesCanvas().selectAll("donut-arc")
      .data(@series.stack).enter().append("path")

    @transition.selectAll("##{@_nameToId()} path")
      .attr("class", "donut-arc")
      .attr("transform", "translate(#{@_xOffset()},#{@_yOffset()})")
      .attr("d", (d, i) =>
        arc = d3.svg.arc()
          .startAngle(@_startAngle(d, i))
          .endAngle(@_endAngle(d, i))
          .innerRadius(if @unstack then @innerRadius else @stackedInnerRadius)
          .outerRadius(if @unstack then @outerRadius else @stackedOuterRadius)()
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

  getInnerRadius: =>
    @innerRadius

  getOuterRadius: =>
    @outerRadius

  getStackedRadius: =>
    @stackedOuterRadius

  getMaxStackedOuterRadius: =>
    max = 0;
    renderers = @graph.renderers
    _.filter(renderers,(r) => r.name == @name).forEach((r) =>
      max = r.getStackedRadius() if max < r.getStackedRadius()
    )
    max

  getMaxOuterRadius: =>
    max = 0;
    @graph.renderers.filter(
      (r) =>
        r.name == @name
    ).forEach((r) =>
      max = r.outerRadius if max < r.outerRadius
    )
    max

  stackTransition: (transition, transitionSpeed) =>
    return unless @unstack
    @unstack = false
    xMargin = (@graph.width() - @getMaxStackedOuterRadius() * 2) / 2
    yMargin = (@graph.height() - @getMaxStackedOuterRadius() * 2) / 2

    xOffset = xMargin + @getMaxStackedOuterRadius() + (@getMaxStackedOuterRadius() - @getMaxOuterRadius()) * Math.cos((2 * Math.PI / @_donutsCount()) * @_donutIndex() - Math.PI / 2)
    yOffset = yMargin + @getMaxStackedOuterRadius() + (@getMaxStackedOuterRadius() - @getMaxOuterRadius()) * Math.sin((2 * Math.PI / @_donutsCount()) * @_donutIndex() - Math.PI / 2)

    transition.selectAll("##{@_nameToId()} path")
      .duration(transitionSpeed / 3)
      .attr("transform", "translate(#{xOffset},#{yOffset})")

    transition.selectAll("##{@_nameToId()} text.donut-label")
      .duration(transitionSpeed / 3)
      .attr("x", xOffset)
      .attr("y", yOffset)

    transition.selectAll("##{@_nameToId()} text.donut-label")
      .delay(transitionSpeed / 3)
      .duration(transitionSpeed / 3)
      .attr("opacity", 0)

    transition.selectAll("##{@_nameToId()} path")
      .delay(transitionSpeed * 2 / 3)
      .duration(transitionSpeed / 3)
      .attr("transform", "translate(#{@_xOffset()},#{@_yOffset()})")
      .attrTween("d", (d, i) =>
        iInnerRadius = d3.interpolate(@innerRadius, @stackedInnerRadius)
        iOuterRadius = d3.interpolate(@outerRadius, @stackedOuterRadius)
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

    transition.selectAll("##{@_nameToId()} path")
      .duration(transitionSpeed / 3)
      .attr("transform", "translate(#{xOffset},#{yOffset})")
      .attrTween("d", (d, i) =>
        iInnerRadius = d3.interpolate(@stackedInnerRadius, @innerRadius)
        iOuterRadius = d3.interpolate(@stackedOuterRadius, @outerRadius)
        iStartAngle = d3.interpolate(@_startAngle(d, i, false), @_startAngle(d, i, true))
        iEndAngle = d3.interpolate(@_endAngle(d, i, false), @_endAngle(d, i, true))
        (t) =>
          d3.svg.arc()
            .startAngle(iStartAngle(t))
            .endAngle(iEndAngle(t))
            .innerRadius(iInnerRadius(t))
            .outerRadius(iOuterRadius(t))()
      )
    transition.selectAll("##{@_nameToId()} text.donut-label")
      .duration(transitionSpeed / 3)
      .attr("x", xOffset)
      .attr("y", yOffset)

    transition.selectAll("##{@_nameToId()} text.donut-label")
      .delay(transitionSpeed / 3)
      .duration(transitionSpeed / 3)
      .attr("opacity", 1)

    transition.selectAll("##{@_nameToId()} path")
      .delay(transitionSpeed * 2 / 3)
      .duration(transitionSpeed / 3)
      .attr("transform", "translate(#{@_xOffset()},#{@_yOffset()})")

    transition.selectAll("##{@_nameToId()} text.donut-label")
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
      dataAmount += d.val if !isNaN(d.val) and d.val?
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
      arcStartAngle += scal(@series.stack[k].val) if !isNaN(@series.stack[k].val) and @series.stack[k].val?
      k++
    arcStartAngle

  _endAngle: (d, i, unstack) =>
    unstack = @unstack if unstack is undefined
    dataAmount = 0
    @series.stack.forEach((d) =>
      dataAmount += d.val if !isNaN(d.val) and d.val?
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
      arcEndAngle += scal(@series.stack[k].val) if !isNaN(@series.stack[k].val) and @series.stack[k].val?
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
