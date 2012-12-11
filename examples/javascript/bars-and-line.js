var chart = new Tactile.Chart({
                                  width: 500,
                                  height: 400,
                                  series: [{renderer: "bar",
                                            wide: true,
                                            round: true},
                                           {renderer: "draggableLine",
                                            dataTransform: function(d){
                                                return {
                                                    x:d.x,
                                                    y:(d.y+1)
                                                };
                                            },
                                            afterDrag: function(d, draggedSeries){
                                                console.log("Dragged:");
                                                console.log(d);
                                                console.log(draggedSeries);
                                            }}],
                                  data: [ {x:0, y:5}, {x:1, y:1}, {x:2,y:5}, {x:3, y:7} ],
                                  element: $("#example_view")[0]
                              });
chart.render();