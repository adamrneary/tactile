class Tactile.GaugeRenderer extends Tactile.RendererBase
  name: "gauge"

  specificDefaults:
    cartesian: false
    oldValueAngle: 0

  render: (transition, transitionSpeed)->
    @_checkData()
    @transition = transition if transition
    scale = d3.scale.linear().range([0, 1]).domain(@domain())
    ringInset = 0.300
    ringWidth = 0.750
    pointerWidth = 0.100
    pointerTailLength = 0.015
    pointerHeadLength = 0.900
    totalSizeDivide = 1.3
    @bottomOffset = 0.75

    minAngle = -85
    maxAngle = 85
    angleRange = maxAngle - minAngle

    plotValue = @value
    r = Math.round( @graph.height() / totalSizeDivide )
    translateWidth = ( @graph.width() ) / 2
    translateHeight = r
    originTranslate = "translate(#{translateWidth}, #{translateHeight})"


    @seriesCanvas().each((d, i)->
      arc = d3.select(@).selectAll("path.gauge.arc").data([d])
      arc.enter()
        .append("svg:path")
        .attr("class", "gauge arc")
      arc.exit().remove()

      arc_value = d3.select(@).selectAll("path.gauge.arc-value").data([d])
      arc_value.enter()
        .append("svg:path")
        .attr("class", "gauge arc-value")
      arc_value.exit().remove()

      pointer = d3.select(@).selectAll("path.gauge.pointer").data([d])
      pointer.enter()
        .append("svg:path")
        .attr("class", "gauge pointer")
      pointer.exit().remove()

      pointer_circle = d3.select(@).selectAll("circle.gauge.pointer-circle").data([d])
      pointer_circle.enter()
        .append("svg:circle")
        .attr("class", "gauge pointer-circle")
      pointer_circle.exit().remove()

      pointer_nail = d3.select(@).selectAll("circle.gauge.pointer-nail").data([d])
      pointer_nail.enter()
        .append("svg:circle")
        .attr("class", "gauge pointer-nail")
      pointer_nail.exit().remove()

      min_label = d3.select(@).selectAll("text.gauge.label.min-label").data([d])
      min_label.enter()
        .append("text")
        .attr("class", "gauge label min-label")
      min_label.exit().remove()

      max_label = d3.select(@).selectAll("text.gauge.label.max-label").data([d])
      max_label.enter()
        .append("text")
        .attr("class", "gauge label max-label")
      max_label.exit().remove()

      value_label = d3.select(@).selectAll("text.gauge.label.value-label").data([d])
      value_label.enter()
        .append("text")
        .attr("class", "gauge label value-label")
      value_label.exit().remove()

    )
#      # outer full scale arc
    outerArc = d3.svg.arc()
      .outerRadius(r * ringWidth)
      .innerRadius(r * ringInset)
      .startAngle( @graph._deg2rad(minAngle) )
      .endAngle( @graph._deg2rad(minAngle + angleRange) )

    # main arc
    @transition.selectAll("##{@_nameToId()} path.gauge.arc")
      .attr( "transform", originTranslate )
      .attr( "d", outerArc )

    # arc representing plot value
    plotAngle = minAngle + (scale(plotValue) * angleRange)
    @transition.selectAll("##{@_nameToId()} path.gauge.arc-value")
      .attr("transform", originTranslate)
      .attrTween("d", (d, i) =>
        iEndAngle = d3.interpolate(@graph._deg2rad(@oldValueAngle), @graph._deg2rad(plotAngle) )
        @oldValueAngle = plotAngle
        (t) =>
          d3.svg.arc()
            .startAngle(@graph._deg2rad(minAngle))
            .endAngle(iEndAngle(t))
            .innerRadius( r * ringInset )
            .outerRadius( r * ringWidth )()
      )


    # pointer
    lineData = [
      [ (r * pointerWidth / 2) , 0                        ]
      [ 0                      , -(r * pointerHeadLength) ]
      [ -(r * pointerWidth / 2), 0                        ]
      [ 0                      , (r * pointerTailLength)  ]
      [ (r * pointerWidth / 2) , 0                        ]
    ]

    pointerLine = d3.svg.line().interpolate("monotone")

    @seriesCanvas().selectAll("path.gauge.pointer").data([lineData])

    @transition.selectAll("##{@_nameToId()} path.gauge.pointer")
      .attr("transform", "#{originTranslate} rotate(#{plotAngle})")
      .attr( "d", pointerLine)


    @transition.selectAll("##{@_nameToId()} circle.gauge.pointer-circle")
      .attr("transform", originTranslate)
      .attr("r", @graph.width() / 30)

    # pointer circle then inner-circle (nail)
    @transition.selectAll("##{@_nameToId()} circle.gauge.pointer-nail")
      .attr("transform", originTranslate)
      .attr("r", @graph.width() / 90)

    # min label
    @transition.selectAll("##{@_nameToId()} text.gauge.label.min-label")
    .text(@min)
    .attr("transform", "translate(#{0.1 * @graph.width()},
          #{1.15 * @graph.height() * @bottomOffset})")

    # max label
    @transition.selectAll("##{@_nameToId()} text.gauge.label.max-label")
      .text(@max)
      .attr("transform", "translate(#{0.90 * @graph.width()},
            #{1.15 * @graph.height() * @bottomOffset})")

    # value label
    @transition.selectAll("##{@_nameToId()} text.gauge.label.value-label")
      .attr("transform", "translate(#{( @graph.width() -
          @graph.margin.right ) / 1.95}, #{1.20 * @graph.height() * @bottomOffset})")
      .tween("text", (d) ->
        i = d3.interpolate(@textContent, _this.value)
        (t) ->
          @textContent = Math.floor i(t)
      )



  domain: ->
    @value = @series.stack[0].value
    @min = @series.stack[0].min
    @max = @series.stack[0].max

    [@min, @max]

  _checkData: ()=>
    data = @series.stack
    data.forEach((d, i) =>
      @utils.checkNumber(d.min, "#{@name} renderer data[#{i}].min")
      @utils.checkNumber(d.max, "#{@name} renderer data[#{i}].max")
      @utils.checkNumber(d.value, "#{@name} renderer data[#{i}].value")
    )
