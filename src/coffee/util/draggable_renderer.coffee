Tactile.DraggableRenderer = class DraggableRenderer extends RendererBase
  initialize: ->
    @active = null

    # Remove active class if click anywhere
    window.addEventListener("click", (()=> # use native js, because method 'on' replace existing handler
      @active = null
      @render()
    ), true)

    @utils = new Tactile.Utils()

  setActive: (d, i)=>
    return unless @utils.ourFunctor(@series.isEditable, d, i)
    @active = d
    @render()

