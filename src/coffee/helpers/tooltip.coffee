#
# Copied from https://github.com/zmaril/d3-bootstrap-plugins
#
class Tactile.Tooltip
  @_spotlightMode: false

  @turnOffspotlight: () ->
    Tooltip._spotlightMode = false

  @spotlightOn: (d) ->
    Tooltip._spotlightMode = true

  @getSpotlight: () ->
    Tooltip._spotlightMode

  constructor: (@el, @options) ->
    @el = d3.select(@el)
    @annotate()

  # TODO: Done in a hurry. Dry this out.
  appendTooltip: ->
    chartContainer = d3.select(@options.graph._element)
    if Tooltip._spotlightMode && @el.node().classList.contains("active")
      tip = chartContainer.select('.tooltip')
    else
      chartContainer.selectAll('.tooltip').remove()
      tip = chartContainer.append('div')
        .classed("tooltip", true)

      tip.append('div')
        .html(@options.text)
        .classed("tooltip-inner", true)

    return tip

  annotate: () ->
    chartContainer = @el.node().nearestViewportElement

    # tooltipCircleContainer is an element to which the circle will be appended
    # sets the parent node by default
    if @options.tooltipCircleContainer
      @tooltipCircleContainer = @options.tooltipCircleContainer
    else if @options.circleOnHover
      @tooltipCircleContainer = @el.node().parentNode

    moveTip = (tip) =>
      center = [0,0]
      if @options.placement is "mouse"
        center = d3.mouse(@options.graph._element)
      else
        if @options.position
          center[0] = @options.position[0]
          center[1] = @options.position[1]
        else

          if @options.graph.series[0].renderer is "donut"
            hoveredNode = @el.node().parentNode.getBoundingClientRect()
          else
            hoveredNode = @el.node().getBoundingClientRect()
          center[0] = hoveredNode.left + hoveredNode.width / 2
          if @options.placement is "bottom"
            center[1] = hoveredNode.bottom
          else
            center[1] = hoveredNode.top

          if @options.placement is "right"
            center[0] += hoveredNode.width / 2
          if @options.placement is "left"
            center[0] -= hoveredNode.width / 2


          if @options.graph.series[0].renderer is "donut"
            center[1] += (hoveredNode.height / 2 - 1)

        if @el.node().tagName == 'circle'
          center[1] += (hoveredNode.height / 2 - 1)

      if @options.displacement
        center[0] += @options.displacement[0]
        center[1] += @options.displacement[1]

      tip
        .style("left","#{center[0]}px")
        .style("top","#{center[1]}px")
        .style("display","block")
        .style("position", "fixed")

    @el.on("mouseover", () =>
     if Tooltip._spotlightMode
        return unless @el.node().classList.contains("active")

      tip = @appendTooltip()

      # puts small circle on the hovered node
      @_appendTipCircle() if @options.circleOnHover

      tip.classed("annotation", true)
        .classed(@options.gravity, true)
        .style("display","none")

      tip.classed('fade', true) if @options.fade

      tip.append("div").attr("class","arrow")
      tip.select('.tooltip-inner').html(@options.text)
      inner = () -> tip.classed('in', true)

      setTimeout(inner,10)

      tip.style("display","")
      moveTip(tip)
    )

    mouseMove = () ->
      d3.select(".annotation").call(moveTip.bind(@))

    if @options.mousemove
      @el.on("mousemove", mouseMove)

    @el.on("mouseout", () =>
      return if Tooltip._spotlightMode # don't hide the tooltip if spotlight
      d3.select(@tooltipCircleContainer).selectAll("circle.tooltip-circle")
        .remove()

      # bring back the original style of a circle
      if @el.node().tagName == 'circle' and @el.attr("class").search(/active/) == -1
        @el.classed('tip-hovered', false)
        @el.attr('stroke', @el.attr('data-stroke-color'))
        @el.attr('fill', @el.attr('data-fill-color'))

      tip = d3.selectAll(".annotation").classed('in', false)
      remover = () -> tip.remove()
      setTimeout(remover, 150)
    )

  _appendTipCircle: ->
    hoveredNode = @el.node().getBBox()
    svgNode = d3.select(@options.graph._element).select('svg').node()

    # if element is a circle we would overwrite it's style
    # without appending another circle for tip
    if @el.node().tagName == 'circle'
      if @el.attr("class").search(/active/) == -1
        @el.attr(
          'data-stroke-color',
          @el.attr('stroke')) unless @el.attr('data-stroke-color'
        )
        @el.attr(
          'data-fill-color',
          @el.attr('fill')) unless @el.attr('data-fill-color'
        )
        @el.attr('fill', @el.attr('data-stroke-color'))
        @el.attr('stroke', @el.attr('data-fill-color'))
    else
      d3.select(@tooltipCircleContainer)
        .append("svg:circle")
        .attr("cx", hoveredNode.x + svgNode.offsetLeft + hoveredNode.width / 2)
        .attr("cy", hoveredNode.y + svgNode.offsetTop)
        .attr("r", 4)
        .attr('class', 'tooltip-circle')
        .attr("stroke", @options.circleColor || 'orange')
        .attr("fill", 'white')
        .attr("stroke-width", '1')

d3.selection.prototype.tooltip = (f) ->
  selection = @
  options = {}
  selection.each (d,i) ->
    options = f.apply(@, arguments)
    new Tactile.Tooltip(@, options)

