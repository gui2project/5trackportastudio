
//  includes
var argv        = require('yargs').argv;

// include gulp
var gulp        = require('gulp');

// include gulp plug-ins
var jshint      = require('gulp-jshint');
var jsonlint    = require("gulp-jsonlint");
var csslint     = require('gulp-csslint');
var puglint     = require('gulp-pug-lint');
var rm          = require('gulp-rm');
var fail        = require('gulp-fail');
var gulpIf      = require('gulp-if');
var git         = require('gulp-git');

//  Variables
var projectFiles = {
    css: ['./www/app/css/*.cs'] ,
    jade: ['./server/mvc/views/*.jade'],
    js: [
        './ini/*.js',
        './server/*.js',
        './www/app/*.js',
        './app.js'
   ],
   json: ['./server/mvc/models/*.json']
};

var message     = argv.m ? argv.m : 'I was lazy and didnt give Gulp a commit message.';
//  CODE LINTERS

//  Javascript
gulp.task('lint-js', function() {
    gulp.src(projectFiles.js)
        .pipe(jshint())
        .pipe(jshint.reporter('fail'))});

//  Json
gulp.task('lint-json', function() {
    gulp.src(projectFiles.json)
        .pipe(jsonlint())
        .pipe(jsonlint.reporter('fail'))});

//  CSS
gulp.task('lint-css', function() {
    gulp.src(projectFiles.css)
        .pipe(csslint())
        .pipe(csslint.reporter('fail'))});

//  Jade/ Pug
gulp.task('lint-jade', function() {
    gulp.src(projectFiles.jade)
        .pipe(puglint())});


//  GIT
gulp.task( 'rm-gitlock', function() {
  return gulp.src( '/.git/index.lock', { read: false })
    .pipe(rm())
})

//  Run git add with options
gulp.task('git-add', function(){
    gulp.src('./')
        .pipe(git.add({args: '-A'}))});

//  Run git commit with options
gulp.task('git-commit', function(){
    gulp.src('./')
        .pipe(git.commit(message))});

//  Push to master
gulp.task('git-push-master', function(){
    git.push('origin', 'master',
        function (err) {
            if (err) throw err;})});

//  Push to heroku
gulp.task('git-push-heroku', function(){
    git.push('origin', 'master:heroku',
        function (err) {
            if (err) throw err; })});

//  Run git pull
gulp.task('git-pull', function(){
    git.pull('origin', 'master',
        function (err) {
            if (err) throw err; })});


//  ROUTINES

//  Syntax testing
gulp.task( 'test-lint', ['lint-js', 'lint-json', 'lint-css', 'lint-jade']);

//  Git updates
gulp.task( 'git-error', ['rm-gitlock']);
gulp.task( 'git-master', ['test-lint', 'git-error', 'git-add', 'git-commit', 'git-pull', 'git-push-master']);
gulp.task( 'git-heroku', ['git-master', 'git-push-heroku']);
