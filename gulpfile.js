var gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    del = require('del'),
    runSequence = require('run-sequence');

var uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass');
    // autoprefixer = require('gulp-autoprefixer');

// Clean task
gulp.task('clean', function() {
  return del(['dist']);
});

// Browserify task
gulp.task('browserify', function (cb) {
  // Single entry point to browserify 
  return gulp.src('app/components/app.js')
    .pipe(browserify({
      insertGlobals: true,
      debug: true
    }))
    // Bundle to a single file
    .pipe(concat('bundle.js'))
    // Output it to our dist folder
    .pipe(gulp.dest('dist/js'));
});

// Styles task
gulp.task('styles', function() {

  //   // To use Sass uncomment below scss processing code and comment the basic css copying
  // return gulp.src('app/styles/*.scss')
  //     // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
  //   .pipe(sass({onError: function(e) { console.log(e); } }))
  //   .pipe(gulp.dest('dist/css/'));

    // Copy css files (styles) in dist/css if not using sass
  return gulp.src('app/styles/*.css')
      // Output it to our dist folder
    .pipe(gulp.dest('dist/css/'));

});

// Views task
gulp.task('views', function() {
    // Copy all the html views in the respective components
  return gulp.src(['app/*.html', 'app/**/*.html', 'app/**/**/*.html'])
    // Output it to our dist folder
    .pipe(gulp.dest('dist/'));
});

// Copy all images to dist
gulp.task('images', function() {
  return gulp.src('app/images/*.*')
    // Output it to our dist folder
    .pipe(gulp.dest('dist/images/'));
});

// Copy all fonts to dist
gulp.task('fonts', function() {
  return gulp.src('app/fonts/*.*')
    .pipe(gulp.dest('dist/fonts/'));
});

  // Copy all external scripts in dist/js
gulp.task('scripts', function () {
  return gulp.src('app/js/*.js')
    // Output it to our dist folder
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('default', ['clean'], function(cb) {
  runSequence(['images', 'fonts', 'styles', 'scripts', 'views', 'browserify'], cb);

    // Start server at port 4000
  connect.server({
    root: 'dist',
    port: 4000,
    fallback: 'dist/index.html'
  });

  gulp.watch(['app/components/*.js', 'app/components/**/*.js'], ['browserify']);

  gulp.watch(['app/styles/*.css'],['styles']);
  // gulp.watch(['app/styles/*.scss', 'app/styles/**/*.scss'], ['styles']);

  gulp.watch(['app/index.html', 'app/components/*.html', 'app/components/**/*.html'], ['views']);
});


//---------------------------
// Tasks for Production build
//---------------------------

gulp.task('cleanProd', function() {
  return del(['prod']);
});

gulp.task('browserifyProd', ['cleanProd'], function (cb) {
  return gulp.src('app/components/app.js')
    .pipe(browserify({
      insertGlobals: true,
      debug: false
    }))
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('prod/js'));
});

gulp.task('stylesProd', ['cleanProd'], function() {
  return gulp.src('app/styles/*.scss')
    .pipe(sass({onError: function(e) { console.log(e); } }))
    .pipe(cleanCSS({ compatibility: 'ie8',debug: false }))
    .pipe(gulp.dest('prod/css/'));
  
  // return gulp.src('app/styles/*.css')
  //   .pipe(cleanCSS({ compatibility: 'ie8',debug: false }))
  //   .pipe(rename({ suffix: '.min' }))
  //   .pipe(gulp.dest('prod/css/'));
});

gulp.task('viewsProd', ['cleanProd'], function() {
  return gulp.src(['app/**/*.html', 'app/**/**/*.html'])
    .pipe(gulp.dest('prod/'));
});

gulp.task('imagesProd', function() {
  return gulp.src('app/images/*.*')
    .pipe(gulp.dest('prod/images/'));
});

gulp.task('fontsProd', function() {
  return gulp.src('app/fonts/*.*')
    .pipe(gulp.dest('prod/fonts/'));
});

gulp.task('scriptsProd', ['cleanProd'], function () {
  return gulp.src('app/js/*.js')
    .pipe(gulp.dest('prod/js/'));
});

gulp.task('build', ['cleanProd', 'imagesProd', 'fontsProd', 'viewsProd', 'stylesProd', 'browserifyProd', 'scriptsProd']);
