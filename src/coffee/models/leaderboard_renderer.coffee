Tactile.LeaderboardRenderer = class LeaderboardRenderer extends RendererBase
  name: "leaderboard"

  specificDefaults:
    format: d3.format("p")
    barHeight: 40

  initialize: =>
    @format = @series.format unless @series.format is undefined

  render: (transition, transitionSpeed)->
    @transition = transition if transition
    bars = @seriesCanvas().selectAll("g.leaderboard.bars")
      .data(@series.stack)

    bars.enter()
      .append("svg:g")
      .attr("class", "leaderboard bars")

    bars.exit().remove()

    @seriesCanvas().selectAll("g.leaderboard.bars")
      .each((d, i)->
        track = d3.select(@).selectAll("rect.leaderboard.track").data([d])
        track.enter()
          .append("svg:rect")
          .attr("class", "leaderboard track")
        track.exit().remove()

        bar = d3.select(@).selectAll("rect.leaderboard.bar").data([d])
        bar.enter()
          .append("svg:rect")
          .attr("class", "leaderboard bar")
        bar.exit().remove()

        label = d3.select(@).selectAll("text.leaderboard.label").data([d])
        label.enter()
          .append("text")
          .attr("class", "leaderboard label")
        label.exit().remove()

        value = d3.select(@).selectAll("text.leaderboard.value").data([d])
        value.enter()
          .append("text")
          .attr("class", "leaderboard value")
        value.exit().remove()

        change = d3.select(@).selectAll("text.leaderboard.change").data([d])
        change.enter()
          .append("text")
          .attr("class", "leaderboard change")
        change.exit().remove()

        triangle = d3.select(@).selectAll("path").data([d])
        triangle.enter()
          .append("svg:path")
        triangle.exit().remove()
        triangle
      )

    @transition.selectAll("##{@_nameToId()} rect.leaderboard.track")
      .duration(transitionSpeed / 2)
      .attr("width", @graph.width())
      .attr("height", 6)
      .attr("rx", 4)
      .attr("ry", 4)

    @transition.selectAll("##{@_nameToId()} rect.leaderboard.bar")
      .duration(transitionSpeed / 2)
      .attr("height", 6)
      .attr("width", (d)=>@graph.width()*d.barPosition)
      .attr("rx", 4)
      .attr("ry", 4)

    @transition.selectAll("##{@_nameToId()} text.leaderboard.label")
      .duration(transitionSpeed / 2)
      .text((d)->d.label)
      .attr("transform", "translate(3 -8)")

    @transition.selectAll("##{@_nameToId()} text.leaderboard.value")
      .duration(transitionSpeed / 2)
      .tween("text", (d) ->
        i = d3.interpolate(@textContent, d.value)
        (t) ->
          @textContent = _this.format Math.floor i(t)
      )
      .attr("text-anchor", "end")
      .attr("transform", "translate(#{@graph.width()-50} -8)")

    @transition.selectAll("##{@_nameToId()} text.leaderboard.change")
      .duration(transitionSpeed / 2)
      .tween("text", (d) ->
        i = d3.interpolate(@textContent, d.change)
        (t) ->
          @textContent = _this.format Math.floor i(t)
      )
      .attr("text-anchor", "end")
      .attr("transform", "translate(#{@graph.width()} -8)")

    @transition.selectAll("##{@_nameToId()} path")
      .duration(transitionSpeed / 2)
      .attr("d", d3.svg.symbol().size(18).type((d) ->
        if d.change > 0 then "triangle-up"
        else if d.change < 0 then "triangle-down"
      ))
      .attr("class", (d) ->
        if d.change > 0 then "triangle-up"
        else if d.change < 0 then "triangle-down"
      )

    @transition.selectAll("##{@_nameToId()} rect.leaderboard.track")
      .delay(transitionSpeed / 2)
      .duration(transitionSpeed / 2)
      .attr("y", @_yOffset)

    @transition.selectAll("##{@_nameToId()} rect.leaderboard.bar")
      .delay(transitionSpeed / 2)
      .duration(transitionSpeed / 2)
      .attr("y", @_yOffset)

    @transition.selectAll("##{@_nameToId()} text.leaderboard.label")
      .delay(transitionSpeed / 2)
      .duration(transitionSpeed / 2)
      .attr("y", @_yOffset)

    @transition.selectAll("##{@_nameToId()} text.leaderboard.value")
      .delay(transitionSpeed / 2)
      .duration(transitionSpeed / 2)
      .attr("y", @_yOffset)

    @transition.selectAll("##{@_nameToId()} text.leaderboard.change")
      .delay(transitionSpeed / 2)
      .duration(transitionSpeed / 2)
      .attr("y", @_yOffset)

    @transition.selectAll("##{@_nameToId()} path")
      .delay(transitionSpeed / 2)
      .duration(transitionSpeed / 2)
      .attr("transform", (d,i)=> "translate(#{@graph.width()-10},"+(@_yOffset(d, i)-22)+")")

  _xOffset: =>

  _yOffset: (d, i)=>
    yMargin = (@graph.height() - @series.stack.length * @barHeight) / (@series.stack.length + 1)
    yMargin + (@barHeight + yMargin) * d.index

