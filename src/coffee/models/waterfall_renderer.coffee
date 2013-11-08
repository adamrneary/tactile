class Tactile.WaterfallRenderer extends Tactile.RendererBase
  name: "waterfall"

  specificDefaults:
    gapSize: 0.15
    round: true
    unstack: true

  initialize: (options = {}) ->
    @gapSize = options.gapSize || @gapSize
    @aggregated = @graph.aggregated[@name]

  render: (transition, recalculateData, transitionSpeed)=>
    @_checkData() if @checkData
    @transition = transition if transition

    if @aggregated
      @aggdata = @utils.aggregateData @series.stack, @graph.x.domain()
    else
      @aggdata = @series.stack

    draw = (transition = undefined) =>
      if (@series.disabled)
        @dragger?.timesRendered = 0
        @seriesCanvas().selectAll("rect").data(@aggdata).remove()
        @seriesDraggableCanvas().selectAll("line").data(@aggdata).remove()
        return

      nodes = @seriesCanvas().selectAll("rect").data(@aggdata)
      nodes.enter()
        .append("svg:rect")
        .attr("clip-path", "url(#clip)")
        .on("mousedown", @setActive)# set active element if click on it

      nodes.exit().remove()

      if transition
        canvas =          transition.select("g.canvas").selectAll("g.#{@_nameToId()}")
        draggableCanvas = transition.select("g.draggable-canvas").selectAll("g.#{@_nameToId()}")

      selectObject = if transition
          canvas.selectAll("rect")
        else
          @seriesCanvas().selectAll("rect")

      selectObject.filter((d) => @_filterNaNs(d, 'x', 'y', 'y00'))
        .attr("height", (d) => @graph.y.magnitude Math.abs(d.y))
        .attr("y", (d)=> @_barY(d))
        .attr("x", @_barX)
        .attr("width", @_seriesBarWidth() / (1 + @gapSize))
        .attr("fill", @series.color)

      line = @seriesDraggableCanvas().selectAll("line").data(@aggdata)
      line.enter()
        .append("svg:line")
        .attr("clip-path", "url(#clip)")

      selectObject = if transition
          draggableCanvas.selectAll("line")
        else
          @seriesDraggableCanvas().selectAll("line")
      selectObject.filter((d) => @_filterNaNs(d, 'x', 'y', 'y00'))
        .attr("x1", (d) => @_barX(d) + @_seriesBarWidth() / (1 + @gapSize))
        .attr("x2", (d, i) =>
          gapCount = @graph.series.filter(
            (d) =>
              d.renderer == 'waterfall'
          ).length()
          if i is 0
            @_barX(d, i) - @_seriesBarWidth()
          else
            stackWidthCur = @graph.x(@series.stack[i].x) - @graph.x(@series.stack[i-1].x) || 0
            @_barX(d, i)-(if  @_waterfalRendererIndex() is 0 then stackWidthCur - @_seriesBarWidth()*gapCount else 0) - @_seriesBarWidth()
        )
        .attr("y1", (d)=>@_barY(d)+(if d.y > 0 then @graph.y.magnitude Math.abs(d.y) else 0))
        .attr("y2", (d)=>@_barY(d)+(if d.y > 0 then @graph.y.magnitude Math.abs(d.y) else 0))
        .attr("stroke", "#BEBEBE")
        .attr("stroke-width", (d, i)=>
          if (@_waterfalRendererIndex() is 0 and i is 0) or (@utils.ourFunctor(@series.fromBaseline, d, i)) then 0 else 1)

      line.exit().remove()

      @setupTooltips()

    if @aggregated
      if recalculateData and @aggdata?.length
        animateTransition = @utils.animateTransition(@graph.xOld.domain(), @graph.x.domain())

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
        aggdataOld.unshift {inf: true, r: 0, x: Math.min(minAggdataOld, minAggdata) - 1, y: 0, y0: 0, y00: 0, range:[-Infinity, _.first(aggdataOldSource).range[0] - 1]}
        aggdata.push {inf: true, r: 0, x: Math.max(maxAggdataOld, maxAggdata) + 1, y: 0, y0: 0, y00: 0, range:[_.last(aggdataSource).range[1] + 1, Infinity]}
        aggdata.unshift {inf: true, r: 0, x: Math.min(minAggdataOld, minAggdata) - 1, y: 0, y0: 0, y00: 0, range:[-Infinity, _.first(aggdataSource).range[0] - 1]}

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

        # if we aggregate from months to quarter, from quarter to year:
        #   attrs order change: x -> width -> height
        if animateTransition and (@utils.domainMonthRange(@graph.x.domain()) > @utils.domainMonthRange(@graph.xOld.domain()))
          @graph.svg.transition()
            .duration(transitionSpeed/3).delay(0)
            .selectAll(".#{@_nameToId()} rect, .#{@_nameToId()} line")
            .attr("height", (d) => @yFunction().magnitude Math.abs(d.end.y))
            .attr("y", (d) => @_barY(d.end))
            .attr("class", (d, i) =>
              ["bar",
               ("colorless" unless @series.color)].join(" "))
          @graph.svg.transition()
            .duration(transitionSpeed/3).delay(transitionSpeed/3)
            .selectAll(".#{@_nameToId()} rect, .#{@_nameToId()} line")
            .attr("x", (d) => @_barX(d.end, true))
          @graph.svg.transition()
            .duration(transitionSpeed/3).delay(2*transitionSpeed/3)
            .selectAll(".#{@_nameToId()} rect, .#{@_nameToId()} line")
            .attr("width", @_seriesBarWidth())
            .attr("fill", (d, i) => @utils.ourFunctor(@series.color, d.end, i))
            .attr("stroke", "white")
            .attr("rx", @_edgeRatio)
            .attr("ry", @_edgeRatio)
            .each("end", ()=>
              count++
              draw() if count = transitionData.length
            )
        # if we aggregate from quarter to months, from year to quarter:
        #   attrs order change: width -> x -> height
        else if animateTransition
          @graph.svg.transition()
            .duration(transitionSpeed/3).delay(0)
            .selectAll(".#{@_nameToId()} rect, .#{@_nameToId()} line")
            .attr("width", @_seriesBarWidth())
            .attr("fill", (d, i) => @utils.ourFunctor(@series.color, d.end, i))
            .attr("stroke", "white")
            .attr("rx", @_edgeRatio)
            .attr("ry", @_edgeRatio)
          @graph.svg.transition()
            .duration(transitionSpeed/3).delay(transitionSpeed/3)
            .selectAll(".#{@_nameToId()} rect")
            .attr("x", (d) => @_barX(d.end, true))
          @graph.svg.transition()
            .duration(transitionSpeed/3).delay(2*transitionSpeed/3)
            .selectAll(".#{@_nameToId()} rect")
            .attr("height", (d) => @yFunction().magnitude Math.abs(d.end.y))
            .attr("y", (d) => @_barY(d.end))
            .attr("class", (d, i) =>
              ["bar",
               ("colorless" unless @series.color)].join(" "))
            .each("end", ()=>
              count++
              draw() if count = transitionData.length
            )
        else

      else
        @aggdata = @utils.aggregateData @series.stack, @graph.x.domain() unless @aggdata
        draw(@transition)
        @animateShow() if @animateShowHide
    else
      @aggdata = @series.stack
      draw(@transition)
      @animateShow() if @animateShowHide

    selectObject.each("end", () => @animateShow() if @animateShowHide)


  setupTooltips: ->
    if @series.tooltip
      @seriesCanvas().selectAll("rect").tooltip (d, i) =>
        circleColor: @series.color
        graph: @graph
        text: @series.tooltip(d)
        circleOnHover: false
        tooltipCircleContainer: @graph.vis.node()
        gravity: "right"


  barWidth: ->
    data = @series.stack
    count = data.length
    barWidth = @graph.width() / count * (1 - @gapSize)

  seriesWidth: =>
    if @series.stack.length >= 2
      stackWidth = @graph.x(@series.stack[1].x) - @graph.x(@series.stack[0].x)
      width = stackWidth / (1 + @gapSize)
    else
      width = @graph.width() / (1 + @gapSize)

  _seriesBarWidth: =>
    if @aggregated
      count = @utils.domainMonthRange(@graph.x.domain())
      if      12 < count <= 36
        count = Math.ceil(count/3)
      else if 36 < count
        count = Math.ceil(count/12)
    else
      count = @series.stack.length

    width = @graph.width() / count
    width = width / @graph.series.filter((d) =>
      d.renderer == @name).array.length

    width = width - (2 * @gapSize)
    width

  _barXOffset: (seriesBarWidth) ->
    count = @graph.renderersByType(@name).length
    barXOffset = -seriesBarWidth * count / 2

  _barX: (d) =>
    seriesBarWidth = @_seriesBarWidth()
    if @aggregated
      x = d.x
      cnt_series = @graph.series.filter((d) =>
        d.renderer == @name).array.length
      initialX = x * (seriesBarWidth + 2 * @gapSize) * cnt_series + @gapSize
      initialX + (@_waterfalRendererIndex() * seriesBarWidth)
    else
      x = @graph.x(d.x)
      initialX = x + @_barXOffset(seriesBarWidth)
      initialX + (@_waterfalRendererIndex() * seriesBarWidth)

  _barY: (d, i) =>
    if d.y > 0
      @graph.y(d.y + d.y00)
    else
      @graph.y(d.y00)

  _waterfalRendererIndex: ->
    return 0 if @rendererIndex == 0 || @rendererIndex is undefined
    renderers = @graph.renderers.slice(0, @rendererIndex)
    _.filter(renderers,(r) => r.name == @name).length
