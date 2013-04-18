Tactile.DonutRenderer = class DonutRenderer extends RendererBase
  Tactile = window.Tactile or {}
  name: "donut"
  specificDefaults:
    cartesian: false
    unstack: true
    minMargin: 20
    unstack: true
    stackedInnerRadius: 200
    stackedOuterRadius: 300
    legendHeight: 20
    legendWidth: 150


  initialize: =>

  render: (transition, transitionSpeed)=>
    @transition = transition if transition
    @seriesCanvas().selectAll("donut-arc")
      .data(@series.stack).enter().append("path")

    @dataAmount = 0
    @series.stack.forEach((d)=>
      @dataAmount += d.val
    )

    scal = d3.scale.linear()
      .domain([0, @dataAmount])
      .range([0, 2*Math.PI])

    arcStartAngle = 0
    i = 0
    startAnglesList = []
    while i < @series.stack.length
      startAnglesList[i] = arcStartAngle
      arcStartAngle += scal(@series.stack[i].val)
      i++

    @transition.selectAll("##{@_nameToId()} path")
      .attr("class", "donut-arc")
      .attr("transform", "translate(#{@_xOffset()},#{@_yOffset()})")
      .attr("d", (d, i)=>
        arc = d3.svg.arc()
          .startAngle(startAnglesList[i])
          .endAngle(startAnglesList[i]+scal(d.val))
          .innerRadius(@series.innerRadius)
          .outerRadius(@series.outerRadius)()
        arcStartAngle += scal(d.val)
        arc
      )
      .attr("stroke", "white")
      .attr("fill", ((d)-> d.color), "stroke")

    @seriesCanvas().append("svg:text")
      .text(@series.name)
      .attr("class", "donut-label")
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", 15)
      .attr("x", @_xOffset())
      .attr("y", @_yOffset())
      .attr("opacity", 1)

    y0 = @graph.height() - @minMargin - @_donutsCount()*@legendHeight
    x0 = (@graph.width() - @legendWidth)/2
    @_drawLegend(@transition, transitionSpeed, 0, x0, y0, false)


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
    @series.innerRadius

  getOuterRadius: =>
    @series.outerRadius

  getStackedRadius: =>
    @stackedOuterRadius

  getMaxStackedOuterRadius: =>
    max = 0;
    renderers = @graph.renderers
    _.filter(renderers,(r) => r.name == @name).forEach((r)=>
      max = r.getStackedRadius() if max < r.getStackedRadius()
    )
    max

  getMaxOuterRadius: =>
    max = 0;
    @graph.series.filter(
      (d) =>
        d.renderer == @name
    ).forEach((d)=>
      max = d.outerRadius if max < d.outerRadius
    )
    max

  getLegendWidth: =>
    @legendWidth + @seriesCanvas().selectAll("text.donut-legend").node().getBBox().width

  getMaxLegendWidth: =>
    max = 0;
    renderers = @graph.renderers
    _.filter(renderers,(r) => r.name == @name).forEach((r)=>
      max = r.getLegendWidth() if max < r.getLegendWidth()
    )
    max

  stackTransition: (transition, transitionSpeed)=>
    @unstack = false
    xMargin = (@graph.width() - @getMaxStackedOuterRadius()*2 - @getMaxLegendWidth())/2
    yMargin = (@graph.height() - @getMaxStackedOuterRadius()*2)/2

    xOffset = xMargin + @getMaxStackedOuterRadius() + @getMaxStackedOuterRadius()*Math.cos(Math.PI+(2*Math.PI/@_donutsCount())*@_donutIndex())
    yOffset = yMargin + @getMaxStackedOuterRadius() + @getMaxStackedOuterRadius()*Math.sin(Math.PI+(2*Math.PI/@_donutsCount())*@_donutIndex())

    transition.selectAll("##{@_nameToId()} path")
      .duration(transitionSpeed/3)
      .attr("transform", "translate(#{xOffset},#{yOffset})")

    transition.selectAll("##{@_nameToId()} text.donut-label")
      .duration(transitionSpeed/3)
      .attr("x", xOffset)
      .attr("y", yOffset)

    @_drawLegend(transition, transitionSpeed/3, 0, @graph.width()-@legendWidth, (@graph.height()-@_donutsCount()*@legendHeight)/2, false)

    transition.selectAll("##{@_nameToId()} text.donut-label")
      .delay(transitionSpeed/3)
      .duration(transitionSpeed/3)
      .attr("opacity", 0)

    @_drawLegend(transition, transitionSpeed/3, transitionSpeed/3, @graph.width()-@legendWidth, (@graph.height()-@_donutsCount()*@legendHeight)/2, true)

    xOffset = xMargin + @getMaxStackedOuterRadius()
    yOffset = yMargin + @getMaxStackedOuterRadius()
    startAngle = Math.PI*1.5+(2*Math.PI/@_donutsCount())*@_donutIndex() - Math.PI/@_donutsCount()
    endAngle = Math.PI*1.5+(2*Math.PI/@_donutsCount())*@_donutIndex() + Math.PI/@_donutsCount() - 0.04

    scalOld = d3.scale.linear()
      .domain([0, @dataAmount])
      .range([0, 2*Math.PI])

    scalNew = d3.scale.linear()
      .domain([0, @dataAmount])
      .range([0, 2*Math.PI/@_donutsCount() - 0.04])



    arcStartAngleOld = 0
    arcStartAngleNew = startAngle
    i = 0
    startAnglesListOld = []
    startAnglesListNew = []
    while i < @series.stack.length
      startAnglesListOld[i] = arcStartAngleOld
      startAnglesListNew[i] = arcStartAngleNew
      arcStartAngleOld += scalOld(@series.stack[i].val)
      arcStartAngleNew += scalNew(@series.stack[i].val)
      i++


    arcStartAngleOld = 0
    arcStartAngleNew = startAngle
    transition.selectAll("##{@_nameToId()} path")
      .delay(transitionSpeed*2/3)
      .duration(transitionSpeed/3)
      .attr("transform", "translate(#{xOffset},#{yOffset})")
      .attrTween("d", (d, i)=>
        iInnerRadius = d3.interpolate(@series.innerRadius, @stackedInnerRadius)
        iOuterRadius = d3.interpolate(@series.outerRadius, @stackedOuterRadius)
        iStartAngle = d3.interpolate(startAnglesListOld[i], startAnglesListNew[i])
        iEndAngle = d3.interpolate(startAnglesListOld[i]+scalOld(d.val), startAnglesListNew[i]+scalNew(d.val))
        (t)=>
          d3.svg.arc()
            .startAngle(iStartAngle(t))
            .endAngle(iEndAngle(t))
            .innerRadius(iInnerRadius(t))
            .outerRadius(iOuterRadius(t))()
      )


  unstackTransition: (transition, transitionSpeed)=>
    @unstack = true
    xMargin = (@graph.width() - @getMaxStackedOuterRadius()*2)/2
    yMargin = (@graph.height() - @getMaxStackedOuterRadius()*2)/2

    xOffset = xMargin + @getMaxStackedOuterRadius() + @getMaxStackedOuterRadius()*Math.cos(Math.PI+(2*Math.PI/@_donutsCount())*@_donutIndex())
    yOffset = yMargin + @getMaxStackedOuterRadius() + @getMaxStackedOuterRadius()*Math.sin(Math.PI+(2*Math.PI/@_donutsCount())*@_donutIndex())

    startAngle = Math.PI*1.5+(2*Math.PI/@_donutsCount())*@_donutIndex() - Math.PI/@_donutsCount()
    endAngle = Math.PI*1.5+(2*Math.PI/@_donutsCount())*@_donutIndex() + Math.PI/@_donutsCount() - 0.04

    scalNew = d3.scale.linear()
      .domain([0, @dataAmount])
      .range([0, 2*Math.PI])

    scalOld = d3.scale.linear()
      .domain([0, @dataAmount])
      .range([0, 2*Math.PI/@_donutsCount() - 0.04])

    arcStartAngleNew = 0
    arcStartAngleOld = startAngle
    transition.selectAll("##{@_nameToId()} path")
      .duration(transitionSpeed/3)
      .attr("transform", "translate(#{xOffset},#{yOffset})")
      .attrTween("d", (d, i)=>
        iInnerRadius = d3.interpolate(@stackedInnerRadius, @series.innerRadius)
        iOuterRadius = d3.interpolate(@stackedOuterRadius, @series.outerRadius)
        iStartAngle = d3.interpolate(arcStartAngleOld, arcStartAngleNew)
        iEndAngle = d3.interpolate(arcStartAngleOld+scalOld(d.val), arcStartAngleNew+scalNew(d.val))
        arcStartAngleOld += scalOld(d.val)
        arcStartAngleNew += scalNew(d.val)
        (t)=>
          d3.svg.arc()
            .startAngle(iStartAngle(t))
            .endAngle(iEndAngle(t))
            .innerRadius(iInnerRadius(t))
            .outerRadius(iOuterRadius(t))()
      )
    transition.selectAll("##{@_nameToId()} text.donut-label")
      .duration(transitionSpeed/3)
      .attr("x", xOffset)
      .attr("y", yOffset)

    transition.selectAll("##{@_nameToId()} text.donut-label")
      .delay(transitionSpeed/3)
      .duration(transitionSpeed/3)
      .attr("opacity", 1)

    @_drawLegend(transition, transitionSpeed/3, transitionSpeed/3, @graph.width()-@legendWidth, (@graph.height()-@_donutsCount()*@legendHeight)/2, false)


    transition.selectAll("##{@_nameToId()} path")
      .delay(transitionSpeed*2/3)
      .duration(transitionSpeed/3)
      .attr("transform", "translate(#{@_xOffset()},#{@_yOffset()})")

    transition.selectAll("##{@_nameToId()} text.donut-label")
      .delay(transitionSpeed*2/3)
      .duration(transitionSpeed/3)
      .attr("x", @_xOffset())
      .attr("y", @_yOffset())

    @_drawLegend(transition, transitionSpeed/3, transitionSpeed*2/3, (@graph.width() - @legendWidth)/2, @graph.height() - @minMargin - @_donutsCount()*@legendHeight, false)

  _donutsPerLine: =>
    Math.floor (@graph.width()-@minMargin) / (@getMaxOuterRadius()*2+@minMargin)

  _xOffset: =>
    if @unstack
      margin = (@graph.width() - @_donutsInLine(@_lineIndex())*@getMaxOuterRadius()*2) / (@_donutsInLine(@_lineIndex())+1)
      @_indexInLine()*(margin + @getMaxOuterRadius()*2) + margin + @getMaxOuterRadius()
    else
      xMargin = (@graph.width() - @getMaxStackedOuterRadius()*2)/2
      xOffset = xMargin + @getMaxStackedOuterRadius()

  _yOffset: =>
    if @unstack
      (@getMaxOuterRadius()*2 + @minMargin)*@_lineIndex() + @minMargin + @getMaxOuterRadius()
    else
      yMargin = (@graph.height() - @getMaxStackedOuterRadius()*2)/2
      yOffset = yMargin + @getMaxStackedOuterRadius()

  _donutIndex: ->
    return 0 if @rendererIndex == 0 || @rendererIndex is undefined
    renderers = @graph.renderers.slice(0, @rendererIndex)
    _.filter(renderers,(r) => r.name == @name).length

  _lineIndex: =>
    Math.floor @_donutIndex() / @_donutsPerLine()

  _donutsCount: =>
    @graph.series.filter(
      (d) =>
        d.renderer == @name
    ).length

  _donutsInLine: (lineIndex)=>
    lineCount = Math.ceil @_donutsCount()/@_donutsPerLine()
    if (lineIndex >= lineCount)
      0
    else if lineIndex is (lineCount - 1)
      @_donutsCount() - lineIndex*@_donutsPerLine()
    else
      @_donutsPerLine()

  _indexInLine: =>
    Math.floor @_donutIndex()  - @_lineIndex()*@_donutsPerLine()

  _drawLegend: (transition, transitinoSpeed, delay, x0, y0, showText)=>

    @seriesCanvas().selectAll("rect")
      .data(@series.stack).enter().append("rect")

    y0 += @_donutIndex()*@legendHeight

    transition.selectAll("##{@_nameToId()} rect")
      .delay(delay)
      .duration(transitinoSpeed)
      .attr("x", (d, i)=>
        x0 + i*@legendWidth/@series.stack.length
      )
      .attr("y", y0)
      .attr("height", @legendHeight)
      .attr("width", @legendWidth/@series.stack.length)
      .attr("fill", ((d)-> d.color))
      .attr("stroke-width", 1)
      .attr("stroke", "#FEFEFE")

    @seriesCanvas().selectAll("text.donut-legend")
      .data([@series]).enter().append("svg:text")
      .attr("class", "donut-legend")

    transition.selectAll("##{@_nameToId()} text.donut-legend")
      .delay(delay)
      .duration(transitinoSpeed)
      .text(@series.name)
      .attr("class", "donut-legend")
      .attr("text-anchor", "end")
      .attr("font-size", 15)
      .attr("x", x0 - 5)
      .attr("y", y0 + @legendHeight - 3)
      .attr("opacity", if showText then 1 else 0)
