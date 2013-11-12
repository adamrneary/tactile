{scenario, next, pending} = require('./test/casper_helper')

scenario '#dual-scaled', 'dual axis chart', ->
  next 'renders example page', ->
    @test.assertSelectorHasText '#example_header', 'Secondary y-axis'

  next 'renders view', ->
    @test.assertExists 'div#example_view svg'
    @test.assertEval (() -> $('svg path').length > 0), 'SVG contains elements'

  pending 'Any other tests'