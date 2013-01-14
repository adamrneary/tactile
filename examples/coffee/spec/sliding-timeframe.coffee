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
        expect(Chart._data).toEqual (data)


    it "Chart: check axes function", ->
        frameVal = [2, 10]
        Chart.axes(x:
          dimension: "time"
          frame: frameVal
        )
        expect(Chart._axes.x.frame).toEqual (frameVal)


    it "Chart: check element function", ->
        Chart.element($("#example_view")[0])
        expect(Chart._element).toEqual ($("#example_view")[0])




    it 'addSeries', ->
        Chart.addSeries [
            name: "xy"
            renderer: "line"
            color: "#c05020"
            dataTransform: (d) ->
                x: d.x
                y: d.y
        ,
            name: "xz"
            renderer: "line"
            color: "#6060c0"
            dataTransform: (d) ->
                x: d.x
                y: d.z
        ]
        expect(Chart.series[Chart.series.length-2].name).toBe 'xy'
        expect(Chart.series[Chart.series.length-1].name).toBe 'xz'
        expect(Chart.series[Chart.series.length-2].renderer).toBe 'line'
        expect(Chart.series[Chart.series.length-1].renderer).toBe 'line'
        expect(Chart.series[Chart.series.length-2].color).toBe '#c05020'
        expect(Chart.series[Chart.series.length-1].color).toBe '#6060c0'
        expect(Chart.series[Chart.series.length-2].dataTransform).toEqual jasmine.any(Function)
        expect(Chart.series[Chart.series.length-1].dataTransform).toEqual jasmine.any(Function)


    it "Chart: check for all series don't disabled", ->
        res = Chart._allSeriesDisabled()
        expect(res).toEqual false


    it "Chart: check for disable all series", ->
        _.each Chart.series, (s) ->
            s.disable()
        res = Chart._allSeriesDisabled()
        expect(res).toEqual true


    it "Chart: check height function", ->
        Chart = Chart.height(450)
        Chart.update()
        expect(Chart.height()).toEqual 450 - Chart.margin.top - Chart.margin.bottom - Chart.padding.top - Chart.padding.bottom


    it "Chart: check setSize function", ->
        Chart.setSize
            width: 680
            height: 400
        Chart.update()
        expect(Chart.width()).toEqual 680 - Chart.margin.left - Chart.margin.right - Chart.padding.left - Chart.padding.right
        expect(Chart.height()).toEqual 400 - Chart.margin.top - Chart.margin.bottom - Chart.padding.top - Chart.padding.bottom


    it "Chart: check width function", ->
        Chart = Chart.width(680)
        Chart.update()
        expect(Chart.width()).toEqual 680 - Chart.margin.left - Chart.margin.right - Chart.padding.left - Chart.padding.right


    it 'Tactile.Chart().render is function', ->
        expect(Chart.render).toEqual jasmine.any(Function)


    it 'Tactile.Chart().initSeriesStackData is function', ->
        expect(Chart.initSeriesStackData).toEqual jasmine.any(Function)


    it 'Tactile.Chart().element is function', ->
        expect(Chart.element).toEqual jasmine.any(Function)


