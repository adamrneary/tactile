{scenario, next, pending} = require('./test/casper_helper')

scenario '#waterfall-timeseries', 'waterfall chart', ->
  next 'renders example page', ->
    @test.assertSelectorHasText '#example_header', 'Waterfall (time series)'

  next 'renders view', ->
    @test.assertExists 'div#example_view svg'
    @test.assertEval (() -> $('svg rect').length > 0), 'SVG contains elements'

  pending 'Any other tests'