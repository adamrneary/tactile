var chart = new Tactile.Chart({
                                  series: [{renderer: "line"}],
                                  data: [{x:0, y:0},{x:1, y:1},{x:2,y:2}],
                                  element: $("#example_view")[0]
                              });
chart.render();                      
