describe 'Legend series', ->
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
        frameVal = [0, 4]
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
            tooltip: (d) ->
                d.y + " enemies"

            dataTransform: (d) ->
                x: d.x
                y: d.y

        Chart.addSeries
            name: "friends"
            renderer: "column"
            sigfigs: 1
            color: "#6060c0"
            draggable: true
            afterDrag: (d, y, i, draggedSeries, graph) ->
                graph.data()[i].z = y

            tooltip: (d) ->
                d.y + " friends"

            dataTransform: (d) ->
                x: d.x
                y: d.z

        assert Chart.series[Chart.series.length-2].name is 'enemies'
        assert Chart.series[Chart.series.length-1].name is 'friends'
        assert Chart.series[Chart.series.length-2].renderer is 'line'
        assert Chart.series[Chart.series.length-1].renderer is 'column'
        assert Chart.series[Chart.series.length-1].sigfigs is 1
        assert Chart.series[Chart.series.length-2].color is '#c05020'
        assert Chart.series[Chart.series.length-1].color is '#6060c0'
        assert typeof Chart.series[Chart.series.length-2].dataTransform is 'function'
        assert typeof Chart.series[Chart.series.length-1].dataTransform is 'function'
        assert typeof Chart.series[Chart.series.length-2].tooltip is 'function'
        assert typeof Chart.series[Chart.series.length-1].tooltip is 'function'
        assert Chart.series[Chart.series.length-1].draggable is true
        assert typeof Chart.series[Chart.series.length-1].afterDrag is 'function'


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
        assert Chart.width() is 720 - Chart.margin.left - Chart.margin.right - Chart.padding.left - Chart.padding.right
        assert Chart.height() is 420 - Chart.margin.top - Chart.margin.bottom - Chart.padding.top - Chart.padding.bottom


    it "Chart: check height function", ->
        Chart = Chart.height(450)
        Chart.update()
        assert Chart.height() is 450 - Chart.margin.top - Chart.margin.bottom - Chart.padding.top - Chart.padding.bottom


    it "Chart: check width function", ->
        Chart = Chart.width(700)
        Chart.update()
        assert Chart.width() is 700 - Chart.margin.left - Chart.margin.right - Chart.padding.left - Chart.padding.right


    it 'Tactile.Chart().render is function', ->
        assert typeof Chart.render is 'function'


    it 'Tactile.Chart().initSeriesStackData is function', ->
        assert typeof Chart.initSeriesStackData is 'function'


    it 'Tactile.Chart().element is function', ->
        assert typeof Chart.element is 'function'


