{scenario, next, pending} = require('./test/casper_helper')

scenario '#multiple-series', 'multiple series types chart', ->
  next 'renders example page', ->
    @test.assertSelectorHasText '#example_header', 'Multiple series types'

  next 'renders view', ->
    @test.assertExists 'div#example_view svg'
    @test.assertEval (() -> $('svg rect').length > 0), 'SVG contains rect element'
    @test.assertEval (() -> $('svg path').length > 0), 'SVG contains path element'

  pending 'Any other tests'