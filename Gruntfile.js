module.exports = function (grunt) {

	const sass = require('node-sass');

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("package.json"),

		copy: {
			dist: {
				files: [
					{
						//src: 'node_modules/bootstrap/dist/js/bootstrap.js',
						src: 'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
						dest: 'tmp/vendors/bootstrap.js'
					},
					{
						src: 'node_modules/openseadragon/build/openseadragon/openseadragon.js',
						dest: 'tmp/vendors/openseadragon.js'
					}
				]
			}
		},

		// Concat definitions
		concat: {
			dist: {
				src: ['src/**/*.js', 'tmp/**/*.js'],
				dest: "dist/archivescanada-viewer.js"
			}
		},

		// Lint definitions
		jshint: {
			files: ["src/main.js", "test/**/*"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		jscs: {
			src: "src/**/*.js",
			options: {
				config: ".jscsrc"
			}
		},

		// Minify JS
		uglify: {
			dist: {
				src: ["dist/archivescanada-viewer.js"],
				dest: "dist/archivescanada-viewer.min.js"
			}
		},

		// Minify CSS
		cssmin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'dist',
					src: ['*.css', '!*.min.css'],
					dest: 'dist',
					ext: '.min.css'
				}]
			}
		},

		// SASS definitions
		sass: {
			options: {
				implementation: sass,
				sourceMap: false
			},
			dist: {
				files: {
					'dist/archivescanada-viewer.css': 'src/scss/main.scss'
				}
			}
		},

		// karma test runner
		karma: {
			unit: {
				configFile: "karma.conf.js",
				background: false,
				singleRun: false,
				browsers: ["Firefox"]
			}
		},

		// Clean temp folder
		clean: {
			tmp: {
				src: ['tmp']
			},
			dist: {
				src: ['dist']
			}
		},

		// watch for changes to source
		// Better than calling grunt a million times
		// (call 'grunt watch')
		watch: {
			files: ["src/**/*", "test/**/*"],
			tasks: ["default"]
		}

	});

	grunt.loadNpmTasks("grunt-sass");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks("grunt-jscs");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-karma");

	grunt.registerTask("lint", ["jshint", "jscs"]);
	grunt.registerTask("build", ["clean:dist", "copy", "concat", "sass", "uglify", "cssmin", "clean:tmp"]);
	grunt.registerTask("default", ["jshint", "build"]);
};
