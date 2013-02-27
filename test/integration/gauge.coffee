describe 'Gauge series', ->
    Chart = new Tactile.Chart()

    it "Chart: check data function", ->
        data = [
          value: 1
          min: -10
          max: 10
        ]
        Chart.data(data)
        assert Chart._data is (data)


    it "Chart: check element function", ->
        Chart.element($("#example_view")[0])
        assert Chart._element is ($("#example_view")[0])


    it 'addSeries', ->
        Chart.addSeries
            name: 'gauge',
            renderer: "gauge",
            labels: true
        assert Chart.series[Chart.series.length-1].name is 'gauge'
        assert Chart.series[Chart.series.length-1].renderer is 'gauge'
        assert Chart.series[Chart.series.length-1].labels is true


    it "Chart: check height function", ->
        Chart = Chart.height(450)
        Chart.update()
        assert Chart.height() is 450 - Chart.margin.top - Chart.margin.bottom - Chart.padding.top - Chart.padding.bottom


    it "Chart: check setSize function", ->
        Chart.setSize
            width: 720
            height: 420
        Chart.update()
        assert Chart.width() is 720 - Chart.margin.left - Chart.margin.right - Chart.padding.left - Chart.padding.right
        assert Chart.height() is 420 - Chart.margin.top - Chart.margin.bottom - Chart.padding.top - Chart.padding.bottom


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

