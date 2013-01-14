jasmine = jasmine
describe "Chart: ", ->
    it 'Chart object has all fields', ->
        expect(Tactile).toEqual jasmine.any(Object)

        Chart = new Tactile.Chart()
        expect(Chart).toEqual jasmine.any(Object)

        expect(Chart.innerHeight).toEqual jasmine.any(Number)

        expect(Chart.innerWidth).toEqual jasmine.any(Number)

        expect(Chart.marginedHeight).toEqual jasmine.any(Number)

        expect(Chart.marginedWidth).toEqual jasmine.any(Number)

        expect(Chart.outerHeight).toEqual jasmine.any(Number)

        expect(Chart.outerWidth).toEqual jasmine.any(Number)

        expect(Chart._slice).toEqual jasmine.any(Function)

        expect(Chart._axes).toEqual jasmine.any(Object)

        expect(Chart._axes.x).toEqual jasmine.any(Object)

        expect(Chart._axes.x.dimension).toEqual jasmine.any(String)

        expect(Chart._axes.x.frame).toEqual jasmine.any(Array)

        expect(Chart._axes.x.frame.length).toEqual 2

        expect(Chart._axes.y).toEqual jasmine.any(Object)

        expect(Chart._axes.y.dimension).toEqual jasmine.any(String)

        expect(Chart._axes.y.frame).toEqual jasmine.any(Array)

        expect(Chart._axes.y.frame.length).toEqual 2

        expect(Chart.discoverRange).toEqual jasmine.any(Function)

        expect(Chart.renderers).toEqual jasmine.any(Array)

        expect(Chart.series).toEqual jasmine.any(Array)

        expect(Chart.updateCallbacks).toEqual jasmine.any(Array)

        expect(Chart.updateCallbacks[0]).toEqual jasmine.any(Function)
    
        expect(Chart.updateCallbacks[1]).toEqual jasmine.any(Function)

        expect(Chart.addSeries).toEqual jasmine.any(Function)

    it "Tooltip: spotlightOn function should be turn on spotlight", ->
        Tactile.Tooltip.spotlightOn()
        expect(Tactile.Tooltip.getSpotlight()).toEqual true


    it "Tooltip: turnOffspotlight function should be turn off spotlight", ->
        Tactile.Tooltip.turnOffspotlight()
        expect(Tactile.Tooltip.getSpotlight()).toEqual false




            ##console.log Tactile.Chart().addSeries.renderer




            ##it 'Tactile.Chart().addSeries.name is string', ->

                ##chart.addSeries
                  ##name: "enemies"
                  ##renderer: "line"
                  ##color: "#c05020"
                  ##tooltip: (d) ->
                    ##d.y + " enemies"

                  ##dataTransform: (d) ->
                    ##x: d.x
                    ##y: d.y

                ##expect(Chart.addSeries.name).toEqual jasmine.any(String)

            ##it 'Tactile.Chart.element', ->
                ##_chart = new Tactile.Chart()
                ##console.log _chart
                ##element = _chart.element($("#example_view")[0])
                ##console.log element
                ##expect(element).toEqual jasmine.any(Object)




