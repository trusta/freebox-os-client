module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        complexity: {
            generic: {
                src: ['app/**/*.js'],
                options: {
                    errorsOnly: false,
                    cyclometric: 6, // default is 3
                    halstead: 16, // default is 8
                    maintainability: 100 // default is 100
                }
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'app/**/*.js',
                'test/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        },
        mochacli: {
            all: ['test/**/*.js'],
            options: {
                reporter: 'spec',
                ui: 'tdd'
            }
        },
        watch: {
            js: {
                files: ['app/**/*.js', '!node_modules/**/*.js'],
                tasks: ['default'],
                options: {
                    nospawn: true
                }
            },
            jsTest: {
                files: ['test/**/*.js'],
                tasks: ['test'],
                options: {
                    nospawn: true
                }
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['jshint'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.registerTask('test', [
        'complexity',
        'jshint',
        'mochacli',
        'watch'
    ]);

    grunt.registerTask('ci', [
        'complexity',
        'jshint',
        'mochacli'
    ]);

    grunt.registerTask('default', ['test']);
};
