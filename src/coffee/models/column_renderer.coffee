class Tactile.ColumnRenderer extends Tactile.DraggableRenderer
  name: "column"

  specificDefaults:
    gapSize: 0.15
    dinGapSize: 1
    tension: null
    round: true
    unstack: true


  initialize: (options = {}) ->
    super
    @dragger = new Tactile.Dragger(renderer: @)
    @gapSize = options.gapSize || @gapSize
    @round = @series.round unless @series.round is undefined
    @unstack = @series.unstack unless @series.unstack is undefined
    @aggregated = @graph.aggregated[@name]

  render: (transition, recalculateData, transitionSpeed)=>
    @_checkData() if @checkData
    @transition = transition if transition

    draw = () =>
      if (@series.disabled)
        @dragger?.timesRendered = 0
        @seriesCanvas().selectAll("rect").data(@aggdata).remove()
        @seriesDraggableCanvas().selectAll("circle").data(@aggdata).remove()
        return

      nodes = @seriesCanvas().selectAll("rect").data(@aggdata)
      nodes.enter()
        .append("svg:rect")
        .attr("clip-path", "url(#clip)")
        .on("mousedown", (d, i)=>
          @setActive(d, i) # set active element if click on it
          @hideCircles()
        )
      nodes.exit().remove()

      #      if transition then selectObjects = @seriesCanvas().transition().duration(0).selectAll(".#{@_nameToId()} rect")
      #      else selectObjects = @seriesCanvas().selectAll("rect")
      selectObjects = @seriesCanvas().selectAll("rect")
      selectObjects
        .filter((d) => @_filterNaNs(d, "x", "y"))
        .attr("height", (d) => @yFunction().magnitude Math.abs(d.y))
        .attr("y", (d)=> @_barY(d))
        .attr("x", (d)=> @_barX(d))
        .attr("width", @_seriesBarWidth())
        .attr("fill", (d, i) => @utils.ourFunctor(@series.color, d, i))
        .attr("stroke", "white")
        .attr("rx", @_edgeRatio)
        .attr("ry", @_edgeRatio)
        .attr("class", (d, i) =>
          ["bar",
            ("colorless" unless @series.color),
            ("active" if d is @active), # apply active class for active element
            ("editable" if @utils.ourFunctor(@series.isEditable, d, i))].join(" ")) # apply editable class for editable element


      nodes.on "mouseover.show-dragging-circle", (d, i, el) =>
        @hideCircles()
        circ = @seriesDraggableCanvas().selectAll("#node-#{i}-#{d.x}")
        circ.style("display", "")

      nodes.on "mouseout.hide-dragging-circle", (d, i) =>
        return if d is @active
        circ = @seriesDraggableCanvas().selectAll("#node-#{i}-#{d.x}")
        return if d3.event.relatedTarget is circ.node()
        circ.style("display", "none")

      circ = @seriesDraggableCanvas().selectAll("circle")
        .data(@aggdata)

      newCircs = circ.enter().append("svg:circle")
        .style("display", "none")
        .on("mousedown", (d, i)=>
          @setActive(d, i) # set active element if click on it
          @hideCircles()
        )
        .on( "mouseout.hide-dragging-circle", (d, i) =>
          return if d is @active
          circ = @seriesDraggableCanvas().selectAll("#node-#{i}-#{d.x}")
          return if d3.event.relatedTarget is circ.node()
          circ.style("display", "none")
        )

      @dragger?.makeHandlers(newCircs)
      @dragger?.updateDraggedNode()


      if transition then selectObjects = @graph.svg.transition().duration(transitionSpeed).selectAll(".#{@_nameToId()} circle")
      else selectObjects = @seriesDraggableCanvas().selectAll("circle")
      selectObjects
        .filter((d) => @_filterNaNs(d, "x", "y"))
        .attr("cx", (d) => @_barX(d) + @_seriesBarWidth() / 2)
        .attr("cy", (d) => @_barY(d) + (if d.y < 0 then @yFunction().magnitude(Math.abs(d.y)) else 0))
        .attr("r", (d) =>
          (if ("r" of d)
            d.r
          else
            (if d.dragged or _.isEqual(d, @active) then @dotSize + 1 else @dotSize))
        )
        .attr("clip-path", "url(#scatter-clip)")
        .attr("class", (d, i) => [
          ("active" if d is @active), # apply active class for active element
          ("editable" if @utils.ourFunctor(@series.isEditable, d, i))# apply editable class for editable element
        ].join(" "))
        .attr("fill", (d, i) => (if d.dragged or d is @active then "white" else @utils.ourFunctor(@series.color, d, i)))
        .attr("stroke", (d, i) => (if d.dragged or d is @active then @utils.ourFunctor(@series.color, d, i) else "white"))
        .attr("stroke-width", 2)
        .attr("id", (d, i) -> "node-#{i}-#{d.x}")
        .style("cursor", (d, i)=> if @utils.ourFunctor(@series.isEditable, d, i) then "ns-resize" else "auto")

      circ.exit().remove()

      # set tooltip for circles
      if @series.tooltip
        circ.tooltip (d, i) =>
          circleColor: @series.color
          graph: @graph
          text: @series.tooltip(d)
          circleOnHover: true
          tooltipCircleContainer: @graph.vis.node()
          gravity: "right"

      # set tooltip for column
      @setupTooltips()


    if @aggregated
      if recalculateData
        if @aggdata
          aggdataOld = @aggdata.slice(0)
          aggdataOldSource = aggdataOld.slice(0)
          @aggdata = @utils.aggregateData @series.stack, @graph.x.domain()
          aggdata = @aggdata.slice(0)
          aggdataSource = @aggdata.slice(0)
          maxAggdataOld = (_.max aggdataOldSource, (d)-> d.x).x
          maxAggdata = (_.max aggdataSource, (d)-> d.x).x
          minAggdataOld = (_.min aggdataOldSource, (d)-> d.x).x
          minAggdata = (_.min aggdataSource, (d)-> d.x).x
          aggdataOld.push {inf: true, r: 0, x: Math.max(maxAggdataOld, maxAggdata) + 1, y: 0, y0: 0, y00: 0, range:[_.last(aggdataOldSource).range[1] + 1, Infinity]}
          aggdataOld.unshift {inf: true, r: 0, x: Math.min(minAggdataOld, minAggdata) - 1, y: 0, y0: 0, y00: 0, range:[-Infinity, _.first(aggdataOldSource).range[1] - 1]}
          aggdata.push {inf: true, r: 0, x: Math.max(maxAggdataOld, maxAggdata) + 1, y: 0, y0: 0, y00: 0, range:[_.last(aggdataSource).range[1] + 1, Infinity]}
          aggdata.unshift {inf: true, r: 0, x: Math.min(minAggdataOld, minAggdata) - 1, y: 0, y0: 0, y00: 0, range:[-Infinity, _.first(aggdataSource).range[1] - 1]}

          transitionData = []
          _.each aggdata, (d) ->
            _.each aggdataOld, (oldD) ->
              if not (oldD.range[0] > d.range[1] or oldD.range[1] < d.range[0]) and not (d.inf and oldD.inf)
                transitionData.push {start: oldD, end: d}

          @aggdata = aggdataOldSource
          nodes = @seriesCanvas().selectAll("rect").data(transitionData)
          nodes.enter()
            .append("svg:rect")
            .attr("clip-path", "url(#clip)")

          @seriesCanvas().selectAll("rect")
            .attr("height", (d) => @yFunctionOld().magnitude Math.abs(d.start.y))
            .attr("y", (d) => @_barY(d.start, true))
            .attr("x", (d) => @_barX(d.start, true))
            .attr("width", @_seriesBarWidth())
            .attr("fill", (d, i) => @utils.ourFunctor(@series.color, d.start, i))
            .attr("stroke", "white")
            .attr("rx", @_edgeRatio)
            .attr("ry", @_edgeRatio)
            .attr("class", (d, i) =>
              ["bar",
                ("colorless" unless @series.color)].join(" "))
          nodes.exit().remove()

          @aggdata = aggdataSource

          count = 0
          @graph.svg.transition().duration(transitionSpeed).selectAll(".#{@_nameToId()} rect")
            .attr("height", (d) => @yFunction().magnitude Math.abs(d.end.y))
            .attr("y", (d) => @_barY(d.end))
            .attr("x", (d) => @_barX(d.end))
            .attr("width", @_seriesBarWidth())
            .attr("fill", (d, i) => @utils.ourFunctor(@series.color, d.end, i))
            .attr("stroke", "white")
            .attr("rx", @_edgeRatio)
            .attr("ry", @_edgeRatio)
            .attr("class", (d, i) =>
              ["bar",
                ("colorless" unless @series.color)].join(" "))
            .each("end", ()->
              count++
              draw() if count = transitionData.length
            )
        else
          @aggdata = @utils.aggregateData @series.stack, @graph.x.domain()
          draw()
      else
        @aggdata = @utils.aggregateData @series.stack, @graph.x.domain()
        draw()
    else
      @aggdata = @series.stack
      draw()

  hideCircles: ()=>
    @seriesDraggableCanvas().selectAll("circle")
      .style("display", (d)=>
        if d is @active
          ""
        else
          "none"
      )

  setupTooltips: ->
    if @series.tooltip
      @seriesCanvas().selectAll("rect").tooltip (d, i) =>
        circleColor: @series.color
        graph: @graph
        text: @series.tooltip(d)
        circleOnHover: false
        tooltipCircleContainer: @graph.vis.node()
        gravity: "right"
        placement: if d.y < 0 then "bottom" else "top"


  barWidth: ->
    data = @series.stack

    count = data.length
    barWidth = @graph.width() / count * (1 - @gapSize)

  stackTransition: (transition, transitionSpeed)=>
    @unstack = false
    @graph.setYFrame([NaN, NaN])
    @graph.setY1Frame([NaN, NaN])
    @graph.discoverRange()
    @graph._checkYDomain()
    @graph._checkY1Domain()

    transition.selectAll(".#{@_nameToId()} rect")
      .filter((d) => @_filterNaNs(d, "x", "y"))
      .duration(transitionSpeed/2)
      .attr("y", @_barY)
      .attr("height", (d) => @graph.y.magnitude Math.abs(d.y))

    transition.selectAll(".#{@_nameToId()} circle")
      .filter((d) => @_filterNaNs(d, "x", "y"))
      .duration(transitionSpeed/2)
      .attr("cy", (d) => @_barY(d) + (if d.y < 0 then @yFunction().magnitude(Math.abs(d.y)) else 0))

    transition.selectAll(".#{@_nameToId()} rect")
      .filter((d) => @_filterNaNs(d, "x", "y"))
      .delay(transitionSpeed/2)
      .attr("width", @_seriesBarWidth())
      .attr("x", @_barX)

    transition.selectAll(".#{@_nameToId()} circle")
      .filter((d) => @_filterNaNs(d, "x", "y"))
      .delay(transitionSpeed/2)
      .attr("cx", (d) => @_barX(d) + @_seriesBarWidth() / 2)



  unstackTransition: (transition, transitionSpeed)=>
    @unstack = true
    @graph.setYFrame([NaN, NaN])
    @graph.setY1Frame([NaN, NaN])
    @graph.discoverRange()
    @graph._checkYDomain()
    @graph._checkY1Domain()

    transition.selectAll(".#{@_nameToId()} rect")
      .filter((d) => @_filterNaNs(d, "x", "y"))
      .duration(transitionSpeed/2)
      .attr("x", @_barX)
      .attr("width", @_seriesBarWidth())

    transition.selectAll(".#{@_nameToId()} circle")
      .filter((d) => @_filterNaNs(d, "x", "y"))
      .duration(transitionSpeed/2)
      .attr("cx", (d) => @_barX(d) + @_seriesBarWidth() / 2)

    transition.selectAll(".#{@_nameToId()} rect")
      .filter((d) => @_filterNaNs(d, "x", "y"))
      .delay(transitionSpeed/2)
      .attr("height", (d) => @graph.y.magnitude Math.abs(d.y))
      .attr("y", @_barY)

    transition.selectAll(".#{@_nameToId()} circle")
      .filter((d) => @_filterNaNs(d, "x", "y"))
      .delay(transitionSpeed/2)
      .attr("cy", (d) => @_barY(d) + (if d.y < 0 then @yFunction().magnitude(Math.abs(d.y)) else 0))

  _transformMatrix: (d) =>
    # A matrix transform for handling negative values
    matrix = [1, 0, 0, ((if d.y < 0 then -1 else 1)),
      0, ((if d.y < 0 then @yFunction().magnitude(Math.abs(d.y)) * 2 else 0))
    ]
    "matrix(" + matrix.join(",") + ")"

  _edgeRatio: =>
    if @series.round then Math.round(0.05783 * @_seriesBarWidth() + 1) else 0

  seriesWidth: (old)=>
    if @series.stack.length >= 2
      if old then stackWidth = @graph.xOld(@series.stack[1].x) - @graph.x(@series.stack[0].x)
      else stackWidth = @graph.x(@series.stack[1].x) - @graph.x(@series.stack[0].x)
      width = stackWidth / (1 + @gapSize)
    else
      width = @graph.width() / (1 + @gapSize)

  _seriesBarWidth: =>
    if @aggregated
      stack = @aggdata
      gapSize = @dinGapSize
    else
      stack = @series.stack
      gapSize = @gapSize

    width = @graph.width() / stack.length
    if @unstack
      width = width / @graph.series.filter((d) =>
        d.renderer == @name).array.length

    width = width - (2 * gapSize)
    width

  # when we have couple of series we want
  # them all to be center-aligned around the x-value
  _barXOffset: (seriesBarWidth) ->
    count = @graph.renderersByType(@name).length

    if count == 1 || !@unstack
      barXOffset = -seriesBarWidth / 2
    else
      barXOffset = -seriesBarWidth * count / 2

  _barX: (d, old) =>
    seriesBarWidth = @_seriesBarWidth()

    if @aggregated
      x = d.x
      cnt_series = @graph.series.filter((d) =>
        d.renderer == @name).array.length
      initialX = x * (seriesBarWidth + 2 * @dinGapSize) + @dinGapSize
    else
      if old then x = @graph.xOld(d.x)
      else x = @graph.x(d.x)

      # center the bar around the value it represents
      initialX = x + @_barXOffset(seriesBarWidth)

    if @unstack
      initialX = x * (seriesBarWidth + 2 * @dinGapSize) * cnt_series + @gapSize if @aggregated
      return initialX + (@_columnRendererIndex() * seriesBarWidth)
    else
      return initialX

  _barY: (d, old) =>
    # if we want to display stacked bars y should be added y0 value
    if @unstack
      if d.y > 0
        if old then @yFunctionOld()(d.y)
        else @yFunction()(d.y)
      else
        if old then @yFunctionOld()(0)
        else @yFunction()(0)
    else
      if d.y > 0
        if old then @yFunctionOld()(d.y + d.y0)
        else @yFunction()(d.y + d.y0)
      else
        if old then @yFunctionOld()(d.y0)
        else @yFunction()(d.y0)

  # Returns the index of this column renderer
  # For example: if this is the third renderer of
  #the column type it will have index equal to 2
  #
  # this is handy when you need to modify the x,y values depending
  # on what is the number of the currently rendered bars
  _columnRendererIndex: ->
    return 0 if @rendererIndex == 0 || @rendererIndex is undefined
    renderers = @graph.renderers.slice(0, @rendererIndex)
    _.filter(renderers,(r) => r.name == @name).length
