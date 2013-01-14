describe 'Donut series', ->
    Chart = new Tactile.Chart()

    it "Chart: check data function", ->
        data = [
          label: "FL"
          val: 40000
        ,
          label: "CA"
          val: 30000
        ,
          label: "NY"
          val: 20000
        ,
          label: "NC"
          val: 30000
        ,
          label: "SC"
          val: 40000
        ,
          label: "AZ"
          val: 50000
        ,
          label: "TX"
          val: 60000
        ]
        Chart.data(data)
        expect(Chart._data).toEqual (data)

    it "Chart: check element function", ->
        Chart.element($("#example_view")[0])
        expect(Chart._element).toEqual ($("#example_view")[0])


    it 'addSeries', ->
        Chart.addSeries
            name: "donut"
            renderer: "donut"
            color: "#c05020"
        expect(Chart.series[Chart.series.length-1].name).toBe 'donut'
        expect(Chart.series[Chart.series.length-1].renderer).toBe 'donut'
        expect(Chart.series[Chart.series.length-1].color).toBe '#c05020'

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
        Chart = Chart.height(400)
        Chart.update()
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


