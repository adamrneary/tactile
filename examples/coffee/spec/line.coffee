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
        expect(Chart._data).toEqual (data)


    it "Chart: check axes function", ->
        frameVal = [0, 8]
        Chart.axes(x:
          dimension: "time"
          frame: frameVal
        )
        expect(Chart._axes.x.frame).toEqual (frameVal)


    it "Chart: check element function", ->
        Chart.element($("#example_view")[0])
        expect(Chart._element).toEqual ($("#example_view")[0])


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

        expect(Chart.series[Chart.series.length-1].name).toBe 'enemies'
        expect(Chart.series[Chart.series.length-1].renderer).toBe 'line'
        expect(Chart.series[Chart.series.length-1].color).toBe '#c05020'
        expect(Chart.series[Chart.series.length-1].tooltip).toEqual jasmine.any(Function)
        expect(Chart.series[Chart.series.length-1].dataTransform).toEqual jasmine.any(Function)
        expect(Chart.series[Chart.series.length-1].afterDrag).toEqual jasmine.any(Function)
        expect(Chart.series[Chart.series.length-1].sigfigs).toEqual 1
        expect(Chart.series[Chart.series.length-1].draggable).toEqual true


    it "Chart: check for all series don't disabled", ->
        res = Chart._allSeriesDisabled()
        expect(res).toEqual false


    it "Chart: check for disable all series", ->
        _.each Chart.series, (s) ->
            s.disable()
        res = Chart._allSeriesDisabled()
        expect(res).toEqual true


    it "Chart: check setSize function", ->
        Chart.setSize
            width: 720
            height: 420
        Chart.update()
        expect(Chart.width()).toEqual 720 - Chart.margin.left - Chart.margin.right - Chart.padding.left - Chart.padding.right
        expect(Chart.height()).toEqual 420 - Chart.margin.top - Chart.margin.bottom - Chart.padding.top - Chart.padding.bottom


    it "Chart: check height function", ->
        Chart = Chart.height(450)
        Chart.update()
        expect(Chart.height()).toEqual 450 - Chart.margin.top - Chart.margin.bottom - Chart.padding.top - Chart.padding.bottom


    it "Chart: check width function", ->
        Chart = Chart.width(700)
        Chart.update()
        expect(Chart.width()).toEqual 700 - Chart.margin.left - Chart.margin.right - Chart.padding.left - Chart.padding.right


    it 'Tactile.Chart().render is function', ->
        expect(Chart.render).toEqual jasmine.any(Function)


    it 'Tactile.Chart().initSeriesStackData is function', ->
        expect(Chart.initSeriesStackData).toEqual jasmine.any(Function)


    it 'Tactile.Chart().element is function', ->
        expect(Chart.element).toEqual jasmine.any(Function)

