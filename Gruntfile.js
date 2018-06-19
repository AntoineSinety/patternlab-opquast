'use strict';
module.exports = function(grunt) {
     require("load-grunt-tasks")(grunt);
     grunt.initConfig({
          watch: {
               sass: {
                    files: ['css/sass/**/**/**.{scss,sass}'],
                    tasks: ['sass:dist', 'postcss:dist']
               },
               'babel': {
                    files: ['js/ecmascript.js'],
                    tasks: ['babel:dist']
               },
               'uglify': {
                    files: ['js/main.js'],
                    tasks: ['uglify:dist']
               }
          },
          sass: { // Task
               dist: { // Target
                    options: { // Target options
                         style: 'compressed',
                         compass: true
                    },
                    files: { // Dictionary of files
                         'css/main.css': 'css/sass/main.scss' // 'destination': 'source',
                    }
               }
          },
          "babel": {
               options: {
                    sourceMap: true,
                    presets: ['env']
               },
               dist: {
                    files: {
                         "js/main.js": "js/ecmascript.js"
                    }
               }
          },
          "uglify": {
               dist: {
                    files: {
                         'js/main.min.js': 'js/main.js'
                    }
               }
          },
          postcss: {
               options: {
                    map: true,
                    processors: [
                         require('autoprefixer')({
                              browsers: ['last 2 versions']
                         })
                    ]
               },
               dist: {
                    src: 'css/main.css'
               }
          }
     });

     grunt.loadNpmTasks('grunt-contrib-sass'); // https://github.com/gruntjs/grunt-contrib-sass
     grunt.loadNpmTasks('grunt-postcss'); // https://github.com/postcss/autoprefixer
     grunt.loadNpmTasks('grunt-contrib-watch'); // https://github.com/gruntjs/grunt-contrib-watch
     grunt.loadNpmTasks('grunt-contrib-uglify');
     grunt.registerTask('default', ['sass:dist', 'babel:dist', 'uglify:dist', 'postcss:dist', 'watch']);
};
