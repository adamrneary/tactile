# 
# Copied from https://github.com/zmaril/d3-bootstrap-plugins
#

annotate = (options,create) ->
    el = d3.select(@)
    chartContainer = el.node().nearestViewportElement
    
    # tooltipCircleContainer is an element to which the circle will be appended
    # sets the parent node by default
    if options.tooltipCircleContainer
      tooltipCircleContainer = options.tooltipCircleContainer
    else if options.circleOnHover
      tooltipCircleContainer = el.node().parentNode
    
    move_tip = (selection) ->
      center = [0,0]
      if options.placement is "mouse"
        center = d3.mouse(options.graph.element)
      else
        offsets = @ownerSVGElement.getBoundingClientRect()
        
        if options.position
          center[0] = options.position[0]
          center[1] = options.position[1]
        else
          hoveredNode = el.node().getBBox()
          center[0] = hoveredNode.x + hoveredNode.width / 2
          center[1] = hoveredNode.y

        center[0] += options.graph.margin.left
        center[0] += options.graph.padding.left

        center[1] += options.graph.margin.top
        center[1] += options.graph.padding.top
        
      if options.displacement  
        center[0] += options.displacement[0]
        center[1] += options.displacement[1]

      selection
        .style("left","#{center[0]}px")
        .style("top","#{center[1]}px")
        .style("display","block")

    el.on("mouseover", () ->
      tip = create()
      hoveredNode = el.node().getBBox()
      
      # puts small circle on the hovered node
      if options.circleOnHover
        d3.select(tooltipCircleContainer)
          .append("svg:circle")
          .attr("cx", hoveredNode.x + hoveredNode.width / 2)
          .attr("cy", hoveredNode.y)
          .attr("r", 3)
          .attr('class', 'tooltip-circle')
          .attr("stroke", 'orange')
          .attr("fill", 'white')
          .attr("stroke-width", '1')
        
      tip.classed("annotation", true)
        .classed(options.gravity, true)
        .style("display","none")

      tip.classed('fade', true) if options.fade

      tip.append("div").attr("class","arrow")

      inner = () -> tip.classed('in', true)

      setTimeout(inner,10)

      tip.style("display","").call(move_tip.bind(@))
    )

    if options.mousemove
      el.on("mousemove", () ->
        d3.select(".annotation").call(move_tip.bind(@))
      )

    el.on("mouseout", () ->
      d3.select(tooltipCircleContainer).selectAll("circle.tooltip-circle").remove()
        
      tip = d3.selectAll(".annotation").classed('in', false)
      remover = () -> tip.remove()
      setTimeout(remover, 150)
    )

d3.selection.prototype.tooltip = (f) ->
  selection = @
  selection.each (d,i) ->
    options = f.apply(@, arguments)
    
    create_tooltip = () ->
      chartContainer = d3.select(options.graph.element)
      tip = chartContainer.append('div')
        .classed("tooltip", true)
      
      tip.append('div')
        .html(options.text)
        .classed("tooltip-inner", true)

      return tip

    annotate.call(@, options, create_tooltip)