Tactile.LeaderboardRenderer = class LeaderboardRenderer extends RendererBase
  name: "leaderboard"

  specificDefaults:
    format: d3.format("p")
    barHeight: 40

  initialize: =>
    @format = @series.format unless @series.format is undefined

  render: (transition, transitionSpeed)->
    scal = d3.scale.linear().domain([0,1]).range([ 0, @graph.width() ])
    yOffset = (@graph.height() - @series.stack.lenght * @barHeight) / (@series.stack.lenght + 1)
    @seriesCanvas().selectAll("bars")
      .data(@series.stack)
      .enter()
      .append("svg:g")
      .attr("class", "leaderboard bars")

    @seriesCanvas().selectAll('.leaderboard.bars')
      .append("svg:rect")
      .attr("width", @graph.width())
      .attr("height", 6)
      .attr("y", @_yOffset)
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("class", "leaderboard track")

    @seriesCanvas().selectAll('.leaderboard.bars')
      .append("svg:rect")
      .attr("height", 6)
      .attr("width", (d)=>@graph.width()*d.barPosition)
      .attr("y", @_yOffset)
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("class", "leaderboard bar")

    @seriesCanvas().selectAll('.leaderboard.bars')
      .append("text")
      .attr("class", "leaderboard label")
      .text((d)->d.label)
      .attr("y", @_yOffset)
      .attr("transform", "translate(3 -8)")

    @seriesCanvas().selectAll('.leaderboard.bars')
      .append("text")
      .attr("class", "leaderboard value")
      .text((d)=>@format(d.value))
      .attr("y", @_yOffset)
      .attr("text-anchor", "end")
      .attr("transform", "translate(#{@graph.width()-50} -8)")

    @seriesCanvas().selectAll('.leaderboard.bars')
      .append("text")
      .attr("class", "leaderboard change")
      .text((d)=>@format(d.change))
      .attr("y", @_yOffset)
      .attr("text-anchor", "end")
      .attr("transform", "translate(#{@graph.width()} -8)")

    @seriesCanvas().selectAll('.leaderboard.bars')
      .append("svg:path")
      .attr("class", "leaderboard triangle")
      .attr("transform", (d,i)=> "translate(#{@graph.width()-10},"+(@_yOffset(d, i)-22)+")")
      .attr("d", d3.svg.symbol().size(18).type((d) ->
        if d.change > 0 then "triangle-up"
        else if d.change < 0 then "triangle-down"
      ))
      .attr("class", (d) ->
        if d.change > 0 then "triangle-up"
        else if d.change < 0 then "triangle-down"
      )

  _xOffset: =>

  _yOffset: (d, i)=>
    yMargin = (@graph.height() - @series.stack.length * @barHeight) / (@series.stack.length + 1)
    yMargin + (@barHeight + yMargin) * i

