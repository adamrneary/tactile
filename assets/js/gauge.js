(function() {
  var chart, generateData, setDataButton,
    _this = this;

  generateData = function() {
    var data;
    return data = [
      {
        min: -10,
        max: 10,
        value: Math.floor(Math.random() * 20 - 10)
      }
    ];
  };

  chart = new Tactile.Chart().element($("#example_view")[0]).data(generateData()).addSeries({
    name: "gauge",
    renderer: "gauge",
    labels: true
  });

  chart.render();

  setDataButton = $("<button class='btn btn-mini'>Set data</button>");

  $("#above-chart").html(setDataButton);

  setDataButton.click(function(e) {
    chart.data(generateData());
    chart.render();
    return e.stopPropagation();
  });

  $("#below-chart").html('');

}).call(this);
