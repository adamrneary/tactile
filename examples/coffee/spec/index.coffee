chart = ''
jasmine = jasmine
Chart = null
describe "Tactile", ->
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

        describe 'series', ->
            it 'addSeries', ->
                Chart.addSeries
                  name: "enemies"
                  renderer: "line"
                  color: "#c05020"

                  tooltip: (d) ->
                    d.y + " enemies"

                  dataTransform: (d) ->
                    x: d.x
                    y: d.y


                expect(Chart.series[Chart.series.length-1].name).toBe 'enemies'
                expect(Chart.series[Chart.series.length-1].renderer).toBe 'line'
                expect(Chart.series[Chart.series.length-1].color).toBe '#c05020'
                expect(Chart.series[Chart.series.length-1].tooltip).toEqual jasmine.any(Function)
                expect(Chart.series[Chart.series.length-1].dataTransform).toEqual jasmine.any(Function)
            
            it "Chart: check for all series don't disabled", ->
                res = Chart._allSeriesDisabled()
                expect(res).toEqual false

            it "Chart: check for disable all series", ->
                console.log Chart.series
                _.each Chart.series, (s) ->
                    s.disable()
                    
                res = Chart._allSeriesDisabled()
                #console.log res
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

            it "Tooltip: spotlightOn function should be turn on spotlight", ->
                Tactile.Tooltip.spotlightOn()
                expect(Tactile.Tooltip.getSpotlight()).toEqual true


            it "Tooltip: turnOffspotlight function should be turn off spotlight", ->
                Tactile.Tooltip.turnOffspotlight()
                expect(Tactile.Tooltip.getSpotlight()).toEqual false


            it 'Tactile.Chart().render is function', ->
                expect(Chart.render).toEqual jasmine.any(Function)
                #console.log Chart.render.newSeries


            it 'Tactile.Chart().initSeriesStackData is function', ->
                expect(Chart.initSeriesStackData).toEqual jasmine.any(Function)

            it 'Tactile.Chart().element is function', ->
                expect(Chart.element).toEqual jasmine.any(Function)



            #console.log Tactile.Chart().addSeries.renderer




            #it 'Tactile.Chart().addSeries.name is string', ->

                #chart.addSeries
                  #name: "enemies"
                  #renderer: "line"
                  #color: "#c05020"
                  #tooltip: (d) ->
                    #d.y + " enemies"

                  #dataTransform: (d) ->
                    #x: d.x
                    #y: d.y

                #expect(Chart.addSeries.name).toEqual jasmine.any(String)

            #it 'Tactile.Chart.element', ->
                #_chart = new Tactile.Chart()
                #console.log _chart
                #element = _chart.element($("#example_view")[0])
                #console.log element
                #expect(element).toEqual jasmine.any(Object)




