{scenario, next, pending} = require('./test/casper_helper')

scenario '#multi-donut', 'multiple donuts chart', ->
  next 'renders example page', ->
    @test.assertSelectorHasText '#example_header', 'Multiple donuts'

  next 'renders view', ->
    @test.assertExists 'div#example_view svg'
    @test.assertEval (() -> $('svg path').length > 0), 'SVG contains elements'

  pending 'Any other tests'