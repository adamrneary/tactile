Tactile.DraggableRenderer = class DraggableRenderer extends RendererBase
  initialize: ->
    @active = null

    # Remove active class if click anywhere
    window.addEventListener("click", (()=> # use native js, because method 'on' replace existing handler
      @active = null
      @render()
    ), true)

    window.addEventListener("keyup", (e)=>
      clearInterval(@id) if @id
      @id = null
    )

    window.addEventListener("keydown", (e)=>
      #console.log("keydown")
      switch e.keyCode
        when 37 then @selectPerviousEditableValue()
        when 39 then @selectNextEditableValue()
        when 38
          increase = ()=>
            @increaseEditableValue()
          unless @id
            @increaseEditableValue()
            @id = setInterval(increase, 200) unless @id
          e.preventDefault()
        when 40
          decrease = ()=>
            @decreaseEditableValue()
          unless @id
            @decreaseEditableValue()
            @id = setInterval(decrease, 200) unless @id
          e.preventDefault()
    )

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


  setActive: (d, i)=>
    return unless @utils.ourFunctor(@series.isEditable, d, i)
    @active = d
    @render()

  increaseEditableValue: ()=>
    console.log("increaseEditableValue")
    return unless @active
    @active.y++
    @render()


  decreaseEditableValue: ()=>
    console.log("decreaseEditableValue")
    return unless @active
    @active.y--
    @render()

