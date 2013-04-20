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
    reach_actual = Chart.series[Chart.series.length-3]
    planned = Chart.series[Chart.series.length-2]
    sum = Chart.series[Chart.series.length-1]
    assert reach_actual.name is 'reach actual'
    assert planned.name is 'planned'
    assert sum.name is 'sum'
    assert reach_actual.renderer is 'column'
    assert planned.renderer is 'column'
    assert sum.renderer is 'column'
    assert reach_actual.round is false
    assert planned.round is false
    assert sum.round is false
    assert reach_actual.color is "#c05020"
    assert planned.color is "#6060c0"
    assert sum.color is "#6020c0"
    assert typeof reach_actual.dataTransform is 'function'
    assert typeof planned.dataTransform is 'function'
    assert typeof sum.dataTransform is 'function'
    assert typeof reach_actual.tooltip is 'function'
    assert typeof planned.tooltip is 'function'
    assert typeof sum.tooltip is 'function'


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
    heightMargin = Chart.margin.top + Chart.margin.bottom
    heightPadding = Chart.padding.top + Chart.padding.bottom
    height = heightMargin + heightPadding
    assert Chart.height() is 450 - height


  it "Chart: check setSize function", ->
    Chart.setSize
      width: 680
      height: 400
    Chart.update()
    widthMargin = Chart.margin.left + Chart.margin.right
    widthPadding = Chart.padding.left + Chart.padding.right
    heightMargin = Chart.margin.top + Chart.margin.bottom
    heightPadding = Chart.padding.top + Chart.padding.bottom
    width =  widthMargin + widthPadding
    height = heightMargin + heightPadding
    assert Chart.width() is 680 - width
    assert Chart.height() is 400 - height


  it "Chart: check width function", ->
    Chart = Chart.width(680)
    Chart.update()
    widthMargin = Chart.margin.left + Chart.margin.right
    widthPadding = Chart.padding.left + Chart.padding.right
    width =  widthMargin + widthPadding
    assert Chart.width() is 680 - width


  it 'Tactile.Chart().render is function', ->
    assert typeof Chart.render is 'function'


  it 'Tactile.Chart().initSeriesStackData is function', ->
    assert typeof Chart.initSeriesStackData is 'function'


  it 'Tactile.Chart().element is function', ->
    assert typeof Chart.element is 'function'


