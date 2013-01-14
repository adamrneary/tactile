describe 'Scatter series', ->
    Chart = new Tactile.Chart()
    it 'addSeries', ->
        Chart.addSeries [
          name: "actual-planned-dots"
          renderer: "scatter"
          color: "#F52A2D"
          cssConditions: (d) ->
            
            # less than planned
            return "low"  if d.r < d.y
            
            # same as planned
            return "mid"  if d.r is d.y
            
            # more than planned
            return "high"  if d.r > d.y
            ""

          tooltip: (d) ->
            d.y + " planned, got " + d.r

          dataTransform: (d) ->
            x: d.period
            y: d.plan
            r: d.actual
        ]
        expect(Chart.series[Chart.series.length-1].name).toBe 'actual-planned-dots'
        expect(Chart.series[Chart.series.length-1].renderer).toBe 'scatter'
        expect(Chart.series[Chart.series.length-1].color).toBe '#F52A2D'
        expect(Chart.series[Chart.series.length-1].tooltip).toEqual jasmine.any(Function)
        expect(Chart.series[Chart.series.length-1].dataTransform).toEqual jasmine.any(Function)
        expect(Chart.series[Chart.series.length-1].cssConditions).toEqual jasmine.any(Function)

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
        expect(Chart._data).toEqual (data)

    it "Chart: check element function", ->
        Chart.element($("#example_view")[0])
        expect(Chart._element).toEqual ($("#example_view")[0])

    it "Chart: check for all series don't disabled", ->
        res = Chart._allSeriesDisabled()
        expect(res).toEqual false


    it "Chart: check for disable all series", ->
        _.each Chart.series, (s) ->
            s.disable()
        res = Chart._allSeriesDisabled()
        expect(res).toEqual true


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


