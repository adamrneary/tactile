class Tactile.LineRenderer extends Tactile.DraggableRenderer
  name: "line"

  specificDefaults:
    unstack: true
    fill: false
    stroke: true
    dotSize: 5

  seriesPathFactory: ->
    d3.svg.line()
      .defined((d)=> !isNaN(d.y) and !isNaN(d.x) and d.y? and d.x?)
      .x((d) => @graph.x d.x)
      .y((d) => @yFunction() d.y)
      .interpolate(@graph.interpolation)
      .tension @tension

  initialize: ->
    super
    @dragger = new Tactile.Dragger(renderer: @)
    if @series.dotSize?
      @dotSize = @series.dotSize


  render: (transition)=>
    @_checkData() if @checkData

    @transition = transition if transition
    super(@transition)
    if (@series.disabled)
      @seriesDraggableCanvas().selectAll('circle')
        .data(@series.stack)
        .remove()
      return
    circ = @seriesDraggableCanvas().selectAll('circle')
      .data(@series.stack)

    newCircs = circ.enter().append("svg:circle")
      .on("mousedown", @setActive)# set active element if click on it


    @dragger?.makeHandlers(newCircs)
    @dragger?.updateDraggedNode()

    @transition.selectAll(".#{@_nameToId()} circle")
      .filter((d) => @_filterNaNs(d, 'x', 'y'))
      .attr("cx", (d) => @graph.x d.x)
      .attr("cy", (d) => @yFunction() d.y)
      .attr("r",
      (d) =>
        (if ("r" of d)
          d.r
        else
          (if d.dragged or d is @active then @dotSize + 1 else @dotSize))
      )
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