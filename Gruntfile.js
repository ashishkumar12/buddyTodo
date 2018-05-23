module.exports = function(grunt){
    /*
    *  for compiling .scss files to .css
    */
    grunt.initConfig({
      sass: {
        dist: {
          files: [{
            expand: true,
            cwd: './assets/scss',
            src: ['*.scss'],
            dest: './build/css',
            ext: '.css'
          }]
        }
      },
      watch: {
        css: {
          files: '**/*.scss',
          tasks: ['sass'],
          options: {
            livereload: false,
          },
        },
      },
      browserSync: {
        default_options: {
          bsFiles: {
            src: [
              "**/*.html",
              "**/*.js",
              "**/*.css"
            ]
          },
          options: {
            watchTask: true,
            proxy : "localhost:3000"
          }
        }
      },
      svgstore: {
        icons: {
          files: {
            './static/icons/icons.svg': ['./static/svg/*.svg']
          },
          options: {
  
            /*
              prefix all icons with an unambiguous label
            */
            prefix: 'icon-',
  
            /*
              cleans fill, stroke, stroke-width attributes
              so that we can style them from CSS
            */
            cleanup: false,
  
            /*
              write a custom function to strip the first part
              of the file that Adobe Illustrator generates
              when exporting the artboards to SVG
            */
            convertNameToId: function(name) {
              return name.replace(/^\w+\_/, '');
            }
          }
        }
      }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['sass']);
    grunt.registerTask('browserSync',['browserSync','watch']);
    grunt.loadNpmTasks('grunt-browser-sync');
    // grunt.loadNpmTasks('grunt-svgstore');
    // grunt.registerTask('svg',['svgstore']);
  };
  