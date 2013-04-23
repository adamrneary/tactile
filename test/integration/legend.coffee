{scenario, next, pending} = require('./test/casper_helper')

scenario '#legend', 'legend chart', ->
  next 'renders example page', ->
    @test.assertSelectorHasText '#example_header', 'Legend'

  next 'renders view', ->
    @test.assertExists 'div#example_view svg'
    @test.assertEval (() -> $('svg rect, svg path').length > 0), 'SVG contains elements'

  pending 'Any other tests'