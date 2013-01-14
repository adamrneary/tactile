describe 'Gauge series', ->
    Chart = new Tactile.Chart()

    it "Chart: check data function", ->
        data = [
          value: 1
          min: -10
          max: 10
        ]
        Chart.data(data)
        expect(Chart._data).toEqual (data)


    it "Chart: check element function", ->
        Chart.element($("#example_view")[0])
        expect(Chart._element).toEqual ($("#example_view")[0])


    it 'addSeries', ->
        Chart.addSeries
            name: 'gauge',
            renderer: "gauge",
            labels: true
        expect(Chart.series[Chart.series.length-1].name).toBe 'gauge'
        expect(Chart.series[Chart.series.length-1].renderer).toBe 'gauge'
        expect(Chart.series[Chart.series.length-1].labels).toBe true


    it "Chart: check height function", ->
        Chart = Chart.height(450)
        Chart.update()
        expect(Chart.height()).toEqual 450 - Chart.margin.top - Chart.margin.bottom - Chart.padding.top - Chart.padding.bottom


    it "Chart: check setSize function", ->
        Chart.setSize
            width: 720
            height: 420
        Chart.update()
        expect(Chart.width()).toEqual 720 - Chart.margin.left - Chart.margin.right - Chart.padding.left - Chart.padding.right
        expect(Chart.height()).toEqual 420 - Chart.margin.top - Chart.margin.bottom - Chart.padding.top - Chart.padding.bottom


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

