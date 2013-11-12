describe 'Line series', ->
  it 'example', ->
    frameVal = [0, 4]
    data = [
      x: 0
      y: 10
      z: 0
    ,
      x: 1
      y: 170
      z: 200
    ,
      x: 2
      y: 280
      z: 100
    ,
      x: 3
      y: 205
      z: 240
    ,
      x: 4
      y: 280
      z: 100
    ,
      x: 5
      y: 205
      z: 240
    ,
      x: 6
      y: 280
      z: 100
    ,
      x: 7
      y: 205
      z: 240
    ,
      x: 8
      y: 332
      z: 490
    ]
    chart = new window.Tactile.Chart()
      .element(window.$("#example_view")[0])
      .data(data)
      .axes(x:{dimension: "time", frame: frameVal})
    chart.addSeries
      name: "enemies"
      renderer: "line"
      color: "#c05020"
      tooltip: (d) ->
        d.y + " enemies"

      dataTransform: (d) ->
        x: d.x
        y: d.y

    chart.addSeries
      name: "friends"
      renderer: "line"
      sigfigs: 1
      color: "#6060c0"
      draggable: true
      afterDrag: (d, y, i, draggedSeries, graph) ->
        graph.data()[i].z = y

      tooltip: (d) ->
        d.y + " friends"

      dataTransform: (d) ->
        x: d.x
        y: d.z

    chart.render()
    $("#example_view").empty()

