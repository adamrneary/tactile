#describe 'Donut series', ->
    #Chart = new Tactile.Chart()

    #it "Chart: check data function", ->
        #data = [
          #label: "FL"
          #val: 40000
        #,
          #label: "CA"
          #val: 30000
        #,
          #label: "NY"
          #val: 20000
        #,
          #label: "NC"
          #val: 30000
        #,
          #label: "SC"
          #val: 40000
        #,
          #label: "AZ"
          #val: 50000
        #,
          #label: "TX"
          #val: 60000
        #]
        #Chart.data(data)
        #assert Chart._data is (data)

    #it "Chart: check element function", ->
        #Chart.element($("#example_view")[0])
        #assert Chart._element is ($("#example_view")[0])


    #it 'addSeries', ->
        #Chart.addSeries
            #name: "donut"
            #renderer: "donut"
            #color: "#c05020"
        #assert Chart.series[Chart.series.length-1].name is 'donut'
        #assert Chart.series[Chart.series.length-1].renderer is 'donut'
        #assert Chart.series[Chart.series.length-1].color is '#c05020'

    #it "Chart: check for all series don't disabled", ->
        #res = Chart._allSeriesDisabled()
        #assert res is false


    #it "Chart: check for disable all series", ->
        #_.each Chart.series, (s) ->
            #s.disable()
        #res = Chart._allSeriesDisabled()
        #assert res is true

    #it "Chart: check setSize function", ->
        #Chart.setSize
            #width: 720
            #height: 420
        #Chart.update()
        #assert Chart.width() is 720 - Chart.margin.left - Chart.margin.right - Chart.padding.left - Chart.padding.right
        #assert Chart.height() is 420 - Chart.margin.top - Chart.margin.bottom - Chart.padding.top - Chart.padding.bottom



    #it "Chart: check height function", ->
        #Chart = Chart.height(400)
        #Chart.update()
        #assert Chart.height() is 400 - Chart.margin.top - Chart.margin.bottom - Chart.padding.top - Chart.padding.bottom



    #it "Chart: check width function", ->
        #Chart = Chart.width(680)
        #Chart.update()
        #assert Chart.width() is 680 - Chart.margin.left - Chart.margin.right - Chart.padding.left - Chart.padding.right


    #it 'Tactile.Chart().render is function', ->
        #assert typeof Chart.render is 'function'


    #it 'Tactile.Chart().initSeriesStackData is function', ->
        #assert typeof Chart.initSeriesStackData is 'function'


    #it 'Tactile.Chart().element is function', ->
        #assert typeof Chart.element is 'function'


