/**
 *  This file holds the gulp task scripts, it is the task runner.
 *
 *  @name   gulpfile.js
 */

//  REQUIRES

var argv = require('yargs')
    .argv;
var exec = require('child_process')
    .exec;
var combiner = require('stream-combiner2');
var formatCss = require('gulp-cssbeautify');
var formatJs = require('gulp-jsbeautify');
var formatJson = require('gulp-json-format');
var git = require('gulp-git');
var gulpIgnore = require('gulp-ignore');
var lintCss = require('gulp-csslint');
var lintJade = require('gulp-jadelint');
var lintJs = require('gulp-jshint');
var lintJson = require('gulp-jsonlint');
var mkdirp = require('mkdirp');
var path = require('path');
var runSequence = require('run-sequence');
var yaml = require('yamljs');

//  Get application root directory and system mode
var root = path.resolve(__dirname);
var mode = 'gulp';
global.app = require('./server/lib/GlobalApplication.js')(mode, root);

var ini = require(global.app.ini()); //  configuration object

//  Start Gulp with help
var gulp = require('gulp-help')(require('gulp'), ini.opt.help);
var gulpScripts = require(path.join(ini.path.lib, 'Gulp-Scripts'))();
var gulpError = require(path.join(ini.path.lib, 'Gulp-Error'))();

//  VARIABLES
var cfgMongoDB = yaml.load(ini.path.projectFiles.mongodb.cfg);

//  CODE FORMATTER TASKS

//  JavaScript
gulp.task('code.format.js', 'Formats JavaScript code.', [],
    function (cb) {
        return combiner.obj([
            gulpScripts.codeFormat(ini.path.projectFiles.js.loc,
                formatJs,
                require(ini.path.projectFiles.js.format))
        ]);
    });
//  CSS
gulp.task('code.format.css', 'Formats CSS code.', [],
    function (cb) {
        return combiner.obj([
            gulpScripts.codeFormat(ini.path.projectFiles.css.loc,
                formatCss,
                require(ini.path.projectFiles.css.format))
        ]);
    });
//  JSON
gulp.task('code.format.json', 'Formats JSON code.', [],
    function (cb) {
        return combiner.obj([
            gulpScripts.codeFormat(ini.path.projectFiles.json.loc,
                formatJson,
                4)
        ]);
    });

//  User Commands
gulp.task('code.format', 'Formats code base', ['code.format.js', 'code.format.css', 'code.format.json']);

//  CODE LINTERS TASKS

//  JavaScript
gulp.task('code.lint.js', 'Checks JavaScript syntax.', ['code.format.js'],
    function (cb) {
        return combiner.obj([
            gulpScripts.codeLint(ini.path.projectFiles.js.loc,
                lintJs,
                ini.path.projectFiles.js.linter,
                true)
        ]);
    });
//  JSON
gulp.task('code.lint.json', 'Checks JSON syntax.', ['code.format.json'],
    function (cb) {
        return combiner.obj([
            gulpScripts.codeLint(ini.path.projectFiles.json.loc,
                lintJson,
                null,
                true)
        ]);
    });
//  CSS
gulp.task('code.lint.css', 'Checks CSS syntax.', ['code.format.css'],
    function (cb) {
        return combiner.obj([
            gulpScripts.codeLint(ini.path.projectFiles.css.loc,
                lintCss,
                ini.path.projectFiles.css.linter,
                true)
        ]);
    });
//  Jade/ Pug
gulp.task('code.lint.jade', 'Checks jade/pug syntax.', [],
    function (cb) {
        return combiner.obj([
            gulpScripts.codeLint(ini.path.projectFiles.jade.loc,
                lintJade,
                ini.path.projectFiles.jade.linter,
                false)
        ]);
    });
//  User Commands
gulp.task('code.lint', 'Performs all syntax tests', ['code.lint.js', 'code.lint.json', 'code.lint.css', 'code.lint.jade']);

//  DOCUMENTATION TASKS

