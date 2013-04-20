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


  it 'addSeries'#, ->
    # Chart.addSeries
    #   name: 'gauge',
    #   renderer: "gauge",
    #   labels: true
    # gauge = Chart.series[Chart.series.length-1]
    # assert gauge.name is 'gauge'
    # assert gauge.renderer is 'gauge'
    # assert gauge.labels is true


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


  it "Chart: check height function"#, ->
    # Chart = Chart.height(450)
    # Chart.update()
    # heightMargin = Chart.margin.top + Chart.margin.bottom
    # heightMargin = Chart.padding.top + Chart.padding.bottom
    # height = heightMargin + heightPadding
    # assert Chart.height() is 450 - height


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

