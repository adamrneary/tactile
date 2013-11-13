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

  it 'Chart: constructor', ->
    # _chart = new window.Tactile.Chart()
    _chart = new window.Tactile.Chart(unstack: false)
      .data(data)
      .width(680)
      .height(400)
      .axes(x:{dimension: "time", frame: frameVal})
      # .width(680).height(400).data(data)
      # .element($("#example_view")[0]).width(680).height(400).data(data)

    assert _chart

  it 'Chart: addSeries', ->
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
    enemies = _chart.series[_chart.series.array.length-2]
    friends = _chart.series[_chart.series.array.length-1]
    assert enemies.name is 'enemies'
    assert friends.name is 'friends'
    assert enemies.renderer is 'area'
    assert friends.renderer is 'area'
    assert enemies.color is '#c05020'
    assert friends.color is '#6060c0'
    assert typeof enemies.dataTransform is 'function'
    assert typeof friends.dataTransform is 'function'
    assert typeof enemies.afterDrag is 'function'
    assert typeof friends.afterDrag is 'function'
    assert enemies.draggable is true
    assert friends.draggable is true
    # assert _chart.addSeries

  it "Chart: check overwriting series", ->
    series =
      name: "reach actual"
      renderer: "column"

    _chart = new window.Tactile.Chart(unstack: false)
      .data(data)
      .width(680)
      .height(400)

    _chart.addSeries([series, series])
    _chart.addSeries _.extend(series, {renderer: 'column', name: 'new series'}), overwrite: true
    assert _chart.series.array.length is 1
    assert _chart.renderers.length is 1
    assert _chart.renderers[0].name is 'column'

  it 'Chart: initSeriesStackData', ->
    _chart = new window.Tactile.Chart()
      .data(data)
      .width(680)
      .height(400)
      .axes (x:{dimension: "time", frame: frameVal})
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

  it 'Chart: render', ->
    _chart = new window.Tactile.Chart()
      .data(data)
      .width(680)
      .height(400)
      .axes (x:{dimension: "time", frame: frameVal})
    assert typeof _chart.render is 'function'
    assert typeof _chart.render()

  it 'Chart: update', ->
    _chart = new window.Tactile.Chart()
      .data(data)
      .width(680)
      .height(400)
      .axes (x:{dimension: "time", frame: frameVal})
    assert typeof _chart.update is 'function'
    assert typeof _chart.update()

  it 'Chart: discoverRange', ->
    _chart = new window.Tactile.Chart()
      .data(data)
      .width(680)
      .height(400)
      .axes (x:{dimension: "time", frame: frameVal})
    assert typeof _chart.discoverRange is 'function'
    # assert typeof _chart.discoverRange('line')

  it 'Chart: findAxis', ->
    _chart = new window.Tactile.Chart()
      .data(data)
      .width(680)
      .height(400)
      .axes (x:{dimension: "time", frame: frameVal})
    assert typeof _chart.initAxis is 'function'
    # assert typeof _chart.findAxis()

  it 'Chart: dataDomain', ->
    _chart = new window.Tactile.Chart()
      .data(data)
      .width(680)
      .height(400)
      .axes (x:{dimension: "time", frame: frameVal})
    assert typeof _chart.dataDomain is 'function'
    # assert typeof _chart.dataDomain()

  it 'Chart: stackData', ->
    _chart = new window.Tactile.Chart()
      .data(data)
      .width(680)
      .height(400)
      .axes (x:{dimension: "time", frame: frameVal})
    assert typeof _chart.stackData is 'function'
    # assert typeof _chart.stackData()

  it 'Chart: setSize function', ->
    _chart = new window.Tactile.Chart()
    _chart.setSize
      width: 700
      height: 450
    _chart.update()
    widthPadding = _chart.padding.left + _chart.padding.right
    heightPadding = _chart.padding.top + _chart.padding.bottom
    width =  widthPadding
    height = heightPadding
    assert _chart.width() is 700 - width
    assert _chart.height() is 450 - height

  it 'Chart: onUpdate', ->
    _chart = new window.Tactile.Chart()
      .data(data)
      .width(680)
      .height(400)
      .axes (x:{dimension: "time", frame: frameVal})
    assert typeof _chart.onUpdate is 'function'
    # assert typeof _chart.onUpdate()

  it 'Chart: initRenderers', ->
    _chart = new window.Tactile.Chart()
      .data(data)
      .width(680)
      .height(400)
      .axes (x:{dimension: "time", frame: frameVal})
    assert typeof _chart.initRenderers is 'function'
    # assert typeof _chart.initRenderers()

  it 'Chart: renderersByType', ->
    _chart = new window.Tactile.Chart()
      .data(data)
      .width(680)
      .height(400)
      .axes (x:{dimension: "time", frame: frameVal})
    assert typeof _chart.renderersByType is 'function'
    # assert typeof _chart.renderersByType()

  it 'Chart: stackTransition', ->
    _chart = new window.Tactile.Chart()
      .data(data)
      .width(680)
      .height(400)
      .axes (x:{dimension: "time", frame: frameVal})
    assert typeof _chart.stackTransition is 'function'
    # assert typeof _chart.stackTransition()

  it 'Chart: unstackTransition', ->
    _chart = new window.Tactile.Chart()
      .data(data)
      .width(680)
      .height(400)
      .axes (x:{dimension: "time", frame: frameVal})
    assert typeof _chart.unstackTransition is 'function'
    # assert typeof _chart.unstackTransition()

  it 'Chart: element', ->
    _chart = new window.Tactile.Chart()
    # _chart.element($("#example_view")[0])
    # assert _chart._element is $("#example_view")[0]
    assert typeof _chart.element is 'function'

  it 'Chart: height function', ->
    _chart = new window.Tactile.Chart()
    _chart = _chart.height(400)
    _chart.update()
    heightPadding = _chart.padding.top + _chart.padding.bottom
    height = heightPadding
    assert _chart.height() is 400 - height

  it 'Chart: width function', ->
    _chart = new window.Tactile.Chart()
    _chart = _chart.width(680)
    _chart.update()
    widthPadding = _chart.padding.left + _chart.padding.right
    width = 680 - widthPadding
    assert _chart.width() is width

  it 'Chart: data function', ->
    _chart = new window.Tactile.Chart()
    _chart.data(data)
    assert _chart._data is data

  it 'Chart: linear axis function', ->
    frameVal = [0, 4]
    _chart = new window.Tactile.Chart()
    tickFormat = (d) -> d + "%"
    _chart.axes(x:
      dimension: "linear"
      frame: frameVal
      tickFormat: tickFormat
    )
