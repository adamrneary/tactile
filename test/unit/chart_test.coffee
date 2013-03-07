describe 'Chart', ->
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

  it 'Chart: constructor', (done) ->
    # _chart = new window.Tactile.Chart()
    _chart = new window.Tactile.Chart(unstack: false)
      .data(data).width(680).height(400).axes x:
        dimension: "time"
        frame: frameVal
      # .width(680).height(400).data(data)
      # .element($("#example_view")[0]).width(680).height(400).data(data)

    assert _chart
    done()

  it 'Chart: addSeries', (done) ->
    _chart = new window.Tactile.Chart()
    _chart.addSeries [
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
    assert _chart.series[_chart.series.length-2].name is 'enemies'
    assert _chart.series[_chart.series.length-1].name is 'friends'
    assert _chart.series[_chart.series.length-2].renderer is 'area'
    assert _chart.series[_chart.series.length-1].renderer is 'area'
    assert _chart.series[_chart.series.length-2].color is '#c05020'
    assert _chart.series[_chart.series.length-1].color is '#6060c0'
    assert typeof _chart.series[_chart.series.length-2].dataTransform is 'function'
    assert typeof _chart.series[_chart.series.length-1].dataTransform is 'function'
    assert typeof _chart.series[_chart.series.length-2].afterDrag is 'function'
    assert typeof _chart.series[_chart.series.length-1].afterDrag is 'function'
    assert _chart.series[_chart.series.length-2].draggable is true
    assert _chart.series[_chart.series.length-1].draggable is true
    # assert _chart.addSeries
    done()

  it 'Chart: initSeriesStackData', (done) ->
    _chart = new window.Tactile.Chart()
      .data(data).width(680).height(400).axes x:
        dimension: "time"
        frame: frameVal
    _chart.addSeries [
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
    assert typeof _chart.initSeriesStackData is 'function'
    assert typeof _chart.initSeriesStackData()
    assert typeof _chart.initSeriesStackData(overwrite: true)
    done()

  it 'Chart: render', (done) ->
    _chart = new window.Tactile.Chart()
      .data(data).width(680).height(400).axes x:
        dimension: "time"
        frame: frameVal
    assert typeof _chart.render is 'function'
    assert typeof _chart.render()
    done()

  it 'Chart: update', (done) ->
    _chart = new window.Tactile.Chart()
      .data(data).width(680).height(400).axes x:
        dimension: "time"
        frame: frameVal
    assert typeof _chart.update is 'function'
    assert typeof _chart.update()
    done()

  it 'Chart: discoverRange', (done) ->
    _chart = new window.Tactile.Chart()
      .data(data).width(680).height(400).axes x:
        dimension: "time"
        frame: frameVal
    assert typeof _chart.discoverRange is 'function'
    # assert typeof _chart.discoverRange('line')
    done()

  it 'Chart: findAxis', (done) ->
    _chart = new window.Tactile.Chart()
      .data(data).width(680).height(400).axes x:
        dimension: "time"
        frame: frameVal
    assert typeof _chart.findAxis is 'function'
    # assert typeof _chart.findAxis()
    done()

  it 'Chart: dataDomain', (done) ->
    _chart = new window.Tactile.Chart()
      .data(data).width(680).height(400).axes x:
        dimension: "time"
        frame: frameVal
    assert typeof _chart.dataDomain is 'function'
    # assert typeof _chart.dataDomain()
    done()

  it 'Chart: stackData', (done) ->
    _chart = new window.Tactile.Chart()
      .data(data).width(680).height(400).axes x:
        dimension: "time"
        frame: frameVal
    assert typeof _chart.stackData is 'function'
    # assert typeof _chart.stackData()
    done()

  it 'Chart: setSize function', (done) ->
    _chart = new window.Tactile.Chart()
    _chart.setSize
        width: 700
        height: 450
    _chart.update()
    assert _chart.width() is 700 - _chart.margin.left - _chart.margin.right - _chart.padding.left - _chart.padding.right
    assert _chart.height() is 450 - _chart.margin.top - _chart.margin.bottom - _chart.padding.top - _chart.padding.bottom
    done()

  it 'Chart: onUpdate', (done) ->
    _chart = new window.Tactile.Chart()
      .data(data).width(680).height(400).axes x:
        dimension: "time"
        frame: frameVal
    assert typeof _chart.onUpdate is 'function'
    # assert typeof _chart.onUpdate()
    done()

  it 'Chart: initRenderers', (done) ->
    _chart = new window.Tactile.Chart()
      .data(data).width(680).height(400).axes x:
        dimension: "time"
        frame: frameVal
    assert typeof _chart.initRenderers is 'function'
    # assert typeof _chart.initRenderers()
    done()

  it 'Chart: renderersByType', (done) ->
    _chart = new window.Tactile.Chart()
      .data(data).width(680).height(400).axes x:
        dimension: "time"
        frame: frameVal
    assert typeof _chart.renderersByType is 'function'
    # assert typeof _chart.renderersByType()
    done()

  it 'Chart: stackTransition', (done) ->
    _chart = new window.Tactile.Chart()
      .data(data).width(680).height(400).axes x:
        dimension: "time"
        frame: frameVal
    assert typeof _chart.stackTransition is 'function'
    # assert typeof _chart.stackTransition()
    done()

  it 'Chart: unstackTransition', (done) ->
    _chart = new window.Tactile.Chart()
      .data(data).width(680).height(400).axes x:
        dimension: "time"
        frame: frameVal
    assert typeof _chart.unstackTransition is 'function'
    # assert typeof _chart.unstackTransition()
    done()

  it 'Chart: element', (done) ->
    _chart = new window.Tactile.Chart()
    # _chart.element($("#example_view")[0])
    # assert _chart._element is $("#example_view")[0]
    assert typeof _chart.element is 'function'
    done()

  it 'Chart: height function', (done) ->
    _chart = new window.Tactile.Chart()
    _chart = _chart.height(400)
    _chart.update()
    assert _chart.height() is 400 - _chart.margin.top - _chart.margin.bottom - _chart.padding.top - _chart.padding.bottom
    done()

  it 'Chart: width function', (done) ->
    _chart = new window.Tactile.Chart()
    _chart = _chart.width(680)
    _chart.update()
    width = 680 - _chart.margin.left - _chart.margin.right - _chart.padding.left - _chart.padding.right
    assert _chart.width() is width
    done()

  it 'Chart: data function', (done) ->
    _chart = new window.Tactile.Chart()
    _chart.data(data)
    assert _chart._data is data
    done()

  it 'Chart: axes function', (done) ->
    frameVal = [0, 4]
    _chart = new window.Tactile.Chart()
    _chart.axes(x:
      dimension: "time"
      frame: frameVal
    )
    assert _chart._axes.x.frame is frameVal
    done()

  it "Chart: for all series don't disabled", (done) ->
    _chart = new window.Tactile.Chart()
    res = _chart._allSeriesDisabled()
    assert res
    done()

  it 'Chart: for disable all series', (done) ->
    _chart = new window.Tactile.Chart()
    _.each _chart.series, (s) ->
        s.disable()
    res = _chart._allSeriesDisabled()
    assert res is true
    done()