/*global module:false*/
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-coffee'); // http://github.com/avalade/grunt-coffee
  grunt.loadNpmTasks('grunt-compass'); // https://github.com/sindresorhus/grunt-sass
  grunt.loadNpmTasks('grunt-contrib-copy'); // https://github.com/sindresorhus/grunt-sass
  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    coffee:{
        coffee:{
            src: ['src/js/models/*'],
            dest: 'build/'
        }       
    },
    compass:{
        dev:{
            src: 'src/scss',
            specify: 'src/scss/charts.scss',
            dest: 'dist'            
      }  
    },
    copy:{
        dist:{
            files:{
                "examples/javascript/":"dist/tactile.js",
                "examples/css/":"dist/charts.css"
            }
        }        
    },
    concat: {
        dist: {
            src: ['<banner:meta.banner>', 
                  'src/js/intro.js',
                  'src/js/core.js',
                  'src/js/score.js',

                  'build/fixtures_time.js',
                  'build/axis_y.js',
                  'build/axis_time.js',
                  'build/hover_detail.js',
                  'build/hover_detail_multi.js',

                  'build/renderer_base.js',
                  'build/gauge_renderer.js',
                  'build/column_renderer.js',
                  'build/line_renderer.js',
                  'build/draggable_line_renderer.js',

                  'build/range_slider.js',
                  'build/chart.js',
                  'src/js/outro.js'],
            dest: 'dist/<%= pkg.name %>.js'
        }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'build'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {}
    },
    uglify: {},
    lint:{
        files: ["src/**/*"]
    }
  });

  // Default task.
  grunt.registerTask('default', 'coffee compass concat min copy');
  grunt.registerTask('build', 'coffee compass concat min copy');

};
