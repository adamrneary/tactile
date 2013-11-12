{scenario, next, pending} = require('./test/casper_helper')

scenario '#column', 'column chart render', ->
  next 'renders example page', ->
    @test.assertSelectorHasText '#example_header', 'Column'

  next 'renders view', ->
    @test.assertExists 'div#example_view svg'
    @test.assertEval (() -> $('svg rect').length > 0), 'SVG contains elements'

  pending 'Any other tests'