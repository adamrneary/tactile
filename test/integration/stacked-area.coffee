{scenario, next, pending} = require('./test/casper_helper')

scenario '#stacked-area', 'stacked area cheart', ->
  next 'renders example page', ->
    @test.assertSelectorHasText '#example_header', 'Stacked area'

  next 'renders view', ->
    @test.assertExists 'div#example_view svg'
    @test.assertEval (() -> $('svg path').length > 0), 'SVG contains elements'

  pending 'Any other tests'