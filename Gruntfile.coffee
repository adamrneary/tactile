module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    "gh-pages":
      options:
        base: "#{__dirname}/ghpages"
        branch: "gh-pages"
        repo: "git@github.com:activecell/tactile.git"
      ghp:
        disabled: no
        src: ["**/*"]

    docco:
      options:
        layout : "parallel"
        output : "ghpages/annotated_sources/"
        timeout: 1000
      docs:
        disabled: no
        src: "src/coffee/**/*.coffee"

    coffee:
      compileJoined:
        options:
          join: true
        files:
          "ghpages/assets/tactile.js": [
            "src/coffee/index.coffee"

            "src/coffee/helpers/base_renderer.coffee"
            "src/coffee/helpers/draggable_renderer.coffee"
            "src/coffee/helpers/series.coffee"
            "src/coffee/helpers/series_set.coffee"
            "src/coffee/helpers/tooltip.coffee"
            "src/coffee/helpers/utils.coffee"

            "src/coffee/models/area_renderer.coffee"
            "src/coffee/models/axis_base.coffee"
            "src/coffee/models/axis_linear.coffee"
            "src/coffee/models/axis_time.coffee"
            "src/coffee/models/bullet_renderer.coffee"
            "src/coffee/models/column_renderer.coffee"
            "src/coffee/models/donut_renderer.coffee"
            "src/coffee/models/dragger.coffee"
            "src/coffee/models/fixtures_time.coffee"
            "src/coffee/models/gauge_renderer.coffee"
            "src/coffee/models/grid.coffee"
            "src/coffee/models/leaderboard_renderer.coffee"
            "src/coffee/models/line_renderer.coffee"
            "src/coffee/models/range_slider.coffee"
            "src/coffee/models/scatter_renderer.coffee"
            "src/coffee/models/waterfall_renderer.coffee"

            "src/coffee/models/chart.coffee"
          ]

          "ghpages/assets/examples.js":   "src/examples/index.coffee"

          "ghpages/assets/unit_tests.js": [
            "test/client/area.coffee"
            "test/client/column.coffee"
            "test/client/donut.coffee"
            "test/client/gauge.coffee"
            "test/client/legend.coffee"
            "test/client/line.coffee"
            "test/client/multiple-donuts.coffee"
            "test/client/multiple-series.coffee"
            "test/client/scatter.coffee"
            "test/client/sliding-timeframe.coffee"
            "test/client/stacked-column.coffee"

            "test/unit/area_renderer_test.coffee"
            "test/unit/area_test.coffee"
            "test/unit/axis_time_test.coffee"
            "test/unit/axis_y_test.coffee"
            "test/unit/chart_test.coffee"
            "test/unit/column_renderer_test.coffee"
            "test/unit/donut_renderer_test.coffee"
            "test/unit/dragger_test.coffee"
            "test/unit/fixtures_time_test.coffee"
            "test/unit/gauge_renderer_test.coffee"
            "test/unit/line_renderer_test.coffee"
            "test/unit/line_test.coffee"
            "test/unit/range_slider_test.coffee"
            "test/unit/renderer_base_test.coffee"
            "test/unit/scatter_renderer_test.coffee"
            "test/unit/tooltip_test.coffee"
          ]

    sass:
      tactile:
        options:
          outputStyle: 'expanded'
        files:
          'ghpages/assets/tactile.css': 'src/scss/tactile/tactile.scss'

    clean:
      afterpush:[
        "ghpages"
      ]

    copy:
      examples:
        files: [
          expand: true, cwd: "src/examples/list/", src: ["*.coffee"], dest: "ghpages/examples/"
        ]
      testrunner:
        files: [
          expand: true, cwd: "test/", src: ["test_runner.html"], dest: "ghpages/"
        ]
      d3:
        files: [
          expand: true, cwd: "node_modules/showcase/vendor/js/", src: ["d3.js"], dest: "ghpages/assets/"
        ]


    watch:
      coffee:
        files: [
          "src/**/*.coffee"
          "test/**/*.coffee"
        ]
        tasks: ["coffee"]

      sass:
        files: ["src/scss/tactile"]
        tasks: ["sass"]

    styleguide:
      options:
        markdown: false
        base: "#{__dirname}/"
        name: "styleguide"
      files:
        templatepath: "views/examples/"
        scsssrc: "src/scss/"
        srcname: "tactile.scss"
        sections: "views/sections/"
        dstpath: "ghpages/"

    symlink:
      fonts:
        src: "node_modules/showcase/vendor/fonts/"
        dest: "ghpages/fonts"
      images:
        src: "node_modules/showcase/vendor/images/"
        dest: "ghpages/images"
      vendor:
        src: "node_modules/showcase/vendor/"
        dest: "ghpages/vendor"

    "compile-handlebars":
      index:
        template: "views/layout.hbs"
        templateData: {body: "EmptyPage"}
        output: "ghpages/index.html"
      home:
        template: "{{{datablock}}}"
        templateData: {datablock: "EmptyPage"}
        output: "ghpages/home.html"
      demo:
        template: "views/examples/index.hbs"
        templateData: {demoblock: "<script src='assets/examples.js' defer></script>"}
        output: "ghpages/demo.html"

    grunt.registerTask "compile-assets", [
      "coffee"
      "sass"
    ]

    grunt.registerTask "compile-docs", [
      "docco"
    ]

    grunt.registerTask "compile-styleguide", [
      "styleguide"
    ]

    grunt.registerTask "default", [
      "compile-assets"
      "compile-docs"
      "copy"
      "symlink"
      "compile-handlebars"
      "compile-styleguide"
#      "gh-pages"
      #      "clean:afterpush"
      #      "watch"
    ]

    grunt.loadNpmTasks "showcase"