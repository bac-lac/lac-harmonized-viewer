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
						src: 'node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
						dest: 'tmp/vendors/malihu-scrollbar/malihu-scrollbar.js'
					},
					{
						src: 'node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css',
						dest: 'tmp/vendors/malihu-scrollbar/malihu-scrollbar.css'
					},
					{
						src: 'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
						dest: 'tmp/vendors/bootstrap/bootstrap.js'
					},
					{
						src: 'node_modules/openseadragon/build/openseadragon/openseadragon.js',
						dest: 'tmp/vendors/openseadragon/openseadragon.js'
					},
					{
						src: 'node_modules/manifesto.js/dist/client/manifesto.bundle.js',
						dest: 'tmp/vendors/manifesto/manifesto.js'
					}
				]
			},
			themes: {
				files: [
					{
						src: 'tmp/harmonized-viewer-theme.css',
						dest: 'dist/harmonized-viewer-theme.css'
					}
				]
			}
		},

		// Concat definitions
		concat: {
			js: {
				src: ['src/**/*.js', 'tmp/vendors/**/*.js'],
				dest: 'dist/harmonized-viewer.js'
			},
			css: {
				src: ['tmp/vendors/**/*.css'],
				dest: 'tmp/vendors/all.css'
			},
			bundle: {
				src: ['tmp/harmonized-viewer.css', 'tmp/harmonized-viewer-icons.css', 'tmp/vendors/all.css'],
				dest: 'dist/harmonized-viewer.css'
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
				src: ["dist/harmonized-viewer.js"],
				dest: "dist/harmonized-viewer.min.js"
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
				sourceMap: true
			},
			dist: {
				files: [
					{
						'tmp/harmonized-viewer.css': 'src/scss/main.scss'
					},
					{
						'tmp/harmonized-viewer-theme.css': 'src/scss/theme.scss'
					}
				]
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

		// SVG compilation
		grunticon: {
			dist: {
				files: [{
					expand: true,
					cwd: 'src/assets',
					src: ['*.svg', '*.png'],
					dest: "dist/assets"
				}],
				options: {
				}
			},
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
	grunt.loadNpmTasks('grunt-grunticon');
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks("grunt-jscs");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-karma");

	//grunt.registerTask("lint", ["jshint", "jscs"]);
	grunt.registerTask("svg", "grunticon:dist");
	grunt.registerTask("build", ["clean:dist", "copy:dist", "concat:js", "concat:css", "sass", "concat:bundle", "uglify", "copy:themes", "cssmin", "clean:tmp"]);
	grunt.registerTask("default", ["build"]);
};
