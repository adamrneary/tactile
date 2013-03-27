Tactile.DraggableRenderer = class DraggableRenderer extends RendererBase
  initialize: ->
    @active = null

    # Remove active class if click anywhere
    window.addEventListener("click", (()=> # use native js, because method 'on' replace existing handler
      @active = null
      @render()
    ), true)

    window.addEventListener("keydown", (e)=>
      switch e.keyCode
        when 37 then @selectPerviousEditableValue()
        when 39 then @selectNextEditableValue()
        when 38 then a="up"
        when 40 then a="down"
    )

    @utils = new Tactile.Utils()

  selectNextEditableValue: =>
    return unless @active
    setNext = false
    i = 0
    while i < @series.stack.length
      if @active is @series.stack[i]
        setNext = true if @active is @series.stack[i]
        i++
        continue

      if @utils.ourFunctor(@series.isEditable, @series.stack[i], i) and setNext
        @active = @series.stack[i]
        break
      i++
    @render()

  selectPerviousEditableValue: =>
    return unless @active
    setNext = false
    i = @series.stack.length-1
    while i >= 0
      if @active is @series.stack[i]
        setNext = true if @active is @series.stack[i]
        i--
        continue

      if @utils.ourFunctor(@series.isEditable, @series.stack[i], i) and setNext
        @active = @series.stack[i]
        break
      i--
    @render()


  _click: (d, i)=>
    return unless @utils.ourFunctor(@series.isEditable, d, i)
    @active = d
    @render()

