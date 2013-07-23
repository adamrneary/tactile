{scenario, next, pending} = require('./test/casper_helper')

scenario '#sankey', 'Sankey', ->
  pending 'renders example page', ->
    @test.assertSelectorHasText '#example_header', 'Sankey'

  pending 'renders view', ->
    @test.assertExists 'div#example_view svg'
    @test.assertEval (() -> $('svg circle, svg path').length > 0), 'SVG contains elements'

  pending 'Any other tests'