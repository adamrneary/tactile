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
    @dragger = new Dragger(renderer: @)
    if @series.dotSize?
      @dotSize = @series.dotSize

  seriesPathFactory: ->
    d3.svg.area()
    .x((d) => @graph.x d.x)
    .y0((d) => @yFunction() @_y0(d))
    .y1((d) => @yFunction() d.y + @_y0(d))
    .interpolate(@graph.interpolation)
    .tension @tension

  seriesStrokeFactory: ->
    d3.svg.line()
    .x((d) => @graph.x d.x)
    .y((d) => @yFunction() d.y + @_y0(d))
    .interpolate(@graph.interpolation)
    .tension @tension

  render: (transition)->
    @transition = transition if transition
    super(@transition)
    if (@series.disabled)
      @seriesCanvas().selectAll("path.stroke").remove()
      @seriesCanvas().selectAll('circle').remove()
      return

    stroke = @seriesCanvas().selectAll('path.stroke').data([@series.stack])

    stroke.enter()
      .append("svg:path")
      .attr("clip-path","url(#clip)")
      .attr('class', 'stroke')
      .attr('fill', 'none')
      .attr("stroke-width", '2')
      .attr("stroke", @series.color)

    @transition.selectAll("##{@_nameToId()} path.stroke")
      .attr("d", @seriesStrokeFactory())

    circ = @seriesCanvas().selectAll('circle')
      .data(@series.stack)

    newCircs = circ.enter().append("svg:circle")
      .on("click", @setActive)# set active element if click on it

    @dragger?.makeHandlers(newCircs)
    @dragger?.updateDraggedNode(circ)

    #TODO: this block of code is the same in few places
    @transition.selectAll("##{@_nameToId()} circle")
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
    circ.style("cursor", (d, i)=> if @utils.ourFunctor(@series.isEditable, d, i) then "ns-resize" else "auto")

    circ.exit().remove()


  stackTransition: (transition, transitionSpeed)=>
    @unstack = false
    @graph.discoverRange(@)
    @render(transition)

  unstackTransition: (transition, transitionSpeed)=>
    @unstack = true
    @graph.discoverRange(@)
    @render(transition)
