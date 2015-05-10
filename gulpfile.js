var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var templateCache = require('gulp-angular-templatecache');
var tap = require('gulp-tap');

var paths = {
  templatecache: ['./www/templates/**/*.html'],
  sass: ['./scss/**/*.scss'],
  css: ['./www/css/*.css'],
  js: [
    "./www/lib/ionic/js/ionic.bundle.min.js",
    "./www/lib/ionic/js/angular/angular-resource.min.js",
    './www/js/*.js'
  ]
};

gulp.task('default', ['templatecache', 'css', 'js']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('templatecache', function (done) {
  gulp.src('./www/templates/**/*.html')
    .pipe(templateCache({standalone:true}))
    .pipe(gulp.dest('./www/js'))
    .on('end', done);
});

gulp.task('css', function(done) {
  var source = [
    "./www/lib/ionic/css/ionic.css",
    "./www/css/*.css",
    '!./www/css/source.min.css'
  ];

  gulp.src(source).pipe(tap(function (file,t) {
    console.log(file.path);
  }))

  .pipe(concat('source.min.css'))
  .pipe(minifyCss({
    keepSpecialComments: 0
  }))
  .pipe(gulp.dest('./www/css/'))
  .on('end', done);
});

gulp.task('js', function(done) {
  var source = paths.js;

  console.log(source)
  gulp.src(paths.js).pipe(tap(function (file,t) {
    console.log(file.path);
  }))

  .pipe(concat('source.js'))
  .pipe(gulp.dest('./www/js/min/'))
  .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.templatecache, ['templatecache']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.js, ['js']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
