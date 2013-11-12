describe 'Sliding timeframe series', ->
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
      z: 300
    ,
      x: 4
      y: 332
      z: 400
    ,
      x: 5
      y: 327
      z: 450
    ,
      x: 6
      y: 332
      z: 600
    ,
      x: 7
      y: 232
      z: 601
    ,
      x: 8
      y: 402
      z: 700
    ,
      x: 9
      y: 100
      z: 430
    ,
      x: 10
      y: 134
      z: 490
    ,
      x: 11
      y: 356
      z: 450
    ,
      x: 12
      y: 339
      z: 720
    ,
      x: 13
      y: 539
      z: 650
    ,
      x: 14
      y: 650
      z: 300
    ,
      x: 15
      y: 700
      z: 100
    ]
    Chart.data(data)
    assert Chart._data is (data)


  it "Chart: check axes function"#, ->
    # frameVal = [2, 10]
    # Chart.axes(x:
    #   dimension: "time"
    #   frame: frameVal
    # )
    # assert Chart._axes.x.frame is (frameVal)


  it "Chart: check element function", ->
    Chart.element($("#example_view")[0])
    assert Chart._element is ($("#example_view")[0])




  it 'addSeries'#, ->
    # Chart.addSeries [
    #   name: "xy"
    #   renderer: "line"
    #   color: "#c05020"
    #   dataTransform: (d) ->
    #     x: d.x
    #     y: d.y
    # ,
    #   name: "xz"
    #   renderer: "line"
    #   color: "#6060c0"
    #   dataTransform: (d) ->
    #     x: d.x
    #     y: d.z
    # ]
    # xy = Chart.series[Chart.series.length-2]
    # xz = Chart.series[Chart.series.length-1]
    # assert xy.name is 'xy'
    # assert xz.name is 'xz'
    # assert xy.renderer is 'line'
    # assert xz.renderer is 'line'
    # assert xy.color is '#c05020'
    # assert xz.color is '#6060c0'
    # assert typeof xy.dataTransform is 'function'
    # assert typeof xz.dataTransform is 'function'


  it "Chart: check for all series don't disabled"#, ->
    # res = Chart._allSeriesDisabled()
    # assert res is false


  it "Chart: check for disable all series"#, ->
    # _.each Chart.series, (s) ->
    #   s.disable()
    # res = Chart._allSeriesDisabled()
    # assert res is true


  it "Chart: check height function"#, ->
    # Chart = Chart.height(450)
    # Chart.update()
    # heightMargin = Chart.margin.top + Chart.margin.bottom
    # heightMargin = Chart.padding.top + Chart.padding.bottom
    # height = heightMargin + heightPadding
    # assert Chart.height() is 450 - height


  it "Chart: check setSize function"#, ->
    # Chart.setSize
    #   width: 680
    #   height: 400
    # Chart.update()
    # widthMargin = Chart.margin.left + Chart.margin.right
    # widthPadding = Chart.padding.left + Chart.padding.right
    # heightMargin = Chart.margin.top + Chart.margin.bottom
    # heightMargin = Chart.padding.top + Chart.padding.bottom
    # width =  widthMargin + widthPadding
    # height = heightMargin + heightPadding
    # assert Chart.width() is 680 - width
    # assert Chart.height() is 400 - height


  it "Chart: check width function", ->
    Chart = Chart.width(680)
    Chart.update()
    widthPadding = Chart.padding.left + Chart.padding.right
    width = widthPadding
    assert Chart.width() is 680 - width



  it 'Tactile.Chart().render is function', ->
    assert typeof Chart.render is 'function'


  it 'Tactile.Chart().initSeriesStackData is function', ->
    assert typeof Chart.initSeriesStackData is 'function'


  it 'Tactile.Chart().element is function', ->
    assert typeof Chart.element is 'function'


