{scenario, next, pending} = require('./test/casper_helper')

scenario '#donut', 'donut chart', ->
  next 'renders example page', ->
    @test.assertSelectorHasText '#example_header', 'Donut'

  next 'renders view', ->
    @test.assertExists 'div#example_view svg'
    @test.assertEval (() -> $('svg path').length > 0), 'SVG contains elements'

  pending 'Any other tests'