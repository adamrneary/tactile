# Tactile
A bad-ass interactive charting platform.

[![Nodejitsu Deploy Status Badges](https://webhooks.nodejitsu.com/adamrneary/tactile.png)](https://webops.nodejitsu.com#adamrneary/webhooks)

## The five-minute setup.
Check your system for local requirements (run until it passes!):

    script/bootstrap

Run tests to ensure that all pass:

    npm test

Run the project locally (with tests and watcher):

    npm start

Then navigate to the [showcase](http://localhost:5000).

## Contributing
Please (please please please) read the following sections on our wiki:

* [Welcome to Activecell](https://github.com/activecell/activecell/wiki)
* [Activecell "flow"](https://github.com/activecell/activecell/wiki/flow)
* [Our approach to agile](https://github.com/activecell/activecell/wiki/agile)
* [Our toolset](https://github.com/activecell/activecell/wiki/tools)
* [Quality](https://github.com/activecell/activecell/wiki/Quality)
* [Style Guide](https://launchpad.activecell.com/admin/styleguide)

There's so much good information in there! You'll learn so much! :-)

### Hacking on the showcase examples
All functionality added to the source code should be showcased in our examples. To update examples, simply follow these guidelines:

1. To update an existing example, simply update code in examples/js, testing to make sure it works (!)
1. To add a new route, simply create a new example js file in examples/js/ and then add the route to the appropriate link list array in index.js with a shortLink to your new js file

The main index.html page is generated dynamically, and the result of the js in your example file will be showcased directly above the pretty source code.

## Data Philosophy

Key tenets of Tactile:

* A chart is based around one list of data.
* A chart can display as many series as needed.
* Each series takes the chart data and transforms it as needed via dataTransform. Must
  return objects that are of the form `{x: NUMBER, y: NUMBER}`.
* Only the chart is passed both the axes to use and the timeframe with which to display
  the data of the series.

