describe 'Scatter series', ->
  Chart = new Tactile.Chart()
  it 'addSeries'#, ->
    # Chart.addSeries [
    #   name: "actual-planned-dots"
    #   renderer: "scatter"
    #   color: "#F52A2D"
    #   cssConditions: (d) ->

    #     # less than planned
    #     return "low"  if d.r < d.y

    #     # same as planned
    #     return "mid"  if d.r is d.y

    #     # more than planned
    #     return "high"  if d.r > d.y
    #     ""

    #   tooltip: (d) ->
    #     d.y + " planned, got " + d.r

    #   dataTransform: (d) ->
    #     x: d.period
    #     y: d.plan
    #     r: d.actual
    # ]
    # scatter = Chart.series[Chart.series.length-1]
    # assert scatter.name is 'actual-planned-dots'
    # assert scatter.renderer is 'scatter'
    # assert scatter.color is '#F52A2D'
    # assert typeof scatter.tooltip is 'function'
    # assert typeof scatter.dataTransform is 'function'
    # assert typeof scatter.cssConditions is 'function'

  it "Chart: check data function", ->
    data = [
      period: 1325376000
      actual: 14
      plan: 5
    ,
      period: 1328054400
      actual: 16
      plan: 10
    ,
      period: 1330560000
      actual: 12
      plan: 19
    ,
      period: 1333238400
      actual: 13
      plan: 33
    ,
      period: 1335830400
      actual: 16
      plan: 15
    ,
      period: 1338508800
      actual: 25
      plan: 25
    ,
      period: 1341100800
      actual: 16
      plan: 15
    ,
      period: 1343779200
      actual: 16
      plan: 33
    ,
      period: 1346457600
      actual: 12
      plan: 15
    ,
      period: 1349049600
      actual: 14
      plan: 10
    ,
      period: 1351728000
      actual: 16
      plan: 9
    ,
      period: 1354320000
      actual: 15
      plan: 14
    ]
    Chart.data(data)
    assert Chart._data is (data)

  it "Chart: check element function", ->
    Chart.element($("#example_view")[0])
    assert Chart._element is ($("#example_view")[0])

  it "Chart: check for all series don't disabled"#, ->
    # res = Chart._allSeriesDisabled()
    # assert res is false


  it "Chart: check for disable all series"#, ->
    # _.each Chart.series, (s) ->
    #   s.disable()
    # res = Chart._allSeriesDisabled()
    # assert res is true


  it "Chart: check height function"#, ->
    # Chart = Chart.height(450)
    # Chart.update()
    # heightMargin = Chart.margin.top + Chart.margin.bottom
    # heightMargin = Chart.padding.top + Chart.padding.bottom
    # height = heightMargin + heightPadding
    # assert Chart.height() is 450 - height


  it "Chart: check setSize function"#, ->
    # Chart.setSize
    #   width: 720
    #   height: 420
    # Chart.update()
    # widthMargin = Chart.margin.left + Chart.margin.right
    # widthPadding = Chart.padding.left + Chart.padding.right
    # heightMargin = Chart.margin.top + Chart.margin.bottom
    # heightMargin = Chart.padding.top + Chart.padding.bottom
    # width =  widthMargin + widthPadding
    # height = heightMargin + heightPadding
    # assert Chart.width() is 720 - width
    # assert Chart.height() is 420 - height


  it "Chart: check width function", ->
    Chart = Chart.width(700)
    Chart.update()
    widthMargin = Chart.margin.left + Chart.margin.right
    widthPadding = Chart.padding.left + Chart.padding.right
    width =  widthMargin + widthPadding
    assert Chart.width() is 700 - width


  it 'Tactile.Chart().render is function', ->
    assert typeof Chart.render is 'function'


  it 'Tactile.Chart().initSeriesStackData is function', ->
    assert typeof Chart.initSeriesStackData is 'function'


  it 'Tactile.Chart().element is function', ->
    assert typeof Chart.element is 'function'


