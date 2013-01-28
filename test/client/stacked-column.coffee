describe 'Stacked columb timeframe', ->
    Chart = new Tactile.Chart()

    it "Chart: check data function", ->
        data = [
          period: 1325376000
          actual: 4
          plan: 1
        ,
          period: 1328054400
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
        assert Chart._data is (data)


    it "Chart: check axes function", ->
        frameVal = [1330560000, 1354320000]
        Chart.axes
          y: "linear"
          x:
            dimension: "time"
            frame: frameVal
            options:
              ticksTreatment: "align-middle"
        assert Chart._axes.x.frame is frameVal
        assert Chart._axes.y.dimension is "linear"


    it "Chart: check element function", ->
        Chart.element($("#example_view")[0])
        assert Chart._element is ($("#example_view")[0])


    it 'addSeries', ->
        Chart.addSeries
          name: "reach actual"
          renderer: "column"
          round: false
          color: "#c05020"
          tooltip: (d) ->
            d.y + " customers"

          dataTransform: (d) ->
            x: d.period
            y: d.actual

        Chart.addSeries [
          name: "planned"
          renderer: "column"
          round: false
          color: "#6060c0"
          tooltip: (d) ->
            d.y + " planned"

          dataTransform: (d) ->
            x: d.period
            y: d.plan
        ,
          name: "sum"
          renderer: "column"
          round: false
          color: "#6020c0"
          tooltip: (d) ->
            d.y + " sum"

          dataTransform: (d) ->
            x: d.period
            y: parseInt(d.plan + d.actual)
        ]
        assert Chart.series[Chart.series.length-3].name is 'reach actual'
        assert Chart.series[Chart.series.length-2].name is 'planned'
        assert Chart.series[Chart.series.length-1].name is 'sum'
        assert Chart.series[Chart.series.length-3].renderer is 'column'
        assert Chart.series[Chart.series.length-2].renderer is 'column'
        assert Chart.series[Chart.series.length-1].renderer is 'column'
        assert Chart.series[Chart.series.length-3].round is false
        assert Chart.series[Chart.series.length-2].round is false
        assert Chart.series[Chart.series.length-1].round is false
        assert Chart.series[Chart.series.length-3].color is "#c05020"
        assert Chart.series[Chart.series.length-2].color is "#6060c0"
        assert Chart.series[Chart.series.length-1].color is "#6020c0"
        assert typeof Chart.series[Chart.series.length-3].dataTransform is 'function'
        assert typeof Chart.series[Chart.series.length-2].dataTransform is 'function'
        assert typeof Chart.series[Chart.series.length-1].dataTransform is 'function'
        assert typeof Chart.series[Chart.series.length-3].tooltip is 'function'
        assert typeof Chart.series[Chart.series.length-2].tooltip is 'function'
        assert typeof Chart.series[Chart.series.length-1].tooltip is 'function'


    it "Chart: check for all series don't disabled", ->
        res = Chart._allSeriesDisabled()
        assert res is false


    it "Chart: check for disable all series", ->
        _.each Chart.series, (s) ->
            s.disable()
        res = Chart._allSeriesDisabled()
        assert res is true


    it "Chart: check height function", ->
        Chart = Chart.height(450)
        Chart.update()
        assert Chart.height() is 450 - Chart.margin.top - Chart.margin.bottom - Chart.padding.top - Chart.padding.bottom


    it "Chart: check setSize function", ->
        Chart.setSize
            width: 680
            height: 400
        Chart.update()
        assert Chart.width() is 680 - Chart.margin.left - Chart.margin.right - Chart.padding.left - Chart.padding.right
        assert Chart.height() is 400 - Chart.margin.top - Chart.margin.bottom - Chart.padding.top - Chart.padding.bottom


    it "Chart: check width function", ->
        Chart = Chart.width(680)
        Chart.update()
        assert Chart.width() is 680 - Chart.margin.left - Chart.margin.right - Chart.padding.left - Chart.padding.right


    it 'Tactile.Chart().render is function', ->
        assert typeof Chart.render is 'function'


    it 'Tactile.Chart().initSeriesStackData is function', ->
        assert typeof Chart.initSeriesStackData is 'function'


    it 'Tactile.Chart().element is function', ->
        assert typeof Chart.element is 'function'