//  Javascript documentation
gulp.task('code.doc.js', false, ['code.doc.clean.js', 'code.lint.js', 'code.format.js'],
    function (cb) {
        return combiner.obj([
            gulp.src(ini.path.projectFiles.js.loc),
            gulpIgnore.exclude('./gulpfile.js'),
            //  make ./doc/documentation-js.md
            gulpScripts.genSingleMarkdox({
                template: path.join(ini.path.ejs, 'template.md.js.ejs')
            }, './doc/', 'documentation-js.md', null),
            //  make ./doc/documentation-js-head.md
            gulpScripts.genSingleMarkdox({
                template: path.join(ini.path.ejs, 'template.md.js.head.ejs')
            }, './doc/', 'documentation-js-head.md', false)
        ]);
    });

//  Get help output
gulp.task('code.doc.gulp', false, ['code.doc.clean.gulp', 'code.lint.js', 'code.format.js'],
    function (cb) {
        return combiner.obj([
            gulp.src('./gulpfile.js'),
            //  make ./doc/documentation-gulp-head.md
            gulpScripts.genSingleMarkdox({
                template: path.join(ini.path.ejs, 'template.md.gulp.head.ejs')
            }, './doc/', 'documentation-gulp-head.md', false),
            //  make ./doc/documentation-gulp-out.md
            gulpScripts.outputToExample('gulp', {
                filters: [
                    /^\[/
                ]
            }, './doc/', 'documentation-gulp-out.md'),
            //  make ./doc/documentation-gulp.md
            gulpScripts.genSingleMarkdox({
                template: path.join(ini.path.ejs, 'template.md.js.ejs')
            }, './doc/', 'documentation-gulp.md', null)
        ]);
    });
//  Get help output
gulp.task('code.doc.readme', false, ['code.doc.clean.readme'],
    function (cb) {
        return combiner.obj([
            gulp.src('./gulpfile.js'),
            //  make ./doc/readme.md
            gulpScripts.genSingleMarkdox({
                template: path.join(ini.path.ejs, 'template.md.readme.ejs')
            }, './doc/', 'readme.md', false)
        ]);
    });
//  Merge into Readme
gulp.task('code.doc.merge', false, ['code.doc.js', 'code.doc.gulp', 'code.doc.readme'],
    function (cb) {
        return combiner.obj([
            //  Merge Files
            gulpScripts.mergeFiles([
                    './doc/readme.md',
                    './doc/documentation-gulp-head.md', './doc/documentation-gulp-out.md', './doc/documentation-gulp.md',
                    './doc/documentation-js-head.md', './doc/documentation-js.md'
                ],
                './doc/', 'readme.md')
        ]);
    });
//  clean generated src readme files except for Readme.md
gulp.task('code.doc.clean', false, ['code.doc.clean.readme', 'code.doc.clean.gulp', 'code.doc.clean.js']);
// Clean Gulp Readmes
gulp.task('code.doc.clean.gulp', false, [],
    function (cb) {
        return combiner.obj([
            gulpScripts.removeFiles([
                './doc/documentation-gulp-head.md', './doc/documentation-gulp-out.md', './doc/documentation-gulp.md'
            ])
        ]);
    });
// Clean Readme
gulp.task('code.doc.clean.readme', false, [],
    function (cb) {
        return combiner.obj([
            gulpScripts.removeFiles([
                './doc/readme.md'
            ])
        ]);
    });
//  Clean JavaScript Readmes
gulp.task('code.doc.clean.js', false, [],
    function (cb) {
        return combiner.obj([
            gulpScripts.removeFiles([
                './doc/documentation-js-head.md', './doc/documentation-js.md'
            ])
        ]);
    });
//  User Commands
gulp.task('code.doc', 'Documents code base', ['code.doc.merge']);

//  GIT TASKS

//  Remove git lock file
gulp.task('git.rm.lock', false, [],
    function (cb) {
        return gulpScripts.removeFiles([
            '/.git/index.lock'
        ], ini.opt.git.lock);
    });
//  Prepare files for submission
gulp.task('git.prepare', 'Checks, formats, and documents code base', ['code.format', 'code.lint', 'code.doc'],
    function (cb) {
        return combiner.obj([
            gulpScripts.removeFiles([
                './doc/documentation-gulp-head.md', './doc/documentation-gulp-out.md', './doc/documentation-gulp.md',
                './doc/documentation-js-head.md', './doc/documentation-js.md'
            ])
        ]);
    });
//  Run git add with -A option
gulp.task('git.add', false, ['git.prepare', 'git.rm.lock'],
    function () {
        return gulp.src('./')
            .pipe(git.add(ini.opt.git.add));
    });
//  Run git commit with -m option
gulp.task('git.commit', false, ['git.add'],
    function () {
        var message = argv.m ? argv.m : 'Pushing with Gulp.';
        return gulp.src('./')
            .pipe(git.commit(message));
    },
    ini.opt.git.commit);
//  Run git pull
gulp.task('git.pull', 'Gets the latest code base from the repository.', ['git.commit'],
    function () {
        return git.pull('origin', 'master', gulpError.git);
    },
    ini.opt.git.commit);
//  Push to master
gulp.task('git.push.master', false, ['git.pull'],
    function () {
        return git.push('origin', 'master', gulpError.git);
    },
    ini.opt.git.commit);
//  Push to heroku
gulp.task('git.push.heroku', false, ['git.push.master'],
    function () {
        return git.push('origin', 'master:heroku', gulpError.git);
    },
    ini.opt.git.commit);
//  Store Credentials
gulp.task('git.cred.store', 'Tell git to store your credentials.', [],
    function (cb) {
        var cmdStr = 'git config --global credential.helper store';
        return exec(cmdStr, function (err, stdout, stderr) {
            gulpError.exec(cb, err, stdout, stderr);
        });
    });
//  User commands
gulp.task('git.master', 'Pushes code to master branch.', ['git.push.master'],
    function () {},
    ini.opt.git.commit);
gulp.task('git.heroku', 'Pushes code to `master` branch, `heroku` branch, and deploys to Heroku.', ['git.push.heroku'],
    function () {},
    ini.opt.git.commit);

//  WINDOWS SERVICES TASKS

//  Show translated configuration file to JSON
gulp.task('service.mongodb.show.config', false, [],
    function (cb) {
        console.log(cfgMongoDB);
    });
//  Create necessary directories
gulp.task('service.mongodb.create.dirs', false, [],
    function (cb) {
        var mpath = cfgMongoDB.systemLog.path.split('\\');
        mpath.pop();
        return gulp.src('./app.js')
            .pipe(mkdirp(cfgMongoDB.storage.dbPath))
            .pipe(mkdirp(mpath.join('\\')));
    });
//  Create MongoDB service
gulp.task('service.mongodb.create', false, [],
    function (cb) {
        var cmdStr = ini.path.projectFiles.mongodb.cfg + ' --config \'' +
            ini.path.projectFiles.mongodb.cfg + '\' --install';
        return exec(cmdStr, function (err, stdout, stderr) {
            gulpError.exec(cb, err, stdout, stderr);
        });
    });
//  Start MongoDB service
gulp.task('service.mongodb.start', false, [],
    function (cb) {
        var cmdStr = 'net start ' +
            cfgMongoDB.processManagement.windowsService.serviceName;
        return exec(cmdStr, function (err, stdout, stderr) {
            gulpError.exec(cb, err, stdout, stderr);
        });
    });
//  Stop MongoDB service
gulp.task('service.mongodb.stop', false, [],
    function (cb) {
        var cmdStr = 'net stop ' +
            cfgMongoDB.processManagement.windowsService.serviceName;
        return exec(cmdStr, function (err, stdout, stderr) {
            gulpError.exec(cb, err, stdout, stderr);
        });
    });
//  Remove MongoDB service
gulp.task('service.mongodb.remove', false, ['service.mongodb.stop'],
    function (cb) {
        var cmdStr = ini.path.projectFiles.mongodb.cfg + ' --config \'' +
            ini.path.projectFiles.mongodb.cfg + '\' --remove';
        return exec(cmdStr, function (err, stdout, stderr) {
            gulpError.exec(cb, err, stdout, stderr);
        });
    });
//  User Commands
gulp.task('mongodb.config', 'Shows the MongoDB configuration file in JSON.', ['service.mongodb.show.config']);
gulp.task('mongodb.create', 'Creates MongoDB service on windows and starts it.', ['service.mongodb.create'],
    function (cb) {
        runSequence('service.mongodb.start');
    });
gulp.task('mongodb.start', 'Starts MongoDB service on windows.', ['service.mongodb.start']);
gulp.task('mongodb.stop', 'Stops MongoDB service on windows.', ['service.mongodb.stop']);
gulp.task('mongodb.delete', 'Removes MongoDB service on windows.', ['service.mongodb.remove']);