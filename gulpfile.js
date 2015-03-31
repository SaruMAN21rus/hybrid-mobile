'use strict';

var gulp = require('gulp');

/**** Gulp Plug-ins **********************************************************************/

var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');
var changed = require('gulp-changed');
var fileinclude = require('gulp-file-include');
var useref = require('gulp-useref');
var watch = require('gulp-watch');
var jsonminify = require('gulp-jsonminify');
var rename = require("gulp-rename");
var htmlhint = require("gulp-htmlhint");
var csslint = require('gulp-csslint');
var jshint = require('gulp-jshint');
var useref = require('gulp-useref');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var filter = require('gulp-filter');
var csso = require('gulp-csso');
var cleanhtml = require('gulp-cleanhtml');
var uglify = require('gulp-uglify');
var size = require('gulp-filesize');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var jscs = require('gulp-jscs')

/**** Dev Tasks **************************************************************************/

gulp.task('cleanDev', function() {
    return gulp.src(['./wwwDev/*','!./wwwDev/bower_components'], {read: false})
        .pipe(clean());
});

gulp.task('runDevTasks', function(){
    var htmlFilter = filter('index.html');
    return gulp.src(['./src/**/*.*'], { base: './src' })
        .pipe(htmlFilter)
        .pipe(fileinclude())
        .pipe(htmlFilter.restore())
        .pipe(gulp.dest('wwwDev'));
});

gulp.task('validatejsHintRc', function () {
    gulp.src('./.jshintrcCommented.txt')
        .pipe(jsonminify())
        .pipe(rename('.jshintrc'))
        .pipe(gulp.dest('./'));
});

/**** Production Tasks *************************************************************************/

gulp.task('cleanProd', function() {
    return gulp.src(['./www/*'], {read: false})
        .pipe(clean());
});

gulp.task('buildFromDev', function () {
    var assets = useref.assets();
    return gulp.src(['./wwwDev/**/*.html',
        '!./wwwDev/bower_components/**/*.*',
        '!./wwwDev/shared/**/*.*',
        '!./wwwDev/ui/**/*.*'])
        .pipe(assets)
        .pipe(rev())
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(revReplace())  
        .pipe(gulp.dest('./www'));
});

gulp.task('moveKendoImages', function(){
    return gulp.src(['./wwwDev/bower_components/kendo-ui/styles/images/**/*.*'])
        .pipe(gulp.dest('./www/thirdparty/images'));
});

gulp.task('moveKendoFlatTheme', function(){
    return gulp.src(['./wwwDev/bower_components/kendo-ui/styles/Flat/**/*.*'])
        .pipe(gulp.dest('./www/thirdparty/Flat'));
});

gulp.task('moveJayDataProviders', function(){
    return gulp.src(['./wwwDev/bower_components/jaydata/build/jaydataproviders/*.*'])
        .pipe(gulp.dest('./www/jaydataproviders'));
});

//gulp.task('moveBootstrapCSSStuff', function(){
//    gulp.src(['./wwwDev/bower_components/bootstrap/dist/fonts/**/*.*'])
//        .pipe(gulp.dest('./www/fonts'));
//    return gulp.src(['./wwwDev/bower_components/bootstrap/dist/css/bootstrap.css.map'])
//        .pipe(gulp.dest('./www/thirdparty/'));
//});

gulp.task('cssLint', function() {
    return gulp.src('./src/**/*.css')
        .pipe(csslint('./.csslintrc'))
        .pipe(csslint.reporter());
});

gulp.task('htmlHint', function () {
     return gulp.src(['./src/**/*.html'])
        .pipe(htmlhint({htmlhintrc:'./.htmlhintrc'}))
        .pipe(htmlhint.reporter());
});

gulp.task('jsHint', function() {
     return gulp.src(['./src/**/*.js',
        '!./src/js/**/*.js',])
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

//minify html
gulp.task('minifyHtml', function(){
     return gulp.src(['./www/index.html'])
        .pipe(cleanhtml())
        .pipe(gulp.dest('./www'));
});

gulp.task('minifyCss', function() {
     return gulp.src(['./www/**/*.css'])
        .pipe(csso())
        .pipe(gulp.dest('./www'));
});

gulp.task('minifyJs', function() {
     return gulp.src(['./www/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./www'));
});

gulp.task('reportSize', function() {
     return gulp.src(['./www/**/*.js','./www/**/*.css'])
        .pipe(size());
});

gulp.task('moveAppImages', function(){
    return gulp.src(['./src/ui/menu/menuPage/img/**/*.*'])
        .pipe(gulp.dest('./www/img'));
});

/**** Servers ****************************************************************************/

//dev sever
gulp.task('startDevServer', function() {
    return gulp.src( 'wwwDev')
        .pipe(webserver({
            host:'0.0.0.0',
            port:'3027',
            livereload:true,
            directoryListing: false,
            open: 'http://localhost:3027'
        }));
});

//production server
gulp.task('startProductionServer', function() {
    return gulp.src( 'www')
        .pipe(webserver({
            host:'0.0.0.0',
            port:'3028',
            livereload:false,
            directoryListing: false,
            open: 'http://localhost:3028'
        }));
});

//watch src, reload browser serving dev
gulp.task('watchDevServer', function(){
    gulp.watch(['src/**/*.*'],['runDevTasks']);
    return gulp.watch(['./.jshintrcCommented.txt'],['validatejsHintRc','runDevTasks']);
});

/**** Tasks ********************************************************************************/

gulp.task('dev', function(callback) {
    runSequence('cleanDev','runDevTasks','startDevServer','watchDevServer', callback);
    return false;
});

gulp.task('prod', function(callback) {
    runSequence('cleanProd','buildFromDev','cssLint','htmlHint','jsHint','minifyHtml','minifyCss',/*'minifyJs',*/'moveKendoImages','moveKendoFlatTheme','moveAppImages','moveJayDataProviders',/*'moveBootstrapCSSStuff',*/'reportSize',/*'startProductionServer',*/ callback);
    return false;
});
