{scenario, next, pending} = require('./test/casper_helper')

scenario '#line', 'line chart renders', ->
  next 'renders example page', ->
    @test.assertSelectorHasText '#example_header', 'Line'

  next 'renders view', ->
    @test.assertExists 'div#example_view svg'
    @test.assertEval (() -> $('svg path').length > 0), 'SVG contains elements'

  next 'renders slider', ->
    @test.assertExists 'div#slider'
    @test.assertEval (() -> $('div#slider').children().length > 0),
    'slider renders correctly'

  next 'SVG chart contains axis bars', ->
    @test.assertExists 'svg g.x-ticks'
    @test.assertExists 'svg g.y-ticks'

  next 'SVG chart contains lines for enemies/friends', ->
    @test.assertExists 'svg g#enemies'
    @test.assertExists 'svg g#friends'

  next 'svg and data corresponding', ->
    @test.assertEval (() -> $('svg g#enemies circle').length is 9),
      'SVG contains the same count of circles as the data'
    @test.assertEval (() -> $('svg g#friends circle').length is 9),
      'SVG contains the same count of circles as the data'

  pending 'tooltip popup'
  pending 'slider interval change'