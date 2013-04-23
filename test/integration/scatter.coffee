{scenario, next, pending} = require('./test/casper_helper')

scenario '#scatter', 'Scatter page', ->
  next 'renders example page', ->
    @test.assertSelectorHasText '#example_header', 'Scatter'

  next 'renders view', ->
    @test.assertExists 'div#example_view svg'
    @test.assertEval (() -> $('svg circle').length > 0), 'SVG contains elements'

  pending 'Any other tests'