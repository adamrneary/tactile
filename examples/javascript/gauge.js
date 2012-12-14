var chart = new Tactile.Chart({
  element: $("#example_view")[0],
  width: 500,
  height: 400,
  data: [{value: 1, min: -10, max: 10}],
  
  series: [{
    name: 'gauge',
    renderer: "gauge",
    labels: true
  }]
});

chart.render();