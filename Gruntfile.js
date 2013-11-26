module.exports = function (grunt) {

  grunt.initConfig({

    clean: ['build/'],

    copy: {
      dist: {
        files: [
          { expand: true, src: ['*.js', '!Gruntfile.js'], dest: 'build/plugins' },
        ]
      }
    },

    concat: {

      dist: {
        files: { 
          'build/state-loader.js': ['*.js', '!Gruntfile.js'],
        }
      }
    
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['clean', 'copy', 'concat']);

};
