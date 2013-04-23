{scenario, next, pending} = require('./test/casper_helper')

scenario '#sliding-timeframe', 'timeframe chart', ->
  next 'renders example page', ->
    @test.assertSelectorHasText '#example_header', 'Sliding timeframe'

  next 'renders view', ->
    @test.assertExists 'div#example_view svg'
    @test.assertEval (() -> $('svg path').length > 0), 'SVG contains elements'

  pending 'Any other tests'