# Tactile 

Charts as smooth as velvet. 

To view the examples:
``` bash
npm install
grunt build
foreman start -f Procfile
```

Then navigate to the [showcase](http://localhost:5000). 

# Data Philosophy 

Key tenets of Tactile
* A chart is based around one list of data. 
* A chart can display as many series as needed. 
* Each series takes the chart data and transforms it as needed via dataTransform. Must
  return objects that are of the form `{x: NUMBER, y: NUMBER}`.
* Only the chart is passed both the axes to use and the timeframe with which to display
  the data of the series. 
