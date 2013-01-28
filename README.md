# Shotgun 

A bad-ass backbone application loader.

## Requirements

Shotgun's git repo is available on GitHub, which can be browsed at:

    <http://github.com/activecell/tactile>

and cloned with:

    git clone git://github.com/activecell/tactile.git

Check your system for local requirements (run until it passes!):

    script/bootstrap

Run tests to ensure that all pass:

    npm test
    
Run the project locally:

    npm start

Then navigate to the [showcase](http://localhost:5000).

## Contributing

To contribute to Shotgun, please follow these instructions.

1. Clone the project with `git clone git://github.com/activecell/shotgun.git`
1. Run `script/bootstrap` to check for requirements
1. Run `npm test` to ensure from the beginning that tests pass on your machine
1. Create a thoughtfully named topic branch to contain your change
1. Hack away
1. Add specs and make sure everything still passes by running 'npm test'
1. If necessary, [rebase your commits into logical chunks](https://help.github.com/articles/interactive-rebase), without errors
1. Push the branch up to GitHub
1. Send a pull request for your branch

Note: You don't have to fork the project in order to create a branch and a pull request!

### Hacking on the showcase examples

All functionality added to the source code should be showcased in our examples. Grunt updates all dependencies. To update examples, simply follow these guidelines:

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

