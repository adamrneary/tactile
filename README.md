# Tactile | _Bad-ass interactive charts._

Tactile is a javascript charting library using D3. It is designed to be highly interactive.

There are lots of js charting libraries emerging these days, and many of them are calling themselves "interactive," but few are actually interactive. Sure, if you update underlying data using an external UI control, and the chart is properly bound to that underlying data, the chart will re-render and thusly be "interactive."

But even better is a library that allows the user to interact with the chart directly:

* Drag columns, lines, or other chart series elements to update data
* Manage data updates through agnostic callbacks
* Drag the chart body to scroll laterally or -- optionally -- vertically
* Drag the axes to scale them
* Double-click the chart body to zoom in, and shift-double-click to zoom out

This library achieves these goals and more, providing a platform for a truly rich user experience.

## Installation

    $ bower install git@github.com:activecell/tactile.git#0.x.x --save

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

All code store in /src folder, that has a structure:

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

