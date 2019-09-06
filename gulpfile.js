const path = require('path');
const gulp = { src, dest, series, parallel } = require('gulp');

const sass = require('gulp-sass');

const postcss = require('gulp-postcss');
const postcssModules = require('postcss-modules');

gulp.concat = require('gulp-concat');
gulp.uglify = require('gulp-uglify');
gulp.clean = require('gulp-clean');
gulp.rename = require('gulp-rename');
gulp.cleanCSS = require('gulp-clean-css');
gulp.wrap = require('gulp-wrap');
gulp.handlebars = require('gulp-handlebars');
gulp.jsoncombine = require('gulp-jsoncombine');
gulp.bro = require('gulp-bro');
gulp.print = require('gulp-print').default;
gulp.changed = require('gulp-changed');

function cleanDist() {
    return src('dist', { allowEmpty: true, read: false })
        .pipe(gulp.clean({ force: true }));
};

function cleanTemp() {
    return src('tmp', { allowEmpty: true, read: false })
        .pipe(gulp.clean({ force: true }));
};

function compileLocales() {
    return src('src/locales/**/*.json')
        .pipe(gulp.jsoncombine('harmonized-viewer.locales.js', function (data) {
            var locales = new Array();
            for (var key in data) {
                var item = {};
                item.code = key;
                if (item.code.indexOf('\\') > -1) {
                    item.code = item.code.substring(0, key.indexOf('\\')).toLowerCase();
                }
                item.strings = data[key];
                locales.push(item);
            }
            return Buffer.from("harmonizedviewer_locales = " + JSON.stringify(locales) + ";");
        }))
        .pipe(dest('tmp/js'))
        .pipe(gulp.print());
};

function compileTemplates() {
    return src('src/templates/*.handlebars')
        .pipe(gulp.handlebars())
        .pipe(gulp.wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
            imports: {
                processPartialName: function (fileName) {
                    // Strip the extension and the underscore
                    // Escape the output with JSON.stringify
                    return JSON.stringify(path.basename(fileName, '.js'));
                }
            }
        }))
        .pipe(gulp.concat('harmonized-viewer.partials.js'))
        .pipe(dest('tmp/js'))
        .pipe(gulp.print());
};

function compileJS() {
    return src('src/**/*.js')
        .pipe(gulp.concat('harmonized-viewer.js'))
        .pipe(dest('tmp/js'))
        .pipe(gulp.print());
};

function concatJS() {
    return src([
        'tmp/js/**/*.js'
    ])
        .pipe(gulp.concat('harmonized-viewer.js'))
        .pipe(dest('dist/js'))
        .pipe(gulp.print());
};

function minifyJS() {
    return src([
        'dist/js/**/*.js',
        '!dist/js/**/*.min.js'
    ])
        .pipe(gulp.rename({ extname: '.min.js' }))
        .pipe(gulp.uglify())
        .pipe(dest('dist/js'))
        .pipe(gulp.print());
};

function bundleJS() {
    return src([
        'dist/js/**/*.min.js',
        'dist/vendor/**/*.min.js'
    ])
        .pipe(gulp.bro())
        .pipe(gulp.uglify())
        .pipe(gulp.rename('harmonized-viewer.bundle.js'))
        .pipe(dest('dist/js'))
        .pipe(gulp.print());
};

function compileSass() {
    return src([
        'src/sass/**/*.scss',
        '!src/sass/_variables.scss'
    ])
        .pipe(sass().on('error', sass.logError))
        // .pipe(postcss([
        //     postcssModules({
        //         generateScopedName: 'hv-[local]__[hash:base64:5]'
        //     })
        // ]))
        .pipe(dest('dist/css'));
};

function minifyCSS() {
    return src([
        'dist/css/**/*.css',
        '!dist/css/**/*.min.css'
    ])
        .pipe(gulp.rename({ extname: '.min.css' }))
        .pipe(gulp.cleanCSS())
        .pipe(dest('dist/css'));
};

function bundleCSS() {
    return src([
        'dist/js/**/*.min.css',
        'dist/vendor/**/*.min.css'
    ])
        .pipe(gulp.concat('harmonized-viewer.bundle.css'))
        .pipe(gulp.cleanCSS())
        .pipe(dest('dist/css'));
};

// function copySemantic() {
//     return src([
//         'vendor/semantic/dist/**/*',
//     ])
//         .pipe(gulp.changed('dist/vendor/semantic'))
//         .pipe(dest('dist/vendor/semantic'));
// };

function watchSass() {
    gulp.watch('src/**/*.scss', buildCSS);
};

function watchJS() {
    gulp.watch('src/**/*.js', buildJS);
};

function watchTemplates() {
    gulp.watch('src/**/*.handlebars', gulp.series(compileTemplates));
};

// Gulp Tasks
// Define which tasks can run in parallel and which tasks must run one after the other.

const buildCSS = gulp.series(compileSass, minifyCSS, bundleCSS);
const buildJS = gulp.series(compileJS, compileLocales, concatJS, minifyJS, bundleJS);

const build = gulp.series(cleanDist, gulp.parallel(buildCSS, buildJS), cleanTemp);
const watch = gulp.parallel(watchSass, watchJS);

gulp.task('default', build);
gulp.task('build-css', buildCSS);
gulp.task('build-js', gulp.series(cleanTemp, cleanDist, buildJS));
gulp.task('build-locales', compileLocales);
gulp.task('build-templates', compileTemplates);
gulp.task('watch', watch);