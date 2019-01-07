var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var jquery = require('gulp-jquery');
var minify_css = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
// database ==============================================================
var data = {
    js:{ src:'./src/js/*.js', dist:'./js', new_name:'main.js' },
    css:{ src:'./src/css/*.css', dist:'./css', dist:'main.css' },
    img:{ src:'./src/img/*', dist:'./img' },
    jquery:{ new_name:'jquery.js' }
}
// exec all tasks ========================================================
gulp.task('minifyall', gulp.series('css', 'jquery', 'scripts', 'img') );
// tasks =================================================================
gulp.task('scripts', function(){
    return gulp.src(data.js.src)
    .pipe( plumber() ).pipe( uglify() )
    .pipe( concat(data.js.new_name) ).pipe( gulp.dest(data.js.dist) );
});
gulp.task('css', function(){
    return gulp.src(data.css.src)
    .pipe( minify_css({keepSpecialComments: 1}) )
    .pipe( concat(data.css.new_name) ).pipe( gulp.dest(data.css.dist) );
});
gulp.task('img', function(){
    return gulp.src(data.img.src)
    .pipe( imagemin({progressive: true}) )
    .pipe( gulp.dest(data.img.dist) );
});
gulp.task('jquery', function () {
    return jquery.src({ release:2, flags:['-deprecated'] })
    .pipe( plumber() ).pipe( uglify() )
    .pipe( concat(data.jquery.new_name) ).pipe( gulp.dest(data.js.dist) );
});