{path, defaultConfig} = require('showcase')

# https://github.com/brunch/brunch/blob/master/docs/config.md
exports.config = defaultConfig
  files:
    javascripts:
      joinTo:
        'assets/tactile.js':  path('src/coffee/*')
      order:
        before: ['src/coffee/index.coffee']

    stylesheets:
      joinTo:
        'assets/tactile.css': path('src/scss/*')
