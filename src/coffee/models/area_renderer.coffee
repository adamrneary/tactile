class Tactile.AreaRenderer extends Tactile.DraggableRenderer
  name: "area"
  dotSize: 5

  specificDefaults:
    unstack: true
    fill: true
    stroke: true
    opacity: 0.15

  _y0: (d) => if @unstack then 0 else d.y0

  initialize: ->
    super
    @dragger = new Tactile.Dragger(renderer: @)
    if @series.dotSize?
      @dotSize = @series.dotSize
    @unstack = @series.unstack unless @series.unstack is undefined

  seriesPathFactory: =>
    d3.svg.area()
    .defined((d) => @_filterNaNs(d, 'x', 'y', 'y0'))
    .x((d) => @graph.x d.x)
    .y0((d) => @yFunction() @_y0(d))
    .y1((d) => @yFunction() d.y + @_y0(d))
    .interpolate(@graph.interpolation)
    .tension @tension

  seriesStrokeFactory: =>
    d3.svg.line()
    .defined((d) => @_filterNaNs(d, 'x', 'y'))
    .x((d) => @graph.x d.x)
    .y((d) => @yFunction() d.y + @_y0(d))
    .interpolate(@graph.interpolation)
    .tension @tension

  render: (transition, recalculateData, transitionSpeed)->
    @aggdata = @series.stack
    @_checkData(@aggdata) if @checkData

    @transition = transition if transition
    super(transition)
    if (@series.disabled)
      @seriesCanvas().selectAll("path.stroke").remove()
      @seriesCanvas().selectAll('circle').remove()
      return

    stroke = @seriesCanvas().selectAll('path.stroke').data([@aggdata])

    stroke.enter()
      .append("svg:path")
      .attr("clip-path","url(#clip)")
      .attr('class', 'stroke')
      .attr('fill', 'none')
      .attr("stroke-width", '2')
      .attr("stroke", @series.color)

    if transition then selectObjects = transition.selectAll(".#{@_nameToId()} path.stroke")
    else selectObjects = @seriesCanvas().selectAll('path.stroke')
    selectObjects
      .attr("d", @seriesStrokeFactory())

    circ = @seriesDraggableCanvas().selectAll('circle')
      .data(@aggdata)

    newCircs = circ.enter().append("svg:circle")
      .on("mousedown", @setActive)# set active element if click on it

    @dragger?.makeHandlers(newCircs)
    @dragger?.updateDraggedNode(circ)

    #TODO: this block of code is the same in few places
    if transition then selectObjects = transition.selectAll(".#{@_nameToId()} circle")
    else selectObjects = @seriesDraggableCanvas().selectAll('circle')
    selectObjects
      .filter((d) => @_filterNaNs(d, 'x', 'y'))
      .attr("r",
        (d) =>
          (if ("r" of d)
            d.r
          else
            (if d.dragged or d is @active then @dotSize + 1 else @dotSize))
        )
      .attr("cx", (d) => @graph.x d.x)
      .attr("cy", (d) => @yFunction() d.y + @_y0(d))
      .attr("clip-path", "url(#scatter-clip)")
      .attr("class", (d, i) => [
        ("active" if d is @active), # apply active class for active element
        ("editable" if @utils.ourFunctor(@series.isEditable, d, i))# apply editable class for editable element
      ].join(' '))
      .attr("fill", (d) => (if d.dragged or d is @active then 'white' else @series.color))
      .attr("stroke", (d) => (if d.dragged or d is @active then @series.color else 'white'))
      .attr("stroke-width", @dotSize / 2 || 2)
      .style("cursor", (d, i)=> if @utils.ourFunctor(@series.isEditable, d, i) then "ns-resize" else "auto")

    circ.exit().remove()

    if @series.tooltip
      circ.tooltip (d, i) =>
        circleColor: @series.color
        graph: @graph
        text: @series.tooltip(d)
        circleOnHover: true
        #tooltipCircleContainer: @graph.vis.node()
        gravity: "right"

  stackTransition: (transition, transitionSpeed)=>
    @unstack = false
    @graph.setYFrame([NaN, NaN])
    @graph.setY1Frame([NaN, NaN])
    @graph.discoverRange()
    @graph._checkYDomain()
    @graph._checkY1Domain()
    @render(transition)

  unstackTransition: (transition, transitionSpeed)=>
    @unstack = true
    @graph.setYFrame([NaN, NaN])
    @graph.setY1Frame([NaN, NaN])
    @graph.discoverRange()
    @graph._checkYDomain()
    @graph._checkY1Domain()
    @render(transition)
