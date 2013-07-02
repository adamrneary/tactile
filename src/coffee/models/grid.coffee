class Tactile.Grid
  defaultOptions:
      lineWidth: 0.5
      color: "#000000"

  constructor: (@options) ->
    @utils = new Tactile.Utils()
    @graph = options.graph
    @lineWidth = options.lineWidth or @defaultOptions.lineWidth
    @color = options.color or @defaultOptions.color
    @data = options.data or []
    @horizontal = options.grid == 'x'
    console.log options

  render: (transition) ->
    className = "#{@options.grid}-grid"
    @g = @graph.vis.selectAll('.' + className).data([0])
    @g.enter().append("g").attr("class", className)

    line = @g.selectAll("line").data(@data)
    line.enter()
      .append("svg:line")

    line.exit().remove()

    transition.select('.' + className).selectAll("line")
      .attr("x1", (d) => if @horizontal then 0 else @graph[@options.grid](d))
      .attr("x2", (d) => if @horizontal then @graph.width() else @graph[@options.grid](d))
      .attr("y1", (d) => if @horizontal then @graph[@options.grid](d) else 0)
      .attr("y2", (d) => if @horizontal then @graph[@options.grid](d) else @graph.height())
      .attr("stroke", @color)
      .attr("stroke-width", @lineWidth)
