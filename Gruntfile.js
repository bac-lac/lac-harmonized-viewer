module.exports = function (grunt) {

	const sass = require('node-sass');

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("package.json"),

		copy: {
			dist: {
				files: [
					// {
					// 	src: 'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
					// 	dest: 'public/vendors/bootstrap/bootstrap.js'
					// },
					{
						src: 'node_modules/openseadragon/build/openseadragon/openseadragon.js',
						dest: 'public/vendors/openseadragon/openseadragon.js'
					},
					{
						src: 'node_modules/manifesto.js/dist/client/manifesto.bundle.js',
						dest: 'public/vendors/manifesto/manifesto.js'
					},
					{
						expand: true,
						cwd: 'src/assets',
						src: '*',
						dest: 'dist/assets/'
					}
				]
			}
		},

		// Concat definitions
		concat: {
			dist: {
				src: ['src/**/*.js', 'public/vendors/**/*.js'],
				dest: "dist/archives-viewer.js"
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
				src: ["dist/archives-viewer.js"],
				dest: "dist/archives-viewer.min.js"
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
						'dist/archives-viewer.css': 'src/scss/main.scss'
					},
					{
						'dist/archives-viewer-theme.css': 'src/scss/theme.scss'
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

		// Clean temp folder
		clean: {
			public: {
				src: ['public']
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
	grunt.registerTask("build", ["clean:dist", "copy", "concat", "sass", "uglify", "cssmin", "clean:public"]);
	grunt.registerTask("default", ["build"]);
};
