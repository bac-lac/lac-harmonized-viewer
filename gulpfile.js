const path = require('path');
const gulp = { src, dest, series, parallel } = require('gulp');

const sass = require('gulp-sass');

const postcss = require('gulp-postcss');
const postcssModules = require('postcss-modules');

const declare = require('gulp-declare');
const wrap = require('gulp-wrap');

const ts = require('gulp-typescript');

const webpack = require('webpack-stream');

gulp.typescript = ts.createProject('tsconfig.json');
gulp.concat = require('gulp-concat');
gulp.uglify = require('gulp-uglify');
gulp.clean = require('gulp-clean');
gulp.rename = require('gulp-rename');
gulp.cleanCSS = require('gulp-clean-css');
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

// function compileLocales() {
//     return src('src/locales/**/*.json')
//         .pipe(gulp.jsoncombine('harmonized-viewer.locales.js', function (data) {
//             var locales = new Array();
//             for (var key in data) {
//                 var item = {};
//                 item.code = key;
//                 if (item.code.indexOf('\\') > -1) {
//                     item.code = item.code.substring(0, key.indexOf('\\')).toLowerCase();
//                 }
//                 item.strings = data[key];
//                 locales.push(item);
//             }
//             return Buffer.from("harmonizedviewer_locales = " + JSON.stringify(locales) + ";");
//         }))
//         .pipe(dest('tmp/js'))
//         .pipe(gulp.print());
// };

// function compileTemplates() {
//     return src('src/templates/*.handlebars')
//         .pipe(gulp.handlebars())
//         .pipe(gulp.wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
//             imports: {
//                 processPartialName: function (fileName) {
//                     // Strip the extension and the underscore
//                     // Escape the output with JSON.stringify
//                     return JSON.stringify(path.basename(fileName, '.js'));
//                 }
//             }
//         }))
//         .pipe(gulp.concat('harmonized-viewer.partials.js'))
//         .pipe(dest('tmp/js'))
//         .pipe(gulp.print());
// };

function concatJS() {
    return src([
        'dist/**/*.js',
        '!dist/**/*.min.js'
    ])
        .pipe(gulp.concat('all.js'))
        .pipe(dest('dist'))
        .pipe(gulp.print());
};

function compileTS() {
    return src('src/**/*.ts')
        .pipe(gulp.typescript())
        .pipe(dest('tmp'))
        .pipe(gulp.print());
};

function minifyJS() {
    return src([
        'tmp/**/*.js',
        '!tmp/**/*.min.js'
    ])
        .pipe(gulp.rename({ extname: '.min.js' }))
        .pipe(gulp.uglify())
        .pipe(dest('tmp'))
        .pipe(gulp.print());
};

function bundleJS() {
    return src([
        'tmp/index.js'
    ])
        .pipe(webpack(require('./webpack.config.js')))
        //.pipe(gulp.bro())
        //.pipe(gulp.uglify())
        //.pipe(gulp.rename('all.bundle.js'))
        .pipe(dest('dist'))
        .pipe(gulp.print());
};

function compileSass() {
    return src([
        'src/sass/**/*.scss',
        'node_modules/@material/button/_mixins.scss',
        'node_modules/@material/button/mdc-button.scss'
    ])
        .pipe(sass().on('error', sass.logError))
        // .pipe(postcss([
        //     postcssModules({
        //         generateScopedName: 'hv-[local]__[hash:base64:5]'
        //     })
        // ]))
        .pipe(dest('dist'));
};

function compileHandlebars() {
    return src('src/**/*.hbs')
        .pipe(gulp.handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'MyApp.templates',
            noRedeclare: true, // Avoid duplicate declarations
        }))
        .pipe(gulp.concat('component.js'))
        .pipe(dest('dist'));
};

// function minifyCSS() {
//     return src([
//         'dist/css/**/*.css',
//         '!dist/css/**/*.min.css'
//     ])
//         .pipe(gulp.rename({ extname: '.min.css' }))
//         .pipe(gulp.cleanCSS())
//         .pipe(dest('dist/css'));
// };

// function bundleCSS() {
//     return src([
//         'dist/js/**/*.min.css'
//     ])
//         .pipe(gulp.concat('harmonized-viewer.bundle.css'))
//         .pipe(gulp.cleanCSS())
//         .pipe(dest('dist/css'));
// };

// function copySemantic() {
//     return src([
//         'vendor/semantic/dist/**/*',
//     ])
//         .pipe(gulp.changed('dist/vendor/semantic'))
//         .pipe(dest('dist/vendor/semantic'));
// };

function watchSass() {
    gulp.watch('src/saas/**/*.scss', buildCSS);
};

function watchTS() {
    gulp.watch('src/**/*.ts', buildJS);
};

// Gulp Tasks
// Define which tasks can run in parallel and which tasks must run one after the other.

const buildCSS = gulp.series(compileSass);
const buildJS = gulp.series(compileTS, minifyJS, bundleJS);

//const build = gulp.series(cleanDist, buildJS, buildCSS, cleanTemp);
const build = gulp.series(cleanDist, buildJS, cleanTemp);
const watch = gulp.parallel(watchSass, watchTS);

gulp.task('default', build);
gulp.task('build-css', buildCSS);
gulp.task('build-js', gulp.series(cleanTemp, cleanDist, buildJS));
//gulp.task('build-locales', compileLocales);
//gulp.task('build-templates', compileTemplates);
gulp.task('watch', watch);