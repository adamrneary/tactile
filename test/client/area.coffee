describe 'Area series', ->
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
    Chart.data(data)
    assert Chart._data is data


  it "Chart: check axes function"#, ->
    # frameVal = [0, 4]
    # Chart.axes(x:
    #   dimension: "time"
    #   frame: frameVal
    # )
    # assert Chart._axes.x.frame is frameVal

  it "Chart: check element function", ->
    Chart.element($("#example_view")[0])
    assert Chart._element is $("#example_view")[0]


  it 'addSeries'#, ->
    # Chart.addSeries [
    #   name: "enemies"
    #   renderer: "area"
    #   sigfigs: 0
    #   draggable: true
    #   afterDrag: (d, y, i, draggedSeries, graph) ->
    #     graph.data()[i].y = y

    #   color: "#c05020"
    #   dataTransform: (d) ->
    #     x: d.x
    #     y: d.y
    # ,
    #   name: "friends"
    #   renderer: "area"
    #   sigfigs: 1
    #   color: "#6060c0"
    #   draggable: true
    #   afterDrag: (d, y, i, draggedSeries, graph) ->
    #     graph.data()[i].z = y

    #   dataTransform: (d) ->
    #     x: d.x
    #     y: d.z
    # ]
    # enemies = Chart.series[Chart.series.length-2]
    # friends = Chart.series[Chart.series.length-1]
    # assert enemies.name is 'enemies'
    # assert friends.name is 'friends'
    # assert enemies.renderer is 'area'
    # assert friends.renderer is 'area'
    # assert enemies.color is '#c05020'
    # assert friends.color is '#6060c0'
    # assert typeof enemies.dataTransform is 'function'
    # assert typeof friends.dataTransform is 'function'
    # assert typeof enemies.afterDrag is 'function'
    # assert typeof friends.afterDrag is 'function'
    # assert enemies.draggable is true
    # assert friends.draggable is true

  it 'slider', ->
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

    #sl = $("<div>").attr("id", "slider")
    #$("#example_view").append sl
    #sl.slider
        #min: 0
        #max: 8
        #values: frameVal
        #range: true
        #slide: (event, ui) ->
            #Chart.axes().x.frame = ui.values
    #console.log data
    #Chart.dataDomain
    #Chart.stackData
    #console.log data
    #assert 0).toBe 0


  it "Chart: check for all series don't disabled"#, ->
    # res = Chart._allSeriesDisabled()
    # assert res is false


  it "Chart: check for disable all series"#, ->
    # _.each Chart.series, (s) ->
    #   s.disable()
    # res = Chart._allSeriesDisabled()
    # assert res is true


  it "Chart: check setSize function", (done)->
    Chart = new window.Tactile.Chart()
    Chart.setSize
      width: 700
      height: 450
    Chart.update()
    widthPadding = Chart.padding.left + Chart.padding.right
    heightPadding = Chart.padding.top + Chart.padding.bottom
    width =  widthPadding
    height = heightPadding
    assert Chart.width() is (700 - width)
    assert Chart.height() is (450 - height)
    done()

  it "Chart: check height function", (done)->
    Chart = new window.Tactile.Chart()
    Chart = Chart.height(400)
    Chart.update()
    heightPadding = Chart.padding.top + Chart.padding.bottom
    height = heightPadding
    assert Chart.height() is 400 - height
    done()


  it "Chart: check width function", (done)->
    Chart = new window.Tactile.Chart()
    Chart = Chart.width(680)
    Chart.update()
    widthPadding = Chart.padding.left + Chart.padding.right
    width = 680 - widthPadding
    assert Chart.width() is width
    done()


  it 'Tactile.Chart().render is function', ->
    assert typeof Chart.render is 'function'


  it 'Tactile.Chart().initSeriesStackData is function', ->
    assert typeof Chart.initSeriesStackData is 'function'


  it 'Tactile.Chart().element is function', ->
    assert typeof Chart.element is 'function'


