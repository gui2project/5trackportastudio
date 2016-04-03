/**
 *  This file holds the gulp task scripts, it is the task runner.
 *
 *  @name   gulpfile.js
 */

var argv = require('yargs')
    .argv;
var exec = require('child_process')
    .exec;
var combiner = require('stream-combiner2');
var format_css = require('gulp-cssbeautify');
var format_js = require('gulp-jsbeautify');
var format_json = require('gulp-json-format');
var git = require('gulp-git');
var gulpIgnore = require('gulp-ignore');
var lint_css = require('gulp-csslint');
var lint_jade = require('gulp-jadelint');
var lint_js = require('gulp-jshint');
var lint_json = require("gulp-jsonlint");
var markdox = require("gulp-markdox");
var mkdirp = require('mkdirp');
var path = require('path');
var yaml = require('yamljs');

//  Get application root directory and system mode
global.app = require('./server/lib/GlobalApplication.js')('gulp', path.resolve(__dirname));
var ini = require(global.app.ini()); //  configuration object

//  Start Gulp with help
var gulp = require('gulp-help')(require('gulp'), ini.opt.help);
var gulpScripts = require(path.join(ini.path.lib, 'Gulp-Scripts'))();
var gulpError = require(path.join(ini.path.lib, 'Gulp-Error'))();

//  VARIABLES
var cfgMongoDB = yaml.load(ini.path.projectFiles.mongodb.cfg);

//  CODE FORMATTER TASKS

//  JavaScript
gulp.task('code.format.js', "Formats JS code.", [],
    function (cb) {
        return combiner.obj([
            gulpScripts.codeFormat(ini.path.projectFiles.js.loc, format_js, require(ini.path.projectFiles.js.format))
        ]);
    });
//  CSS
gulp.task('code.format.css', "Formats CSS code.", [],
    function (cb) {
        return combiner.obj([
            gulpScripts.codeFormat(ini.path.projectFiles.css.loc, format_css, require(ini.path.projectFiles.css.format))
        ]);
    });
//  JSON
gulp.task('code.format.json', "Formats JSON code.", [],
    function (cb) {
        return combiner.obj([
            gulpScripts.codeFormat(ini.path.projectFiles.json.loc, format_json, 4)
        ]);
    });

//  User Commands
gulp.task('code.format', 'Formats code base', ['code.format.js', 'code.format.css', 'code.format.json']);

//  CODE LINTERS TASKS

//  JavaScript
gulp.task('code.lint.js', 'Checks JS syntax.', ['code.format.js'],
    function (cb) {
        return combiner.obj([
            gulpScripts.codeLint(ini.path.projectFiles.js.loc, lint_js, null, true)
        ]);
    });
//  Json
gulp.task('code.lint.json', 'Checks json syntax.', ['code.format.json'],
    function (cb) {
        return combiner.obj([
            gulpScripts.codeLint(ini.path.projectFiles.json.loc, lint_json, null, true)
        ]);
    });
//  CSS
gulp.task('code.lint.css', 'Checks css syntax.', ['code.format.css'],
    function (cb) {
        return combiner.obj([
            gulpScripts.codeLint(ini.path.projectFiles.css.loc, lint_css, ini.path.projectFiles.css.linter, true)
        ]);
    });
