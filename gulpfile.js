var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var jquery = require('gulp-jquery');
var minify_css = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');

// source path
var js_src = './src/js/*.js';
var css_src = './src/css/*.css';
var img_src = './src/img/*';

// dist path
var js_dist = './js';
var css_dist = './css';
var img_dist = './img/';

var js_dist_name = 'main.js';
var js_dist_jquery_name = 'jquery.js';
var css_dist_name = 'main.css';

// minify and concat scripts
gulp.task('scripts', function(){
    return gulp.src(js_src)
        .pipe(plumber())
        .pipe(uglify())
        .pipe(concat(js_dist_name))
        .pipe(gulp.dest(js_dist));
});
gulp.task('css', function(){
    return gulp.src(css_src)
        .pipe(minify_css({keepSpecialComments: 1}))
        .pipe(concat(css_dist_name))
        .pipe(gulp.dest(css_dist));
});
gulp.task('img', function(){
    return gulp.src(img_src)
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest(img_dist));
});
gulp.task('jquery', function () {
    return jquery.src({
        release: 2, //jQuery 2
        flags: ['-deprecated']
    })
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat(js_dist_jquery_name))
    .pipe(gulp.dest(js_dist));
});

// executa todas as tasks
gulp.task('minifyall', gulp.series('css', 'jquery', 'scripts', 'img') );