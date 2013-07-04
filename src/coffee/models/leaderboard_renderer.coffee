class Tactile.LeaderboardRenderer extends Tactile.RendererBase
  name: "leaderboard"

  specificDefaults:
    changeFormat: d3.format("p")
    valueFormat: d3.format("p")
    barHeight: 30
    type: "normal"

  initialize: =>
    @changeFormat = @series.changeFormat unless @series.changeFormat is undefined
    @valueFormat = @series.valueFormat unless @series.valueFormat is undefined
    @type = @series.type unless @series.type is undefined

  render: (transition, transitionSpeed)->
    @_checkData()

    className = "leaderboard-" + @type

    data = _.map @series.stack, (d, i) =>
      d.lastData = @lastData?[i] or {barPosition: 0, change: 0, label: "", value: 0}
      d

    console.log data
    @transition = transition if transition
    bars = @seriesCanvas().selectAll("g." + className + ".bars")
      .data(data)

    bars.enter()
      .append("svg:g")
      .attr("class", className + " bars")

    bars.exit().remove()

    @seriesCanvas().selectAll("g." + className + ".bars")
      .each((d, i)->
        track = d3.select(@).selectAll("rect." + className + ".track").data([d])
        track.enter()
          .append("svg:rect")
          .attr("class", className + " track")
        track.exit().remove()

        bar = d3.select(@).selectAll("rect." + className + ".bar").data([d])
        bar.enter()
          .append("svg:rect")
          .attr("class", className + " bar")
        bar.exit().remove()

        label = d3.select(@).selectAll("text." + className + ".label").data([d])
        label.enter()
          .append("text")
          .attr("class", className + " label")
        label.exit().remove()

        value = d3.select(@).selectAll("text." + className + ".value").data([d])
        value.enter()
          .append("text")
          .attr("class", className + " value")
        value.exit().remove()

        change = d3.select(@).selectAll("text." + className + ".change").data([d])
        change.enter()
          .append("text")
          .attr("class", className + " change")
        change.exit().remove()

        triangle = d3.select(@).selectAll("path").data([d])
        triangle.enter()
          .append("svg:path")
        triangle.exit().remove()
        triangle
      )

    @transition.selectAll(".#{@_nameToId()} rect." + className + ".track")
      .filter((d) => !isNaN(d.value) and !isNaN(d.change) and !isNaN(d.barPosition) and d.label? and d.value? and d.change? and d.barPosition?)
      .duration(transitionSpeed / 2)
      .attr("width", @graph.width())
      .attr("height", 6)
      .attr("rx", 4)
      .attr("ry", 4)

    @transition.selectAll(".#{@_nameToId()} rect." + className + ".bar")
      .filter((d) => !isNaN(d.value) and !isNaN(d.change) and !isNaN(d.barPosition) and d.label? and d.value? and d.change? and d.barPosition?)
      .duration(transitionSpeed / 2)
      .attr("height", 6)
      .attr("width", (d)=>@graph.width()*d.barPosition)
      .attr("rx", 4)
      .attr("ry", 4)

    @transition.selectAll(".#{@_nameToId()} text." + className + ".label")
      .filter((d) => !isNaN(d.value) and !isNaN(d.change) and !isNaN(d.barPosition) and d.label? and d.value? and d.change? and d.barPosition?)
      .duration(transitionSpeed / 2)
      .text((d)->d.label)
      .attr("transform", "translate(3, #{if @type is "normal" then -5 else -2})")

    @transition.selectAll(".#{@_nameToId()} text." + className + ".value")
      .filter((d) => !isNaN(d.value) and !isNaN(d.change) and !isNaN(d.barPosition) and d.label? and d.value? and d.change? and d.barPosition?)
      .duration(transitionSpeed / 2)
      .tween("text", (d) ->
        i = d3.interpolate(d.lastData?.value, d.value)
        (t) ->
          @textContent = _this.valueFormat i(t)
      )
      .attr("text-anchor", "end")
      .attr("transform", "translate(#{@graph.width()-40}, #{if @type is "normal" then -5 else -2})")

    @transition.selectAll(".#{@_nameToId()} text." + className + ".change")
      .filter((d) => !isNaN(d.value) and !isNaN(d.change) and !isNaN(d.barPosition) and d.label? and d.value? and d.change? and d.barPosition?)
      .duration(transitionSpeed / 2)
      .tween("text", (d) ->
        i = d3.interpolate(d.lastData?.change, d.change)
        (t) ->
          @textContent = _this.changeFormat i(t)
      )
      .attr("text-anchor", "end")
      .attr("transform", "translate(#{@graph.width()}, #{if @type is "normal" then -5 else -2})")

    @transition.selectAll(".#{@_nameToId()} path")
      .filter((d) => !isNaN(d.value) and !isNaN(d.change) and !isNaN(d.barPosition) and d.label? and d.value? and d.change? and d.barPosition?)
      .duration(transitionSpeed / 2)
      .attr("d", d3.svg.symbol().size(18).type((d) ->
        if d.change > 0 then "triangle-up"
        else if d.change < 0 then "triangle-down"
      ))
      .attr("class", (d) ->
        if d.change > 0 then "triangle-up"
        else if d.change < 0 then "triangle-down"
      )

    @transition.selectAll(".#{@_nameToId()} rect." + className + ".track")
      .filter((d) => !isNaN(d.value) and !isNaN(d.change) and !isNaN(d.barPosition) and d.label? and d.value? and d.change? and d.barPosition?)
      .delay(transitionSpeed / 2)
      .duration(transitionSpeed / 2)
      .attr("y", @_yOffset)

    @transition.selectAll(".#{@_nameToId()} rect." + className + ".bar")
      .filter((d) => !isNaN(d.value) and !isNaN(d.change) and !isNaN(d.barPosition) and d.label? and d.value? and d.change? and d.barPosition?)
      .delay(transitionSpeed / 2)
      .duration(transitionSpeed / 2)
      .attr("y", @_yOffset)

    @transition.selectAll(".#{@_nameToId()} text." + className + ".label")
      .filter((d) => !isNaN(d.value) and !isNaN(d.change) and !isNaN(d.barPosition) and d.label? and d.value? and d.change? and d.barPosition?)
      .delay(transitionSpeed / 2)
      .duration(transitionSpeed / 2)
      .attr("y", @_yOffset)

    @transition.selectAll(".#{@_nameToId()} text." + className + ".value")
      .filter((d) => !isNaN(d.value) and !isNaN(d.change) and !isNaN(d.barPosition) and d.label? and d.value? and d.change? and d.barPosition?)
      .delay(transitionSpeed / 2)
      .duration(transitionSpeed / 2)
      .attr("y", @_yOffset)

    @transition.selectAll(".#{@_nameToId()} text." + className + ".change")
      .filter((d) => !isNaN(d.value) and !isNaN(d.change) and !isNaN(d.barPosition) and d.label? and d.value? and d.change? and d.barPosition?)
      .delay(transitionSpeed / 2)
      .duration(transitionSpeed / 2)
      .attr("y", @_yOffset)

    @transition.selectAll(".#{@_nameToId()} path")
      .filter((d) => !isNaN(d.value) and !isNaN(d.change) and !isNaN(d.barPosition) and d.label? and d.value? and d.change? and d.barPosition?)
      .delay(transitionSpeed / 2)
      .duration(transitionSpeed / 2)
      .attr("transform", (d, i) => "translate(#{@graph.width()-10}, #{(@_yOffset(d, i) - if @type is "normal" then 22 else 16)})")

    @lastData = @series.stack

  _xOffset: =>

  _yOffset: (d, i)=>
    yMargin = (@graph.height() - @series.stack.length * @barHeight) / (@series.stack.length + 1)
    yMargin + @barHeight + (@barHeight + yMargin) * @_index(d, i)

  _index: (d, i) =>
    if !isNaN(d.index) and d.index?
      d.index
    else
      i

  _checkData: ()=>
    data = @series.stack
    data.forEach((d, i) =>
      @utils.checkString(d.color, "#{@name} renderer data[#{i}].label", d)
      @utils.checkNumber(d.value, "#{@name} renderer data[#{i}].value", d)
      @utils.checkNumber(d.change, "#{@name} renderer data[#{i}].change", d)
      @utils.checkNumber(d.barPosition, "#{@name} renderer data[#{i}].barPosition", d)
    )

