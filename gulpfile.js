/*jshint node:true*/

'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var bump = require('gulp-bump');
var argv = require('yargs').argv;
var karma = require('karma').server;

gulp.task('lint', function () {
  return gulp.src(['gulpfile.js', '.jshintrc', 'src/**.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('tdd', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

gulp.task('ci-test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    browsers: ['PhantomJS'],
    singleRun: true
  }, done);
});

gulp.task('bump', function () {
  var type = argv.major ? 'major'
    : argv.minor ? 'minor'
    : 'patch';
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump({type: type}))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['lint', 'ci-test']);
