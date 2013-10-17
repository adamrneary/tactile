class Tactile.DraggableRenderer extends Tactile.RendererBase
  initialize: ->
    @active = null

    # Remove active class if click anywhere

    @graph.onElementChange =>
      @graph.element().addEventListener("click", (() => # use native js, because method 'on' replace existing handler
        @active = null
        @render()
      ), true)

    window.addEventListener("keyup", (e) =>
      clearInterval(@id) if @id
      @id = null
    )

    window.addEventListener("keydown", (e) =>
      switch e.keyCode
        when 37 then @selectPerviousEditableValue()
        when 39 then @selectNextEditableValue()
        when 38
          increase = () =>
            @increaseEditableValue()
          unless @id
            @increaseEditableValue()
            @id = setInterval(increase, 200) unless @id
          e.preventDefault()
        when 40
          decrease = () =>
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
    while i < @aggdata.length
      if @active is @aggdata[i]
        setNext = true if @active is @aggdata[i]
        i++
        continue

      if @utils.ourFunctor(@series.isEditable, @aggdata[i], i) and setNext
        @active = @aggdata[i]
        break
      i++
    @hideCircles?()
    @render()

  selectPerviousEditableValue: =>
    return unless @active
    setNext = false
    i = @aggdata.length-1
    while i >= 0
      if @active is @aggdata[i]
        setNext = true if @active is @aggdata[i]
        i--
        continue

      if @utils.ourFunctor(@series.isEditable, @aggdata[i], i) and setNext
        @active = @aggdata[i]
        break
      i--
    @hideCircles?()
    @render()


  setActive: (d, i)=>
    return unless @utils.ourFunctor(@series.isEditable, d, i)
    @active = d
    @render()

  increaseEditableValue: ()=>
    return unless @active
    @active.y++
    @render()


  decreaseEditableValue: ()=>
    return unless @active
    @active.y--
    @render()

