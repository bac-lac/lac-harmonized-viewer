const gulp = { src, dest, series, parallel } = require('gulp');

const less = require('gulp-less');
gulp.concat = require('gulp-concat');
gulp.uglify = require('gulp-uglify');
gulp.clean = require('gulp-clean');
gulp.rename = require('gulp-rename');
gulp.cleanCSS = require('gulp-clean-css');

function cleanDist() {
    return src('dist', { allowEmpty: true, read: false })
        .pipe(gulp.clean({ force: true }));
};

function cleanTemp() {
    return src('tmp', { allowEmpty: true, read: false })
        .pipe(gulp.clean({ force: true }));
};

/**
 * @name compileLess
 * @description Compile LESS source files to unminified CSS stylesheets
 */
function compileLess() {
    return src(['src/less/**/*.less', '!src/less/_variables.less'])
        .pipe(less())
        .pipe(dest('dist'));
};

function minifyCSS() {
    return src(['dist/**/*.css', '!dist/**/*.min.css'])
        .pipe(gulp.rename({ extname: '.min.css' }))
        .pipe(gulp.cleanCSS())
        .pipe(dest('dist'));
};

function compileJS() {
    return src('src/**/*.js')
        .pipe(gulp.concat('harmonized-viewer.js'))
        .pipe(dest('dist'));
};

function minifyJS() {
    return src(['dist/**/*.js', '!dist/**/*.min.js'])
        .pipe(gulp.rename({ extname: '.min.js' }))
        .pipe(gulp.uglify())
        .pipe(dest('dist'));
};

function bundleCSS() {
    return src([
        'dist/harmonized-viewer.css',
        'vendor/semantic/dist/semantic.css'
    ])
        .pipe(gulp.concat('harmonized-viewer.bundle.css'))
        .pipe(gulp.cleanCSS())
        .pipe(dest('dist'));
};

function bundleJS() {
    return src([
        'dist/harmonized-viewer.js',
        'node_modules/openseadragon/build/openseadragon/openseadragon.js',
        'node_modules/manifesto.js/dist/client/manifesto.bundle.js',
        'vendor/semantic/dist/semantic.js'
    ])
        .pipe(gulp.concat('harmonized-viewer.bundle.js'))
        .pipe(gulp.uglify())
        .pipe(dest('dist'));
};

function copyThemes() {
    return src('vendor/semantic/dist/**/*')
        .pipe(dest('dist/lib/semantic'));
};

const buildCSS = gulp.series(compileLess, minifyCSS, bundleCSS);
const buildJS = gulp.series(compileJS, minifyJS, bundleJS);

const build = gulp.series(cleanDist, gulp.parallel(buildCSS, buildJS, copyThemes), cleanTemp);

function watchLess() {
    gulp.watch('src/**/*.less', gulp.series(compileLess, minifyCSS));
};
function watchJS() {
    gulp.watch('src/**/*.js', build);
};

const watch = gulp.parallel(watchLess, watchJS);

exports.watch = watch;
exports.default = build;