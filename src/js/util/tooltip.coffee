# 
# Copied from https://github.com/zmaril/d3-bootstrap-plugins
#

# TODO: Copy color from the @series.color
Tactile.Tooltip = class Tooltip
  @_spotlightMode: false

  @turnOffspotlight: () ->
    Tooltip._spotlightMode = false
    
  @spotlightOn: (d) ->
    Tooltip._spotlightMode = true
    
  constructor: (@el, @options) ->
    @el = d3.select(@el)
    @annotate()

  # TODO: Done in a hurry. Dry this out.
  appendTooltip: ->
    chartContainer = d3.select(@options.graph.element)
    if Tooltip._spotlightMode && @el.node().classList.contains("selected")
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
      tooltipCircleContainer = @options.tooltipCircleContainer
    else if @options.circleOnHover
      tooltipCircleContainer = @el.node().parentNode

    moveTip = (tip) =>
      center = [0,0]
      if @options.placement is "mouse"
        center = d3.mouse(@options.graph.element)
      else
        if @options.position
          center[0] = @options.position[0]
          center[1] = @options.position[1]
        else
          hoveredNode = @el.node().getBBox()
          center[0] = hoveredNode.x + hoveredNode.width / 2
          center[1] = hoveredNode.y

        center[0] += @options.graph.margin.left
        center[0] += @options.graph.padding.left

        center[1] += @options.graph.margin.top
        center[1] += @options.graph.padding.top

      if @options.displacement  
        center[0] += @options.displacement[0]
        center[1] += @options.displacement[1]

      tip
        .style("left","#{center[0]}px")
        .style("top","#{center[1]}px")
        .style("display","block")

    @el.on("mouseover", () =>
      if Tooltip._spotlightMode
        return unless @el.node().classList.contains("selected")
        
      tip = @appendTooltip()

      # puts small circle on the hovered node
      if @options.circleOnHover
        hoveredNode = @el.node().getBBox()
        d3.select(tooltipCircleContainer)
          .append("svg:circle")
          .attr("cx", hoveredNode.x + hoveredNode.width / 2)
          .attr("cy", hoveredNode.y + 1)
          .attr("r", 3)
          .attr('class', 'tooltip-circle')
          .attr("stroke", 'orange')
          .attr("fill", 'white')
          .attr("stroke-width", '1')

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

    @el.on("mouseout", () ->
      return if Tooltip._spotlightMode # don't hide the tooltip if spotlight 
      d3.select(tooltipCircleContainer).selectAll("circle.tooltip-circle").remove()

      tip = d3.selectAll(".annotation").classed('in', false)
      remover = () -> tip.remove()
      setTimeout(remover, 150)
    )

d3.selection.prototype.tooltip = (f) ->
  selection = @
  options = {}
  selection.each (d,i) ->
    options = f.apply(@, arguments)
    new Tactile.Tooltip(@, options)
    
#  TODO: can't bind this without breaking other mouse events
#  options = f.apply(@el, arguments)  
#  d3.select(options.graph.element).on "mousemove.drag", ->
#    # find the tip (.annotation) here and update it's height according to the mouse y
    
