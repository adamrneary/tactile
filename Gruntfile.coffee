# see config.coffee, showcase/lib/brunch
# locally grunt src -> assets
# move/test to showcase

# TODO: grunt watch +
# TODO: grunt coffeescript +
# TODO: grunt scss(compass/sass) +
# TODO: grunt kss
# TODO: grunt concat/uglify
# TODO: grunt copy examples/list +

path = require("path")
getPath = (p)->
  path.resolve __dirname, p


module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")


    "gh-pages":
      options:
        base: getPath("ghpages")
        branch: "gh-pages"
        repo: "git@github.com:activecell/tactile.git"
      ghp:
        disabled: no
        src: ["**/*"]

    docco:
      options:
        layout : "parallel"
        output : "ghpages/docs/"
      docs:
        disabled: no
        src: "src/coffee/**/*.coffee"

    coffee:
      compileJoined:
        options:
          join: true
        files:
          "ghpages/assets/compiled/tactile.js": [
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

          "ghpages/assets/compiled/examples.js":   "src/examples/index.coffee"

          "ghpages/assets/compiled/unit_tests.js": [
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

    compass:
      compileJoined:
        options:
          sassDir: 'src/scss/tactile/'
          cssDir: 'ghpages/assets/compiled/'

    watch:
      coffee:
        files: [
          "src/**/*.coffee"
          "test/**/*.coffee"
        ]
        tasks: ["coffee"]

      compass:
        files: ["src/scss/tactile"]
        tasks: ["compass"]

    ksstraverse:
      options:
        markdown: false
        base: "src/scss"
        name: "styleguide"
        dstpath: "ghpages/"
      files:
        srcname: "tactile.scss"

    copy:
      main:
        files:
          [
            expand: true, cwd: "src/examples/list/", src: ["*.coffee"], dest: "ghpages/examples/"
          ]


#    # TEMP?
    grunt.registerMultiTask "ksstraverse", "compiled styleguide with hbs", () ->
      kss = require "kss"
      fs  = require "fs"
      handlebars = require "handlebars"
      done = this.async()

      kss.traverse "#{__dirname}/src/scss", { markdown: false }, (err, styleguide) ->
        return console.log(err) if err
        sections = require('showcase').getSections("tactile.scss", "#{__dirname}/views/sections", styleguide)
        source = fs.readFileSync("views/examples/styleguide.hbs").toString()
        template = handlebars.compile(source);
        html = template(sections: sections)
#        console.log "outputdir", this.options().dstpath + this.options().name + ".html"
        fs.writeFileSync("ghpages/styleguide.html", html)
        done()

#    grunt.loadTasks "#{__dirname}/tasks/"
    grunt.loadNpmTasks "grunt-contrib-coffee"
    grunt.loadNpmTasks "grunt-contrib-compass"
    grunt.loadNpmTasks "grunt-contrib-watch"
    grunt.loadNpmTasks "grunt-docco-multi"
    grunt.loadNpmTasks "grunt-gh-pages"
    grunt.loadNpmTasks "grunt-contrib-copy"
    grunt.registerTask "compile-assets", [
      "coffee"
      "compass"
    ]

    grunt.registerTask "compile-docs", [
      "docco"
    ]

    grunt.registerTask "default", [
      "compile-assets"
      "watch"
    ]
#    grunt.loadNpmTasks "showcase"