//  Jade/ Pug
gulp.task('code.lint.jade', 'Checks jade/pug syntax.', [],
    function (cb) {
        return combiner.obj([
            gulpScripts.codeLint(ini.path.projectFiles.jade.loc, lint_jade, ini.path.projectFiles.jade.linter, false)
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
                template: path.join(ini.path.template, 'template.md.js.ejs')
            }, './doc/', 'documentation-js.md', null),
            //  make ./doc/documentation-js-head.md
            gulpScripts.genSingleMarkdox({
                template: path.join(ini.path.template, 'template.md.js.head.ejs')
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
                template: path.join(ini.path.template, 'template.md.gulp.head.ejs')
            }, './doc/', 'documentation-gulp-head.md', false),
            //  make ./doc/documentation-gulp-out.md
            gulpScripts.outputToExample('gulp', {
                filters: [
                    /^\[/
                ]
            }, './doc/', 'documentation-gulp-out.md'),
            //  make ./doc/documentation-gulp.md
            gulpScripts.genSingleMarkdox({
                template: path.join(ini.path.template, 'template.md.js.ejs')
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
                template: path.join(ini.path.template, 'template.md.readme.ejs')
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
//  Clean JS Readmes
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
        return combiner.obj([
            gulpScripts.removeFiles([
                '/.git/index.lock'
            ], ini.opt.git.lock)
        ]);
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
    function (cb) {
        return combiner.obj([
            gulp.src('./'),
            git.add(ini.opt.git.add)
        ]);
    });
//  Run git commit with -m option
gulp.task('git.commit', false, ['git.add'],
    function (cb) {
        var message = argv.m ? argv.m : 'Pushing with Gulp.';
        return combiner.obj([
            gulp.src('./'),
            git.commit(message)
        ]);
    }, ini.opt.git.commit);
//  Run git pull
gulp.task('git.pull', "Gets the latest code base from the repository.", ['git.commit'],
    function (cb) {
        return git.pull('origin', 'master', gulpError.git);
    });
//  Push to master
gulp.task('git.push.master', false, ['git.pull'],
    function (cb) {
        return git.push('origin', 'master', gulpError.git);
    });
//  Push to heroku
gulp.task('git.push.heroku', false, ['git.push.master'],
    function (cb) {
        return git.push('origin', 'master:heroku', gulpError.git);
    });
//  Store Credentials
gulp.task('git.cred.store', 'Tell git to store your credentials.', [],
    function (cb) {
        var cmdStr = 'git config --global credential.helper store';
        return combiner.obj([
            exec(cmdStr, gulpError.exec)
        ]);
    });
//  User commands
gulp.task('git.master', 'Pushes code to master branch.', ['git.push.master'],
    function (cb) {},
    ini.opt.git.commit);
gulp.task('git.heroku', 'Pushes code to master branch, heroku branch, and deploys to heroku.', ['git.push.heroku'],
    function (cb) {},
    ini.opt.git.commit);

gulp.task('git.error', 'Handle commong Git errors', ['git.rm.lock']);

//  WINDOWS SERVICES TASKS

//  Show translated configuration file to json
gulp.task('service.mongodb.show.config', false, [],
    function (cb) {
        console.log(cfgMongoDB);
    });
//  Create necessary directories
gulp.task('service.mongodb.create.dirs', false, [],
    function (cb) {
        var mpath = cfgMongoDB.systemLog.path.split('\\');
        mpath.pop();
        mkdirp(cfgMongoDB.storage.dbPath);
        mkdirp(mpath.join('\\'));
    });
//  Create MongoDB service
gulp.task('service.mongodb.create', false, ['service.mongodb.create.dirs'],
    function (cb) {
        var cmdStr = 'mongod.exe --config ' + ini.path.projectFiles.mongodb.cfg + ' --install';
        return combiner.obj([
            exec(cmdStr, gulpError.exec)
        ]);
    });
//  Stop MongoDB service
gulp.task('service.mongodb.stop', false, [],
    function (cb) {
        var cmdStr = 'net stop ' + cfgMongoDB.processManagement.windowsService.serviceName;
        return combiner.obj([
            exec(cmdStr, gulpError.exec)
        ]);
    });
//  Start MongoDB service
gulp.task('service.mongodb.start', false, [],
    function (cb) {
        var cmdStr = 'net start ' + cfgMongoDB.processManagement.windowsService.serviceName;
        return combiner.obj([
            exec(cmdStr, gulpError.exec)
        ]);
    });
//  Remove MongoDB service
gulp.task('service.mongodb.remove', false, ['service.mongodb.stop'],
    function (cb) {
        var cmdStr = 'sc.exe delete ' + cfgMongoDB.processManagement.windowsService.serviceName;
        return combiner.obj([
            exec(cmdStr, gulpError.exec)
        ]);
    });
//  User Commands
gulp.task('mongodb.config', 'Shows the MongoDB config file in json.', ['service.mongodb.show.config']);
gulp.task('mongodb.create', 'Creates MongoDB service on windows.', ['service.mongodb.create']);
gulp.task('mongodb.start', 'Starts MongoDB service on windows.', ['service.mongodb.start']);
gulp.task('mongodb.stop', 'Stops MongoDB service on windows.', ['service.mongodb.stop']);
gulp.task('mongodb.delete', 'Removes MongoDB service on windows.', ['service.mongodb.remove']);