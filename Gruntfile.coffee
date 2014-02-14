cartesian = JSON.parse require("fs").readFileSync("src/examples/cartesian.json")
noncartesian = JSON.parse require("fs").readFileSync("src/examples/noncartesian.json")
components = JSON.parse require("fs").readFileSync("src/examples/components.json")

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
            "src/coffee/lib/utils.coffee"

            "src/coffee/core/chart.coffee"
            "src/coffee/core/dataset.coffee"
            "src/coffee/core/series.coffee"
            "src/coffee/core/series_set.coffee"
            "src/coffee/core/dragger.coffee"
            "src/coffee/core/grid.coffee"
            "src/coffee/core/tooltip.coffee"

            "src/coffee/axes/axis_base.coffee"
            "src/coffee/axes/axis_linear.coffee"
            "src/coffee/axes/axis_time.coffee"

            "src/coffee/renderers/base_renderer.coffee"
            "src/coffee/renderers/draggable_renderer.coffee"
            "src/coffee/renderers/area_renderer.coffee"
            "src/coffee/renderers/bullet_renderer.coffee"
            "src/coffee/renderers/column_renderer.coffee"
            "src/coffee/renderers/donut_renderer.coffee"
            "src/coffee/renderers/gauge_renderer.coffee"
            "src/coffee/renderers/leaderboard_renderer.coffee"
            "src/coffee/renderers/line_renderer.coffee"
            "src/coffee/renderers/scatter_renderer.coffee"
            "src/coffee/renderers/waterfall_renderer.coffee"

          ]

          "ghpages/assets/examples.js":   "src/examples/index.coffee"

          "ghpages/assets/js/index.js":   "src/examples/list/chart-changing.coffee"

          "ghpages/assets/unit_tests.js": [
            # "test/client/area.coffee"
            # "test/client/column.coffee"
            # "test/client/donut.coffee"
            # "test/client/gauge.coffee"
            # "test/client/legend.coffee"
            # "test/client/line.coffee"
            # "test/client/multiple-donuts.coffee"
            # "test/client/multiple-series.coffee"
            # "test/client/scatter.coffee"
            # "test/client/sliding-timeframe.coffee"
            # "test/client/stacked-column.coffee"
            #
            # "test/unit/area_renderer_test.coffee"
            # "test/unit/area_test.coffee"
            # "test/unit/axis_time_test.coffee"
            # "test/unit/axis_y_test.coffee"
            "test/unit/chart_test.coffee"
            # "test/unit/column_renderer_test.coffee"
            # "test/unit/donut_renderer_test.coffee"
            # "test/unit/dragger_test.coffee"
            # "test/unit/fixtures_time_test.coffee"
            # "test/unit/gauge_renderer_test.coffee"
            # "test/unit/line_renderer_test.coffee"
            # "test/unit/line_test.coffee"
            # "test/unit/range_slider_test.coffee"
            # "test/unit/renderer_base_test.coffee"
            # "test/unit/scatter_renderer_test.coffee"
            # "test/unit/tooltip_test.coffee"
          ]

      examplesjs:
        expand: true
        flatten: true,
        cwd: "src/examples/list"
        src: ["*.coffee"]
        dest: "ghpages/assets/js"
        ext: ".js"

    sass:
      tactile:
        options:
          outputStyle: 'expanded'
        files:
          'ghpages/assets/tactile.css': 'src/scss/tactile/tactile.scss'

    clean:
      styleguide:[
        "ghpages/styleguide*.html"
      ]
      styleguidetmp: [
        "ghpages/styleguide_tmp.html"
      ]
      ghpages:[
        "ghpages"
      ]
      tmp: "ghpages/*tmp.html"

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
      index_tmp:
        preHTML:  "views/layout_pre.html"
        postHTML: "views/layout_post.html"
        template: "views/examples/index.hbs"
        templateData:
          header: "CHART-CHANGING"
          demoblock: ""
          jsblock: ""
          coffeetext: grunt.file.read("src/examples/list/chart-changing.coffee")
        output: "ghpages/" + "index" + "_tmp.html"
      index:
        preHTML: "ghpages/" + "index" + "_tmp.html"
        template: "{{{null}}}"
        templateData: {null: "<script src='./assets/js/index.js' defer=''></script>"}
        output: "ghpages/index.html"
      demo:
        preHTML: "views/layout_pre.html"
        postHTML: "views/layout_post.html"
        template: "views/examples/index.hbs"
        templateData:
          demoblock: ""
          cartesianLinks: cartesian
          nonCartesianLinks: noncartesian
          componentLinks: components
        output: "ghpages/demo.html"
      docs:
        template: "views/layout.hbs"
        templateData: {body: "<div style='height: 100%;'>\n<iframe src='./annotated_sources/index.html' style='width: 100%; height: 100%; border: none;'></iframe>\n</div>"}
        output: "ghpages/docs.html"
      test:
        template: "views/layout.hbs"
        templateData: {body: "<div style='height: 100%;'>\n<iframe src='./test_runner.html' style='width: 100%; height: 100%; border: none;'></iframe>\n</div>"}
        output: "ghpages/test.html"
      styleguidetmp:
        preHTML: "views/layout_pre.html"
        postHTML: "ghpages/styleguide.html"
        template: "{{{null}}}"
        templateData: {null: ""}
        output: "ghpages/styleguide_tmp.html"
      styleguide:
        preHTML: "ghpages/styleguide_tmp.html"
        postHTML: "views/layout_pre.html"
        template: "{{{null}}}"
        templateData: {null: ""}
        output: "ghpages/styleguide.html"

    "create-example":
      files:
        "src/examples/list/*.coffee"

    grunt.registerMultiTask "create-example", "create example pages", ->
      gruntOptions = {}
      gruntOptions["compile-handlebars"] = grunt.config.get("compile-handlebars")
      gruntOptions["clean"] = grunt.config.get("clean")
      compiletask = []
      cleantask = []

      removeInvalidFiles = (files) ->
        files.src.filter (filepath) ->
          unless grunt.file.exists(filepath)
            grunt.log.warn "Source file \"" + filepath + "\" not found."
            false
          else
            true

      @files.forEach (f)->
        validFiles = removeInvalidFiles f
        validFiles.forEach (d) ->
          name = d.split("/")[d.split("/").length - 1]
          name = name.split(".")[0]
          file = grunt.file.read d
          tmp = {}
          tmp["#{name+"_tmp"}"] = {
            preHTML:  "views/layout_pre.html"
            postHTML: "views/layout_post.html"
            template: "views/examples/index.hbs"
            templateData: {
              header: "#{name}"
              coffeetext: file
              demoblock: ""
              jsblock: ""
              cartesianLinks: cartesian
              nonCartesianLinks: noncartesian
              componentLinks: components
            }
            output: "ghpages/" + "#{name}" + "_tmp.html"
          }
          tmp["#{name}"] = {
            preHTML: "ghpages/" + "#{name}" + "_tmp.html"
            template: "{{{null}}}"
            templateData: {null: "<script>Rainbow.color();</script>\n<script src='./assets/js/"+"#{name}"+".js' defer=''></script>"}
            output: "ghpages/" + "#{name}" + ".html"
          }
          gruntOptions["compile-handlebars"]["#{name+"_tmp"}"] = tmp["#{name+"_tmp"}"]
          gruntOptions["compile-handlebars"]["#{name}"]        = tmp["#{name}"]
          gruntOptions["clean"]["#{name+"_tmp"}"]              = "ghpages/" + "#{name}" + "_tmp.html"
          compiletask.push "#{"compile-handlebars:"+name+"_tmp"}"
          compiletask.push "#{"compile-handlebars:"+name}"
          cleantask.push "#{"clean:"+name+"_tmp"}"

      grunt.config.set("compile-handlebars", gruntOptions["compile-handlebars"])
      grunt.config.set("clean", gruntOptions["clean"])
      grunt.task.run compiletask
      grunt.task.run cleantask

    grunt.registerTask "compile-assets", [
      "coffee"
      "sass"
    ]

    grunt.registerTask "compile-docs", [
      "docco"
    ]

    grunt.registerTask "compile-styleguide", [
      "clean:styleguide",
      "styleguide",
      "compile-handlebars:styleguidetmp",
      "compile-handlebars:styleguide",
      "clean:styleguidetmp"
    ]
    grunt.registerTask "handlebars", [
      "compile-handlebars:index"
      "compile-handlebars:demo"
      "compile-handlebars:docs"
      "compile-handlebars:test"
    ]

  grunt.registerTask "default", [
    "create-example"
    "compile-assets"
    "compile-docs"
    "copy"
    "symlink"
    "handlebars"
    "compile-handlebars:index_tmp"
    "compile-handlebars:index"
    "compile-styleguide"
    "clean:tmp"
#      "gh-pages"
#      "clean:ghpages"
  ]
  grunt.registerTask "dev", [
    "default"
    "watch"
  ]

  grunt.loadNpmTasks "showcase"
