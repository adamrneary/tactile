describe 'Area series', ->
    it 'example', (done) ->
      done()

    # Chart = new Tactile.Chart()

    # it "Chart: check data function", ->
    #     data = [
    #       x: 0
    #       y: 10
    #       z: 0
    #     ,
    #       x: 1
    #       y: 170
    #       z: 200
    #     ,
    #       x: 2
    #       y: 280
    #       z: 120
    #     ,
    #       x: 3
    #       y: 205
    #       z: 240
    #     ,
    #       x: 4
    #       y: 280
    #       z: 120
    #     ,
    #       x: 5
    #       y: 205
    #       z: 240
    #     ,
    #       x: 6
    #       y: 280
    #       z: 120
    #     ,
    #       x: 7
    #       y: 205
    #       z: 240
    #     ,
    #       x: 8
    #       y: 120
    #       z: 490
    #     ]
    #     Chart.data(data)
    #     assert Chart._data is data


    # it "Chart: check axes function", ->
    #     frameVal = [0, 4]
    #     Chart.axes(x:
    #       dimension: "time"
    #       frame: frameVal
    #     )
    #     assert Chart._axes.x.frame is frameVal


    # it "Chart: check element function", ->
    #     Chart.element($("#example_view")[0])
    #     assert Chart._element is $("#example_view")[0]


    # it 'addSeries', ->
    #     Chart.addSeries [
    #         name: "enemies"
    #         renderer: "area"
    #         sigfigs: 0
    #         draggable: true
    #         afterDrag: (d, y, i, draggedSeries, graph) ->
    #           graph.data()[i].y = y

    #         color: "#c05020"
    #         dataTransform: (d) ->
    #             x: d.x
    #             y: d.y
    #     ,
    #         name: "friends"
    #         renderer: "area"
    #         sigfigs: 1
    #         color: "#6060c0"
    #         draggable: true
    #         afterDrag: (d, y, i, draggedSeries, graph) ->
    #             graph.data()[i].z = y

    #         dataTransform: (d) ->
    #             x: d.x
    #             y: d.z
    #     ]
    #     assert Chart.series[Chart.series.length-2].name is 'enemies'
    #     assert Chart.series[Chart.series.length-1].name is 'friends'
    #     assert Chart.series[Chart.series.length-2].renderer is 'area'
    #     assert Chart.series[Chart.series.length-1].renderer is 'area'
    #     assert Chart.series[Chart.series.length-2].color is '#c05020'
    #     assert Chart.series[Chart.series.length-1].color is '#6060c0'
    #     assert typeof Chart.series[Chart.series.length-2].dataTransform is 'function'
    #     assert typeof Chart.series[Chart.series.length-1].dataTransform is 'function'
    #     assert typeof Chart.series[Chart.series.length-2].afterDrag is 'function'
    #     assert typeof Chart.series[Chart.series.length-1].afterDrag is 'function'
    #     assert Chart.series[Chart.series.length-2].draggable is true
    #     assert Chart.series[Chart.series.length-1].draggable is true

    # it 'slider', ->
    #     frameVal = [0, 4]
    #     data = [
    #       x: 0
    #       y: 10
    #       z: 0
    #     ,
    #       x: 1
    #       y: 170
    #       z: 200
    #     ,
    #       x: 2
    #       y: 280
    #       z: 120
    #     ,
    #       x: 3
    #       y: 205
    #       z: 240
    #     ,
    #       x: 4
    #       y: 280
    #       z: 120
    #     ,
    #       x: 5
    #       y: 205
    #       z: 240
    #     ,
    #       x: 6
    #       y: 280
    #       z: 120
    #     ,
    #       x: 7
    #       y: 205
    #       z: 240
    #     ,
    #       x: 8
    #       y: 120
    #       z: 490
    #     ]

    #     #sl = $("<div>").attr("id", "slider")
    #     #$("#example_view").append sl
    #     #sl.slider
    #         #min: 0
    #         #max: 8
    #         #values: frameVal
    #         #range: true
    #         #slide: (event, ui) ->
    #             #Chart.axes().x.frame = ui.values
    #     #console.log data
    #     #Chart.dataDomain
    #     #Chart.stackData
    #     #console.log data
    #     #assert 0).toBe 0


    # it "Chart: check for all series don't disabled", ->
    #     res = Chart._allSeriesDisabled()
    #     assert res is false


    # it "Chart: check for disable all series", ->
    #     _.each Chart.series, (s) ->
    #         s.disable()
    #     res = Chart._allSeriesDisabled()
    #     assert res is true



    # it "Chart: check setSize function", ->
    #     Chart.setSize
    #         width: 700
    #         height: 450
    #     Chart.update()
    #     assert Chart.width() is 700 - Chart.margin.left - Chart.margin.right - Chart.padding.left - Chart.padding.right
    #     assert Chart.height() is 450 - Chart.margin.top - Chart.margin.bottom - Chart.padding.top - Chart.padding.bottom

    # it "Chart: check height function", ->
    #     Chart = Chart.height(400)
    #     Chart.update()
    #     assert Chart.height() is 400 - Chart.margin.top - Chart.margin.bottom - Chart.padding.top - Chart.padding.bottom


    # it "Chart: check width function", ->
    #     Chart = Chart.width(680)
    #     Chart.update()
    #     assert Chart.width() is 680 - Chart.margin.left - Chart.margin.right - Chart.padding.left - Chart.padding.right


    # it 'Tactile.Chart().render is function', ->
    #     assert typeof Chart.render is 'function'


    # it 'Tactile.Chart().initSeriesStackData is function', ->
    #     assert typeof Chart.initSeriesStackData is 'function'


    # it 'Tactile.Chart().element is function', ->
    #     assert typeof Chart.element is 'function'


