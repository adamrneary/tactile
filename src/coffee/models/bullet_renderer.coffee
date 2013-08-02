class Tactile.BulletRenderer extends Tactile.RendererBase
  name: "bullet"

  specificDefaults:
    format: d3.format("p")
    tickCount: 5
    barHeight: 50
    margin:
      top: 5
      right: 40
      bottom: 20
      left: 120

  initialize: =>
    @format = @series.format unless @series.format is undefined
    @margin = @series.margin unless @series.margin is undefined
    @tickCount = @series.tickCount unless @series.tickCount is undefined

  render: (transition, transitionSpeed) ->
    @_checkData() if @checkData

    width: @margin.width - @margin.left - @margin.right
    height: @barHeight - @margin.top - @margin.bottom

    @transition = transition if transition

    oldData = @seriesCanvas().selectAll("g.bullet.bars").data()
    @series.stack.forEach((d, i) ->
        d.maxValue = d3.max([d3.max(d.ranges, (d) -> d.value), d3.max(d.measures, (d) -> d.value), d3.max(d.markers, (d) -> d.value)])
        d.maxValueOld = oldData[i]?.maxValue
    )

    bars = @seriesCanvas().selectAll("g.bullet.bars")
      .data(@series.stack)

    bars.enter()
      .append("svg:g")
      .attr("class", "bullet bars")

    bars.exit().remove()

    @seriesCanvas().selectAll("g.bullet.bars").each((d, i) ->
        # append titles
        titles = d3.select(@).selectAll("g.bullet.titles").data([d])
        titles.enter()
          .append("svg:g")
          .attr("class", "bullet titles")

        d3.select(@).selectAll("g.bullet.titles").each((d, i) ->
          title = d3.select(@).selectAll("text.bullet.title").data([d])
          title.enter()
            .append("text")
            .attr("class", "bullet title")
          title.exit().remove()

          subtitle = d3.select(@).selectAll("text.bullet.subtitle").data([d])
          subtitle.enter()
            .append("text")
            .attr("class", "bullet subtitle")
          subtitle.exit().remove()
        )

        # append ranges
        rangesData = _.map d.ranges.slice(), (r) ->
          r.title = d.title
          r.subtitle = d.subtitle
          r

        rangesData.sort((a, b)->
          if a.value > b.value
            -1
          else if a.value < b.value
            1
          else
            0
        )
        ranges = d3.select(@).selectAll("g.bullet.ranges").data([rangesData])
        ranges.enter()
          .append("svg:g")
          .attr("class", "bullet ranges")

        d3.select(@).selectAll("g.bullet.ranges").each((d, i) ->
          range = d3.select(@).selectAll("rect.bullet.range").data(d)
          range.enter()
            .append("svg:rect")
            .attr("class", "bullet range")
          range.exit().remove()
        )

        # append measures
        measuresData = _.map d.measures.slice(), (m) ->
          m.title = d.title
          m.subtitle = d.subtitle
          m

        measuresData.sort((a, b)->
          if a.value > b.value
            -1
          else if a.value < b.value
            1
          else
            0
        )
        measures = d3.select(@).selectAll("g.bullet.measures").data([measuresData])
        measures.enter()
          .append("svg:g")
          .attr("class", "bullet measures")

        d3.select(@).selectAll("g.bullet.measures").each((d, i) ->
          measure = d3.select(@).selectAll("rect.bullet.measure").data(d)
          measure.enter()
            .append("svg:rect")
            .attr("class", "bullet measure")
          measure.exit().remove()
        )

        #append markers
        markersData = _.map d.markers.slice(), (m) ->
          m.title = d.title
          m.subtitle = d.subtitle
          m

        markers = d3.select(@).selectAll("g.bullet.markers").data([markersData])
        markers.enter()
          .append("svg:g")
          .attr("class", "bullet markers")

        d3.select(@).selectAll("g.bullet.markers").each((d, i) ->
          marker = d3.select(@).selectAll("line.bullet.marker").data(d)
          marker.enter()
            .append("svg:line")
            .attr("class", "bullet marker")
          marker.exit().remove()
        )
    )

    # draw titles
    @seriesCanvas().selectAll(".#{@_nameToId()} g.bullet.titles")
      .attr("transform", (d, i) => "translate(#{@_xOffset(d, i) - 6}, #{@_yOffset(d, i) + @barHeight/2 - 5})")

    @transition.selectAll(".#{@_nameToId()} text.bullet.title")
      .filter((d) => @_filterNaNs(d, 'title'))
      .duration(transitionSpeed)
      .text((d) -> d.title)
      .attr("transform", "translate(3 -8)")
      .attr("text-anchor", "end")

    @transition.selectAll(".#{@_nameToId()} text.bullet.subtitle")
      .filter((d) => @_filterNaNs(d, 'subtitle'))
      .duration(transitionSpeed)
      .text((d) -> d.subtitle)
      .attr("transform", "translate(3 -8)")
      .attr("dy", "1em")
      .attr("text-anchor", "end")

    render = @
    @seriesCanvas().selectAll("g.bullet.bars").each((d, i) ->
      scal = d3.scale.linear()
        .domain([0, d.maxValue])
        .range([0, render.graph.width() - render.margin.left - render.margin.right])

      scalOld = d3.scale.linear()
        .domain([0, d.maxValueOld])
        .range([0, render.graph.width() - render.margin.left - render.margin.right])


      element = @
      curEl = render.transition.selectAll(".#{render._nameToId()} g.bullet.bars")
        .filter(()-> @ is element)

      # draw ranges
      render.seriesCanvas().selectAll(".#{render._nameToId()} g.bullet.ranges")
        .attr("transform", (d, i) => "translate(#{render._xOffset(d, i)}, #{render._yOffset(d, i)})")

      curEl.selectAll(".#{render._nameToId()} rect.bullet.range")
        .filter((d) => render._filterNaNs(d, 'value', 'color'))
        .duration(transitionSpeed)
        .attr("height", render.barHeight/2)
        .attr("width", (d) => scal(d.value))
        .attr("fill", (d) -> d.color)

      # draw measures
      render.seriesCanvas().selectAll(".#{render._nameToId()} g.bullet.measures")
        .attr("transform", (d, i) => "translate(#{render._xOffset(d, i)}, #{render._yOffset(d, i)})")

      curEl.selectAll(".#{render._nameToId()} rect.bullet.measure")
        .filter((d) => render._filterNaNs(d, 'value', 'color'))
        .duration(transitionSpeed)
        .attr("height", render.barHeight / 2 / 3)
        .attr("transform", "translate(0, #{render.barHeight / 2 / 3})")
        .attr("width", (d) => scal(d.value))
        .attr("fill", (d) -> d.color)

      # draw markers
      render.seriesCanvas().selectAll(".#{render._nameToId()} g.bullet.markers")
        .attr("transform", (d, i) => "translate(#{render._xOffset(d, i)}, #{render._yOffset(d, i)})")

      curEl.selectAll(".#{render._nameToId()} line.bullet.marker")
        .filter((d) => render._filterNaNs(d, 'value', 'color'))
        .duration(transitionSpeed)
        .attr("x1", (d) -> scal(d.value))
        .attr("x2", (d) -> scal(d.value))
        .attr("y1", 2)
        .attr("y2", render.barHeight/2 - 2)
        .attr("stroke", (d) -> d.color)
        .attr("stroke-width", 2)


      # append ticks
      ticks = d3.select(@).selectAll("g.bullet.ticks").data([scal.ticks(render.tickCount)])
      ticks.enter()
        .append("svg:g")
        .attr("class", "bullet ticks")

      curEl.selectAll("g.bullet.ticks").each((d, i) ->
        tick = d3.select(@).selectAll("g.bullet.tick").data(d)
        tickEnter = tick.enter()
          .append("svg:g")
          .attr("class", "bullet tick")
        tickEnter.append("svg:line")
          .style("opacity", 1e-6)
          .attr("y1", render.barHeight/2)
          .attr("y2", render.barHeight/2 + 4)
          .attr("x1", (d) -> scalOld(d))
          .attr("x2", (d) -> scalOld(d))

        tickEnter.append("text")
          .attr("x", (d) -> scalOld(d))
          .attr("y", render.barHeight/2 + 4)
          .attr("dy", "1em")
          .style("opacity", 1e-6)

        tick.exit().transition()
          .duration(transitionSpeed)
          .style("opacity", 1e-6)
          .remove()
      )
      d3.select(@).selectAll("g.bullet.ticks line").data(scal.ticks(render.tickCount))
      d3.select(@).selectAll("g.bullet.ticks text").data(scal.ticks(render.tickCount))

      # draw ticks
      render.seriesCanvas().selectAll(".#{render._nameToId()} g.bullet.ticks")
        .attr("transform", (d, i) => "translate(#{render._xOffset(d, i)}, #{render._yOffset(d, i)})")

      curEl.selectAll(".#{render._nameToId()} g.bullet.tick line")
        .duration(transitionSpeed)
        .attr("x1", (d) -> scal(d))
        .attr("x2", (d) -> scal(d))
        .attr("y1", render.barHeight/2)
        .attr("y2", render.barHeight/2 + 4)
        .attr("stroke", "#BBBBBB")
        .attr("stroke-width", 1)
        .style("opacity", 1)

      curEl.selectAll(".#{render._nameToId()} g.bullet.tick text")
        .duration(transitionSpeed)
        .attr("text-anchor", "middle")
        .attr("x", (d) -> scal(d))
        .attr("y", render.barHeight/2 + 4)
        .attr("dy", "1em")
        .style("opacity", 1)
        .text((d)-> render.format(d))
    )

    # Add tooltips
    if @series.rangesTooltip
      @seriesCanvas().selectAll(".bullet.range")
        .tooltip (d, i) =>
          graph: @graph
          text: @series.rangesTooltip(d, i)
          gravity: "right"
          placement: "right"

    if @series.measuresTooltip
        @seriesCanvas().selectAll(".bullet.measure")
        .tooltip (d, i) =>
          graph: @graph
          text: @series.measuresTooltip(d, i)
          gravity: "right"
          placement: "right"

    if @series.markersTooltip
        @seriesCanvas().selectAll(".bullet.marker")
        .tooltip (d, i) =>
          graph: @graph
          text: @series.markersTooltip(d, i)
          gravity: "right"
          placement: "right"


  _xOffset: (d, i)=>
    @margin.left

  _yOffset: (d, i)=>
    yMargin = (@graph.height() - @series.stack.length * @barHeight - @margin.top - @margin.bottom) / (@series.stack.length + 1)
    yMargin + (@barHeight + yMargin) * @_index(d, i) + @margin.top

  _index: (d, i) =>
    if !isNaN(d.index) and d.index?
      d.index
    else
      i

  _checkData: ()=>
    data = @series.stack
    data.forEach((d, i) =>
      @utils.checkString(d.title, "#{@name} renderer data[#{i}].title")
      @utils.checkString(d.subtitle, "#{@name} renderer data[#{i}].subtitle")
      if @utils.checkArray(d.ranges, "#{@name} renderer data[#{i}].ranges")
        d.ranges.forEach((r, j)=>
          @utils.checkNumber(r.value, "#{@name} renderer data[#{i}].ranges[#{j}].value")
          @utils.checkString(r.color, "#{@name} renderer data[#{i}].ranges[#{j}].color")
        )
      if @utils.checkArray(d.measures, "#{@name} renderer data[#{i}].measures")
        d.measures.forEach((r, j)=>
          @utils.checkNumber(r.value, "#{@name} renderer data[#{i}].measures[#{j}].value")
          @utils.checkString(r.color, "#{@name} renderer data[#{i}].measures[#{j}].color")
        )
      if @utils.checkArray(d.markers, "#{@name} renderer data[#{i}].markers")
        d.markers.forEach((r, j)=>
          @utils.checkNumber(r.value, "#{@name} renderer data[#{i}].markers[#{j}].value")
          @utils.checkString(r.color, "#{@name} renderer data[#{i}].markers[#{j}].color")
        )
    )