class Tactile.BulletRenderer extends Tactile.RendererBase
  name: "bullet"

  specificDefaults:
    format: d3.format("p")
    barHeight: 50
    margin:
      top: 5
      right: 40
      bottom: 20
      left: 120

  initialize: =>
    @format = @series.format unless @series.format is undefined

  render: (transition, transitionSpeed) ->
    width: @margin.width - @margin.left - @margin.right
    height: @barHeight - @margin.top - @margin.bottom

    @transition = transition if transition
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
        rengesData = d.ranges.slice()
        rengesData.sort((a, b)->
          if a.value > b.value
            -1
          else if a.value < b.value
            1
          else
            0
        )
        ranges = d3.select(@).selectAll("g.bullet.ranges").data([rengesData])
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
        measuresData = d.measures.slice()
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
          measure = d3.select(@).selectAll("rect.bullet.measures").data(d)
          measure.enter()
            .append("svg:rect")
            .attr("class", "bullet measures")
          measure.exit().remove()
        )
    )

    # draw titles
    @seriesCanvas().selectAll("##{@_nameToId()} g.bullet.titles")
      .attr("transform", (d, i) => "translate(#{@_xOffset(d, i) - 6}, #{@_yOffset(d, i) + @barHeight/2 - 5})")

    @transition.selectAll("##{@_nameToId()} text.bullet.title")
#      .filter((d) => !isNaN(d.value) and !isNaN(d.change) and !isNaN(d.barPosition) and d.label? and d.value? and d.change? and d.barPosition?)
      .duration(transitionSpeed / 2)
      .text((d) -> d.title)
      .attr("transform", "translate(3 -8)")
      .attr("text-anchor", "end")

    @transition.selectAll("##{@_nameToId()} text.bullet.subtitle")
#      .filter((d) => !isNaN(d.value) and !isNaN(d.change) and !isNaN(d.barPosition) and d.label? and d.value? and d.change? and d.barPosition?)
      .duration(transitionSpeed / 2)
      .text((d) -> d.subtitle)
      .attr("transform", "translate(3 -8)")
      .attr("dy", "1em")
      .attr("text-anchor", "end")

    render = @
    @seriesCanvas().selectAll("g.bullet.bars").each((d, i) ->
      scal = d3.scale.linear()
        .domain([0, d3.max([d3.max(d.ranges, (d) -> d.value), d3.max(d.measures, (d) -> d.value)])])
        .range([0, render.graph.width() - render.margin.left - render.margin.right])

      element = @
      curEl = render.transition.selectAll("##{render._nameToId()} g.bullet.bars")
        .filter(()-> @ is element)

      # draw ranges
      render.seriesCanvas().selectAll("##{render._nameToId()} g.bullet.ranges")
        .attr("transform", (d, i) => "translate(#{render._xOffset(d, i)}, #{render._yOffset(d, i)})")

      curEl.selectAll("##{render._nameToId()} rect.bullet.range")
#      .filter((d) => !isNaN(d.value) and !isNaN(d.change) and !isNaN(d.barPosition) and d.label? and d.value? and d.change? and d.barPosition?)
        .duration(transitionSpeed / 2)
        .attr("height", render.barHeight/2)
        .attr("width", (d) => scal(d.value))
        .attr("fill", (d) -> d.color)

      # draw measures
      render.seriesCanvas().selectAll("##{render._nameToId()} g.bullet.measures")
        .attr("transform", (d, i) => "translate(#{render._xOffset(d, i)}, #{render._yOffset(d, i)})")

      curEl.selectAll("##{render._nameToId()} rect.bullet.measures")
#      .filter((d) => !isNaN(d.value) and !isNaN(d.change) and !isNaN(d.barPosition) and d.label? and d.value? and d.change? and d.barPosition?)
        .duration(transitionSpeed / 2)
        .attr("height", render.barHeight / 2 / 3)
        .attr("transform", "translate(0, #{render.barHeight / 2 / 3})")
        .attr("width", (d) => scal(d.value))
        .attr("fill", (d) -> d.color)
    )

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
