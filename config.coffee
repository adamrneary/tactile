{path, defaultConfig} = require('showcase')

# https://github.com/brunch/brunch/blob/master/docs/config.md
exports.config = defaultConfig
  files:
    javascripts:
      joinTo:
        'assets/tactile.js':    path('src/coffee/*')
        'assets/examples.js':   path('src/examples/*')
        'assets/unit_tests.js': path('test/client/*', 'test/unit/*')
      order:
        before: ['src/coffee/index.coffee']
        after: ['src/coffee/models/chart.coffee']

    stylesheets:
      joinTo:
        'assets/tactile.css': path('src/scss/tactile/*')
        'assets/styleguide.css': path('src/scss/styleguide/*')
