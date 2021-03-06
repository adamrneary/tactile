{scenario, next, pending} = require('./test/casper_helper')

scenario '#gauge', 'gauge chart', ->
  next 'renders example page', ->
    @test.assertSelectorHasText '#example_header', 'Gauge'

  next 'renders view', ->
    @test.assertExists 'div#example_view svg'
    @test.assertEval (() -> $('svg path, svg circle').length > 0), 'SVG contains elements'

  pending 'Any other tests'