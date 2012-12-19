# 
# Copied from https://github.com/zmaril/d3-bootstrap-plugins
#
annotate = (options,create)->
    el = d3.select(this)
    chartContainer = el.node().nearestViewportElement
    
    if options.tooltipCircleNode
      tooltipCircleNode = options.tooltipCircleNode
    else 
      tooltipCircleNode = el.node().parentNode
    
    move_tip = (selection) ->
      center = [0,0]
      if options.placement is "mouse"
        center = d3.mouse(d3.select('body').node())
      else
        offsets =  @ownerSVGElement.getBoundingClientRect()
        center[0] = offsets.left
        center[1] = offsets.top
        
        center[0] += options.position[0]
        center[1] += options.position[1]

        center[0]+= window.scrollX
        center[1]+= window.scrollY

      center[0] += options.displacement[0]
      center[1] += options.displacement[1]

      selection
        .style("left","#{center[0]}px")
        .style("top","#{center[1]}px")
        .style("display","block")

    el.on("mouseover", () ->
      tip = create()
      hoveredNode = el.node().getBBox()
      
      d3.select(tooltipCircleNode)
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

      tip.style("display","").call(move_tip.bind(this))
    )

    if options.mousemove
      el.on("mousemove", () ->
        d3.select(".annotation").call(move_tip.bind(this))
      )

    el.on("mouseout", () ->
      d3.select(tooltipCircleNode).selectAll("circle.tooltip-circle").remove()
        
      tip = d3.selectAll(".annotation").classed('in', false)
      remover = ()-> tip.remove()
      setTimeout(remover,150)
    )

d3.selection.prototype.tooltip = (f)->
  body = d3.select('body')

  this.each (d,i)->

    options = f.apply(this,arguments)

    create_tooltip = ()->
      tip = body.append("div")
        .classed("tooltip", true)

      tip.append("div")
        .html(options.text)
        .attr("class","tooltip-inner")

      return tip

    annotate.call(this,options,create_tooltip)