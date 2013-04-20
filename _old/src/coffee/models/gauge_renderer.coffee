Tactile.GaugeRenderer = class GaugeRenderer extends RendererBase
  name: "gauge"

  specificDefaults:
    cartesian: false
    
  render: (transition)->
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

    

    # outer full scale arc
    outerArc = d3.svg.arc()
      .outerRadius(r * ringWidth)
      .innerRadius(r * ringInset)
      .startAngle( @graph._deg2rad(minAngle) )
      .endAngle( @graph._deg2rad(minAngle + angleRange) )
      
    arcs = @graph.vis.append("g")
    .attr("class", "gauge arc")
    .attr("transform", originTranslate)
    
    # main arc
    arcs.selectAll("path")
    .data([1])
    .enter()
    .append("path")
    .attr "d", outerArc
    
    
    # arc representing plot value
    plotAngle = minAngle + (scale(plotValue) * angleRange)
    innerArc = d3.svg.arc()
      .outerRadius( r * ringWidth )
      .innerRadius( r * ringInset )
      .startAngle( @graph._deg2rad(minAngle) )
      .endAngle( @graph._deg2rad(plotAngle) )


    arcsInner = @graph.vis.append("g")
    .attr("class", "gauge arc-value")
    .attr("transform", originTranslate)
    
    arcsInner.selectAll("path")
      .data([1])
      .enter()
      .append("path")
      .attr "d", innerArc

  # pointer
    lineData = [
      [ (r * pointerWidth / 2) , 0                        ]
      [ 0                      , -(r * pointerHeadLength) ]
      [ -(r * pointerWidth / 2), 0                        ]
      [ 0                      , (r * pointerTailLength)  ]
      [ (r * pointerWidth / 2) , 0                        ]
    ]

    pointerLine = d3.svg.line().interpolate("monotone")

    pg = @graph.vis.append("g")
      .data([lineData])
      .attr("class", "gauge pointer")
      .attr("transform", originTranslate)
      
      
    pointer = pg.append("path").attr("d", pointerLine)
    @transition.selectAll(".gauge.pointer path")
      .attr("transform", "rotate(#{plotAngle})")

    @graph.vis.append("svg:circle")
      .attr("r", @graph.width() / 30)
      .attr("class", "gauge pointer-circle")
      .style("opacity", 1)
      .attr "transform", originTranslate
    # pointer circle then inner-circle (nail)
    @graph.vis.append("svg:circle")
      .attr("r", @graph.width() / 90)
      .attr('class', 'gauge pointer-nail')
      .style("opacity", 1)
      .attr('transform', originTranslate)
    
    @renderLabels() if @series.labels
      
  renderLabels: ->
    @graph.vis.append("text")
      .attr("class", "gauge label")
      .text(@min)
      .attr("transform", "translate(#{0.1 * @graph.width()},
      #{1.15 * @graph.height() * @bottomOffset})")
    @graph.vis.append("text")
      .attr("class", "gauge label")
      .text(@value)
      .attr("transform", "translate(#{( @graph.width() -
@graph.margin.right ) / 1.95}, #{1.20 * @graph.height() * @bottomOffset})")
    @graph.vis.append("text")
      .attr("class", "gauge label")
      .text(@max)
      .attr("transform", "translate(#{0.90 * @graph.width()},
      #{1.15 * @graph.height() * @bottomOffset})")
    
  domain: ->
    @value = @series.stack[0].value
    @min = @series.stack[0].min
    @max = @series.stack[0].max

    [@min, @max]