#    axesList fills at render
#    assert _chart.axesList.hasOwnProperty('x') is true
#    assert _chart.axesList.hasOwnProperty('y') is false
#
#    axis = _chart.axesList.x
#    assert axis.horizontal is true
#    assert axis.tickFormat is tickFormat
#    assert axis.frame is frameVal
#    assert axis.__proto__.constructor.name is "AxisLinear"


  it 'Chart: mixed axis function', ->
    _chart = new window.Tactile.Chart()
    _chart.axes
      x:
        dimension: "time"
      y:
        dimension: 'linear'

#    axesList fills at render
#    assert _chart.axesList.hasOwnProperty('x') is true
#    assert _chart.axesList.hasOwnProperty('y') is true
#    assert _chart.axesList.x.__proto__.constructor.name is "AxisTime"
#    assert _chart.axesList.y.__proto__.constructor.name is "AxisLinear"


  it "Chart: for all series don't disabled", ->
    _chart = new window.Tactile.Chart()
    res = _chart._allSeriesDisabled()
    assert res

  it 'Tactile.Chart().element is function', ->
    Chart = new window.Tactile.Chart()
    assert typeof Chart.element is 'function'

  it 'Chart: for disable all series', ->
    _chart = new window.Tactile.Chart()
    _chart.series.disableAll()
    res = _chart._allSeriesDisabled()
    assert res is true
