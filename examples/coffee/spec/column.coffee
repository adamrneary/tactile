describe 'Column series', ->
    Chart = new Tactile.Chart()

    it "Chart: check data function", ->
        data = [
          period: 1325376000
          actual: 4
          plan: 1
        ,
          period: 1328054500
          actual: 5
          plan: 1
        ,
          period: 1330560000
          actual: 6
          plan: 2
        ,
          period: 1333238400
          actual: 7
          plan: 3
        ,
          period: 1335830400
          actual: 6
          plan: 5
        ,
          period: 1338508800
          actual: 5
          plan: 8
        ,
          period: 1341100800
          actual: 4
          plan: 5
        ,
          period: 1343779200
          actual: 5
          plan: 3
        ,
          period: 1346457600
          actual: 6
          plan: 2
        ,
          period: 1349049600
          actual: 7
          plan: 1
        ,
          period: 1351728000
          actual: 6
          plan: 1
        ,
          period: 1354320000
          actual: 5
          plan: 2
        ]
        Chart.data(data)
        expect(Chart._data).toEqual (data)


    it "Chart: check element function", ->
        Chart.element($("#example_view")[0])
        expect(Chart._element).toEqual ($("#example_view")[0])


    it 'addSeries', ->
        Chart.addSeries [
            name: "reach actual"
            renderer: "column"
            sigfigs: 0
            round: false
            color: "#c05020"
            draggable: true
            tooltip: (d) ->
                d.y + " customers"

            dataTransform: (d) ->
                x: d.period
                y: d.actual

            afterDrag: (d, y, i, draggedSeries, graph) ->
                graph._data[i].actual = y
        ,
            name: "planned"
            renderer: "column"
            round: false
            color: "#6060c0"
            draggable: true
            tooltip: (d) ->
                d.y + " planned"

            dataTransform: (d) ->
                x: d.period
                y: d.plan

            afterDrag: (d, y, i, draggedSeries, graph) ->
                graph._data[i].plan = y
        ]
        expect(Chart.series[Chart.series.length-2].name).toBe 'reach actual'
        expect(Chart.series[Chart.series.length-1].name).toBe 'planned'
        expect(Chart.series[Chart.series.length-2].renderer).toBe 'column'
        expect(Chart.series[Chart.series.length-1].renderer).toBe 'column'
        expect(Chart.series[Chart.series.length-2].sigfigs).toBe 0
        expect(Chart.series[Chart.series.length-2].color).toBe '#c05020'
        expect(Chart.series[Chart.series.length-1].color).toBe '#6060c0'
        expect(Chart.series[Chart.series.length-2].dataTransform).toEqual jasmine.any(Function)
        expect(Chart.series[Chart.series.length-1].dataTransform).toEqual jasmine.any(Function)
        expect(Chart.series[Chart.series.length-2].tooltip).toEqual jasmine.any(Function)
        expect(Chart.series[Chart.series.length-1].tooltip).toEqual jasmine.any(Function)
        expect(Chart.series[Chart.series.length-2].round).toBe false
        expect(Chart.series[Chart.series.length-1].round).toBe false
        expect(Chart.series[Chart.series.length-2].draggable).toBe true
        expect(Chart.series[Chart.series.length-1].draggable).toBe true


    it "Chart: check for all series don't disabled", ->
        res = Chart._allSeriesDisabled()
        expect(res).toEqual false


    it "Chart: check for disable all series", ->
        _.each Chart.series, (s) ->
            s.disable()
        res = Chart._allSeriesDisabled()
        expect(res).toEqual true


    it "Chart: check height function", ->
        Chart = Chart.height(500)
        Chart.update()
        expect(Chart.height()).toEqual 500 - Chart.margin.top - Chart.margin.bottom - Chart.padding.top - Chart.padding.bottom


    it "Chart: check setSize function", ->
        Chart.setSize
            width: 700
            height: 500
        Chart.update()
        expect(Chart.width()).toEqual 700 - Chart.margin.left - Chart.margin.right - Chart.padding.left - Chart.padding.right
        expect(Chart.height()).toEqual 500 - Chart.margin.top - Chart.margin.bottom - Chart.padding.top - Chart.padding.bottom


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

