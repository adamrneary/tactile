# Tactile
Bad-ass interactive charts.

## The five-minute setup.
Check your system for local requirements (run until it passes!):

    script/bootstrap

Run tests to ensure that all pass:

    npm test

Run the project locally (with tests and watcher):

    npm start

Then navigate to the [localhost:5000](http://localhost:5000).

## Contributing

Please (please please please) read the following sections on our wiki:

* [Welcome to Activecell](https://github.com/activecell/activecell/wiki)
* [Activecell "flow"](https://github.com/activecell/activecell/wiki/flow)
* [Our approach to agile](https://github.com/activecell/activecell/wiki/agile)
* [Our toolset](https://github.com/activecell/activecell/wiki/tools)
* [Quality](https://github.com/activecell/activecell/wiki/Quality)
* [Style Guide](https://launchpad.activecell.com/admin/styleguide)

There's so much good information in there! You'll learn so much! :-)

### Hacking on the code

All code store in /src folder, that has a stucture:

* /src/coffee   - scripts
* /src/scss     - styles
* /src/examples - scripts for example page

**Use tests** to write better code. In order to run interactive test server, that rerun tests on every change use

    npm run test-server

Tests use [mocha](http://visionmedia.github.io/mocha/), [chai](http://chaijs.com/) and [testem](https://github.com/airportyh/testem) as runner.

## Data Philosophy

Key tenets of Tactile:

* A chart is based around one list of data.
* A chart can display as many series as needed.
* Each series takes the chart data and transforms it as needed via dataTransform. Must
  return objects that are of the form `{x: NUMBER, y: NUMBER}`.
* Only the chart is passed both the axes to use and the timeframe with which to display
  the data of the series.

