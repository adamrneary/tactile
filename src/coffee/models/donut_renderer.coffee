Tactile.DonutRenderer = class DonutRenderer extends RendererBase
  Tactile = window.Tactile or {}
  name: "donut"
  specificDefaults:
    cartesian: false
    unstack: true
    minMargin: 0


  initialize: =>
    @donut = d3.layout.pie().value((d) ->
      d.val
    )
    @arc = d3.svg.arc().innerRadius(@series.innerRadius).outerRadius(@series.outerRadius)

  render: (transition)=>
    @transition = transition if transition
    donut = undefined
    donut = @seriesCanvas().selectAll("donut-arc")
      .data(@donut).enter().append("path")

    @transition.selectAll("##{@_nameToId()} path")
      .attr("class", "donut-arc")
      .attr("transform", "translate(#{@_xOffset()},#{@_yOffset()})")
      .attr("d", @arc)
      .attr("stroke", "white")
      .attr("fill", ((d)-> d.data.color), "stroke")

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

  getMaxOuterRadius: =>
    max = 0;
    @graph.series.filter(
      (d) =>
        d.renderer == @name
    ).forEach((d)=>
      max = d.outerRadius if max < d.outerRadius
    )
    max

  _donutsPerLine: =>
    Math.floor (@graph.width()-@minMargin) / (@getMaxOuterRadius()*2+@minMargin)

  _xOffset: =>
    margin = (@graph.width() - @_donutsInLine(@_lineIndex())*@getMaxOuterRadius()*2) / (@_donutsInLine(@_lineIndex())+1)
    console.log @_donutsInLine(@_lineIndex())
    @_indexInLine()*(margin + @getMaxOuterRadius()*2) + margin + @getMaxOuterRadius()

  _yOffset: =>
    (@getMaxOuterRadius()*2 + @minMargin)*@_lineIndex() + @minMargin + @getMaxOuterRadius()

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
