module.exports = function(grunt) {
  'use strict';

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths
  var config = {
      dist: 'public/assets',
      bower: 'bower_components'
  };

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    config: config,

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        //src: ['src/*.js'],
        //dest: 'dist/output<%= pkg.name %>.js'
      },
      bootstrap: {
        src: [
          '<%= config.bower %>/bootstrap/js/transition.js',
          '<%= config.bower %>/bootstrap/js/alert.js',
          '<%= config.bower %>/bootstrap/js/button.js',
          '<%= config.bower %>/bootstrap/js/carousel.js',
          '<%= config.bower %>/bootstrap/js/collapse.js',
          '<%= config.bower %>/bootstrap/js/dropdown.js',
          '<%= config.bower %>/bootstrap/js/modal.js',
          '<%= config.bower %>/bootstrap/js/tooltip.js',
          '<%= config.bower %>/bootstrap/js/popover.js',
          '<%= config.bower %>/bootstrap/js/scrollspy.js',
          '<%= config.bower %>/bootstrap/js/tab.js',
          '<%= config.bower %>/bootstrap/js/affix.js'
        ],
        dest: '<%= config.dist %>/js/bootstrap.js'
      }
    },

    uglify: {
  	  dist: {
  	    files: {
  	    //  '<%= config.dist %>/js/main.min.js': ['<%= config.dist %>/js/main.js']
  	    }
  	  },
  	  bootstrap: {
          src: ['<%= concat.bootstrap.dest %>'],
          dest: '<%= config.dist %>/js/bootstrap.min.js'
        }
  	},

  	jshint: {
  	  // define the files to lint
  	  files: ['Gruntfile.js', '<%= config.dist %>/js/*.js'],
  	  // configure JSHint (documented at http://www.jshint.com/docs/)
  	  options: {
  	      // more options here if you want to override JSHint defaults
  	    globals: {
  	      jQuery: true,
  	      console: true,
  	      module: true
  	    }
  	  }
  	},

    less: {
      bootstrapCore: {
        files: {
          '<%= config.dist %>/css/bootstrap.css': '<%= config.bower %>/bootstrap/less/bootstrap.less'
        }
      },
      bootstrapTheme: {
        files: {
          '<%= config.dist %>/css/bootstrap-theme.css': '<%= config.bower %>/bootstrap/less/theme.less'
        }
      },
      dist: {
        files: {
          //src: ['<%= config.dist %>/css/*.less'],
          //dest: '<%= config.dist %>/css/main.css'
        }
      }
    },

    cssmin: {
      options: {
        compatibility: 'ie8',
        noAdvanced: true
      },
      bootstrap: {
        files: {
          '<%= config.dist %>/css/bootstrap.min.css': '<%= config.dist %>/css/bootstrap.css',
          '<%= config.dist %>/css/bootstrap-theme.min.css': '<%= config.dist %>/css/bootstrap-theme.css'
        }
      },
      dist: {
        files : {
         // '<%= config.dist %>/css/main.min.css': '<%= config.dist %>/css/main.css'
        }
      }
    },

    watch: {
      less: { 
      	files: ['<%= config.bower %>/bootstrap/less/*.less','<%= config.dist %>/css/*.less'],
      	tasks: ['less'],
      	options: {
  	      livereload: true 
  	    }
      }
    },

    prettify: {
      options: {
        indent: 2,
        indent_char: ' ',
        wrap_line_length: 78,
        brace_style: 'expand',
        unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']
      },
      all: {
        expand: true,
        cwd: 'app/views/',
        ext: '.html.twig',
        src: ['*.html.twig', '!base.html.twig', '!baseAdmin.html.twig'],
        dest: 'app/views/'
      }
    },

    shell: {
        makeDir: {
            command: 'ls'
        }
    }


  });

  grunt.registerTask('cmd', ['shell:makeDir']);

  grunt.registerTask('html', ['prettify']);
  // this would be run by typing "grunt test" on the command line
  grunt.registerTask('test', ['jshint']);
  // the default task can be run just by typing "grunt" on the command line
  grunt.registerTask('default', ['concat','uglify','less','cssmin']);

};