jasmine = jasmine
describe "Chart: ", ->
    it 'Chart object has all fields', ->

        Chart = new Tactile.Chart()
        assert typeof Chart is 'object'

        assert typeof Chart.innerHeight is 'number'

        assert typeof Chart.innerWidth is 'number'

        assert typeof Chart.marginedHeight is 'number'

        assert typeof Chart.marginedWidth is 'number'

        assert typeof Chart.outerHeight is 'number'

        assert typeof Chart.outerWidth is 'number'

        assert typeof Chart._slice is 'function'

        assert typeof Chart._axes is 'object'

        assert typeof Chart._axes.x is 'object'

        assert typeof Chart._axes.x.dimension is 'string'

        assert typeof Chart._axes.x.frame is 'object'

        assert Chart._axes.x.frame.length is 2

        assert typeof Chart._axes.y is 'object'

        assert typeof Chart._axes.y.dimension is 'string'

        assert typeof Chart._axes.y.frame is 'object'

        assert Chart._axes.y.frame.length is 2

        assert typeof Chart.discoverRange is 'function'

        assert typeof Chart.renderers is 'object'

        assert typeof Chart.series is 'object'

        assert typeof Chart.updateCallbacks is 'object'

        assert typeof Chart.updateCallbacks[0] is 'function'
    
        assert typeof Chart.updateCallbacks[1] is 'function'

        assert typeof Chart.addSeries is 'function'

    it "Tooltip: spotlightOn function should be turn on spotlight", ->
        Tactile.Tooltip.spotlightOn()
        assert Tactile.Tooltip.getSpotlight() is true


    it "Tooltip: turnOffspotlight function should be turn off spotlight", ->
        Tactile.Tooltip.turnOffspotlight()
        assert Tactile.Tooltip.getSpotlight() is false




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

                ##assert Chart.addSeries.name is 'string'

            ##it 'Tactile.Chart.element', ->
                ##_chart = new Tactile.Chart()
                ##console.log _chart
                ##element = _chart.element($("#example_view")[0])
                ##console.log element
                ##assert element is 'object'




