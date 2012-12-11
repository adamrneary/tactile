var chart = new Tactile.Chart({
                                  series: [{renderer: "line"}],
                                  data: [{x:0, y:200},{x:1, y:1},{x:2,y:200}],
                                  element: $("#example_view")[0],
                                  height: 400,
                                  width: 500
                              });
chart.render();                      
