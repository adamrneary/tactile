# Tactile 

A bad-ass interactive charting platform.

## Requirements

Tactile's git repo is available on GitHub, which can be browsed at:

    <http://github.com/activecell/tactile>

and cloned with:

    git clone git://github.com/activecell/tactile.git

Please use `script/bootstrap` to automatically check for current requirements.

## Contributing

To contribute to Tactile, please follow these instructions.

1. Clone the project with `git clone git://github.com/activecell/tactile.git`
1. Run `script/bootstrap` to check for requirements
1. FUTURE: Run `rake` to ensure from the beginning that tests pass on your machine
1. Create a thoughtfully named topic branch to contain your change
1. Hack away
1. FUTURE: Add specs and make sure everything still passes by running 'rake'
1. If necessary, [rebase your commits into logical chunks](https://help.github.com/articles/interactive-rebase), without errors
1. Push the branch up to GitHub
1. Send a pull request for your branch

Note: You don't have to fork the project in order to create a branch and a pull request!

## Building

Before building, ensure that all requirements are met with `script/bootstrap` (it should be run until it completes successfully.)

To view the examples:
``` bash
grunt build
foreman start -f Procfile
```

Then navigate to the [showcase](http://localhost:5000). 

## Data Philosophy 

Key tenets of Tactile:

* A chart is based around one list of data. 
* A chart can display as many series as needed. 
* Each series takes the chart data and transforms it as needed via dataTransform. Must
  return objects that are of the form `{x: NUMBER, y: NUMBER}`.
* Only the chart is passed both the axes to use and the timeframe with which to display
  the data of the series. 
