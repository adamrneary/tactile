describe 'Area renderer', ->
  before (done)->
    glob.zombie.visit glob.url, (e, _browser) ->
      browser = _browser
      window = browser.window
      $ = window.$
      _ = window._

      global.browser = browser
      global.window = window
      global.d3 = browser.window.d3
      global._ = window._
      done()

  it 'Area renderer: initialize', (done) ->
    frameVal = [0, 4]
    data = [
      x: 0
      y: 10
      z: 0
    ,
      x: 1
      y: 170
      z: 200
    ,
      x: 2
      y: 280
      z: 120
    ,
      x: 3
      y: 205
      z: 240
    ,
      x: 4
      y: 280
      z: 120
    ,
      x: 5
      y: 205
      z: 240
    ,
      x: 6
      y: 280
      z: 120
    ,
      x: 7
      y: 205
      z: 240
    ,
      x: 8
      y: 120
      z: 490
    ]
    chart = new window.Tactile.Chart(unstack: false)
      .element(window.$("#example_view")[0])
    chart.data(data).width(680).height(400).axes x:
      dimension: "time"
      frame: frameVal

    chart.addSeries [
      name: "enemies"
      renderer: "area"
      sigfigs: 0
      draggable: true
      afterDrag: (d, y, i, draggedSeries, graph) ->
        graph.data()[i].y = y

      color: "#c05020"
      dataTransform: (d) ->
        x: d.x
        y: d.y
    ,
      name: "friends"
      renderer: "area"
      sigfigs: 1
      color: "#6060c0"
      draggable: true
      afterDrag: (d, y, i, draggedSeries, graph) ->
        graph.data()[i].z = y

      dataTransform: (d) ->
        x: d.x
        y: d.z
    ]
    chart.render()
    sl = window.$("<div>").attr("id", "slider")
    window.$("#example_view").append sl
    sl.slider
      min: 0
      max: 8
      values: frameVal
      range: true
      slide: (event, ui) ->
        chart.axes().x.frame = ui.values
        chart.render()

    _areaRenderer = new window.Tactile.AreaRenderer extends window.Tactile.RendererBase
    _areaRenderer['AreaRenderer'] = {
      graph:{}
    }
    #console.log _areaRenderer.__super__.domain()
    #console.log _areaRenderer.initialize()
    #assert _areaRenderer
    #assert _areaRenderer.initialize()
    done()

  it 'Area renderer: seriesPathFactory', (done) ->
    # _areaRenderer = new window.Tactile.AreaRenderer
    # assert _areaRenderer.seriesPathFactory()
    done()

  it 'Area renderer: seriesStrokeFactory', (done) ->
    # _areaRenderer = new window.Tactile.AreaRenderer()
    # assert _areaRenderer.seriesStrokeFactory()
    done()

  it 'Area renderer: render', (done) ->
    # _areaRenderer = new window.Tactile.AreaRenderer()
    # assert _areaRenderer.render()
    done()
