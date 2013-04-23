{scenario, next, pending} = require('./test/casper_helper')

scenario '#sankey', 'Sankey', ->
  next 'renders example page', ->
    @test.assertSelectorHasText '#example_header', 'Sankey'

  next 'renders view', ->
    @test.assertExists 'div#example_view svg'
    @test.assertEval (() -> $('svg circle, svg path').length > 0), 'SVG contains elements'

  pending 'Any other tests'