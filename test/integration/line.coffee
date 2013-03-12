describe 'Line series', ->
  Chart = new Tactile.Chart()

  it "Chart: check data function", ->
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
      z: 100
    ,
      x: 3
      y: 205
      z: 240
    ,
      x: 4
      y: 280
      z: 100
    ,
      x: 5
      y: 205
      z: 240
    ,
      x: 6
      y: 280
      z: 100
    ,
      x: 7
      y: 205
      z: 240
    ,
      x: 8
      y: 332
      z: 490
    ]
    Chart.data(data)
    assert Chart._data is (data)


  it "Chart: check axes function", ->
    frameVal = [0, 8]
    Chart.axes(x:
      dimension: "time"
      frame: frameVal
    )
    assert Chart._axes.x.frame is (frameVal)


  it "Chart: check element function", ->
    Chart.element($("#example_view")[0])
    assert Chart._element is ($("#example_view")[0])


  it 'addSeries', ->
    Chart.addSeries
      name: "enemies"
      renderer: "line"
      color: "#c05020"
      sigfigs: 1
      draggable: true
      afterDrag: (d, y, i, draggedSeries, graph) ->
        graph.data()[i].z = y
      tooltip: (d) ->
        d.y + " enemies"
      dataTransform: (d) ->
        x: d.x
        y: d.y

    line = Chart.series[Chart.series.length-1]
    assert line.name is 'enemies'
    assert line.renderer is 'line'
    assert line.color is '#c05020'
    assert typeof line.tooltip is 'function'
    assert typeof line.dataTransform is 'function'
    assert typeof line.afterDrag is 'function'
    assert line.sigfigs is 1
    assert line.draggable is true


  it "Chart: check for all series don't disabled", ->
    res = Chart._allSeriesDisabled()
    assert res is false


  it "Chart: check for disable all series", ->
    _.each Chart.series, (s) ->
      s.disable()
    res = Chart._allSeriesDisabled()
    assert res is true


  it "Chart: check setSize function", ->
    Chart.setSize
      width: 720
      height: 420
    Chart.update()
    widthMargin = Chart.margin.left + Chart.margin.right
    widthPadding = Chart.padding.left + Chart.padding.right
    heightMargin = Chart.margin.top + Chart.margin.bottom
    heightPadding = Chart.padding.top + Chart.padding.bottom
    width =  widthMargin + widthPadding
    height = heightMargin + heightPadding
    assert Chart.width() is 720 - width
    assert Chart.height() is 420 - height


  it "Chart: check height function", ->
    Chart = Chart.height(450)
    Chart.update()
    heightMargin = Chart.margin.top + Chart.margin.bottom
    heightPadding = Chart.padding.top + Chart.padding.bottom
    height = heightMargin + heightPadding
    assert Chart.height() is 450 - height


  it "Chart: check width function", ->
    Chart = Chart.width(700)
    Chart.update()
    widthMargin = Chart.margin.left + Chart.margin.right
    widthPadding = Chart.padding.left + Chart.padding.right
    width =  widthMargin + widthPadding
    assert Chart.width() is 700 - width


  it 'Tactile.Chart().render is function', ->
    assert typeof Chart.render is 'function'


  it 'Tactile.Chart().initSeriesStackData is function', ->
    assert typeof Chart.initSeriesStackData is 'function'


  it 'Tactile.Chart().element is function', ->
    assert typeof Chart.element is 'function'

