var chart = new Tactile.Chart({
               width: 800,
               series: [
                   {
                     // note that data array should be of same array in each series
                     data: [ {x:0, y:5}, {x:1, y:1}, {x:2,y:5}, {x:3, y:7} ],
                     renderer: "bar",
                     wide: true,
                     round: true
                   }
                   ,
                   {
                     data: [ {x:0, y:8}, {x:1, y:1}, {x:2,y:10}, {x:3, y:5} ],
                     renderer: "draggableLine",
                     afterDrag: function(d, draggedSeries){
                       console.log("Dragged:");
                       console.log(d);
                       console.log(draggedSeries);
                     }
                   }
               ],
               element: $("#test")[0]
           });
 new Tactile.AxisY({graph: chart});
 new Tactile.AxisTime({graph: chart});

 chart.render()
