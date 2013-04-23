{scenario, next, pending} = require('./test/casper_helper')

scenario '#scatter', 'Scatter page', ->
  next 'renders example page', ->
    @test.assertSelectorHasText '#example_header', 'Scatter'

  next 'renders view', ->
    @test.assertExists 'div#example_view svg'
    @test.assertEval (() -> $('svg circle').length > 0), 'SVG contains elements'

  next 'svg chart contains axis bar', ->
    @test.assertExists 'svg g.y-ticks'

  next 'svg and data corresponding', ->
    @test.assertEval (() ->
      $('svg g.scatter circle').length is 12),
      'SVG contains the same count of circles as the data'

  pending 'tooltip popup'