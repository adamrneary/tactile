{scenario, next, pending} = require('./test/casper_helper')

scenario '#stacked-column', 'stacked column chart', ->
  next 'renders example page', ->
    @test.assertSelectorHasText '#example_header', 'Staked column'

  next 'renders view', ->
    @test.assertExists 'div#example_view svg'
    @test.assertEval (() -> $('svg rect').length > 0), 'SVG contains elements'

  pending 'Any other tests'

# Integration tests are appended, as they use the same type of chart

scenario '#stacked-column-big-data', 'Stacked column big data', ->
  next 'renders example page', ->
    @test.assertSelectorHasText '#example_header', 'Stacked column big data'

  next 'renders view', ->
    @test.assertExists 'div#example_view svg'
    @test.assertEval (() -> $('svg path').length > 0), 'SVG contains elements'

  pending 'Any other tests'