

<!-- Start ini\development.js -->

## developement.js

The configuration file to use during development. It holds settings for the application.

<!-- End ini\development.js -->




<!-- Start ini\gulp.js -->

## gulp.js

The configuration file to use during gulp tasks. It holds settings for the gulp taskrunner.

<!-- End ini\gulp.js -->




<!-- Start ini\production.js -->

## production.js

The configuration file to use during production.

<!-- End ini\production.js -->




<!-- Start ini\common\cookie.js -->

## cookie.js

The configuration file for cookies.

<!-- End ini\common\cookie.js -->




<!-- Start ini\common\db.js -->

## db.js

The configuration file for mongodb.

<!-- End ini\common\db.js -->




<!-- Start ini\common\file.js -->

## file.js

The configuration file for mapping documents.

<!-- End ini\common\file.js -->




<!-- Start ini\common\map.js -->

## map.js

The configuration file for web mapping paths.

<!-- End ini\common\map.js -->




<!-- Start ini\common\paths.js -->

## paths.js

The configuration file for absolute paths.

<!-- End ini\common\paths.js -->




<!-- Start ini\common\security.js -->

## security.js

The configuration file for security settings.

<!-- End ini\common\security.js -->




<!-- Start server\mvc\controllers\main.js -->

## main.js

This file holds the GET controller for the main page.

## index(req, res)

The default page for the application

### Params:

* **Object** *req* The request passed by the application
* **Object** *res* The response passed by the application

<!-- End server\mvc\controllers\main.js -->




<!-- Start server\lib\Api.js -->

## Api.js

The Api handler for the application.

## Api

This is the Api class. It adds api point to the express application.

 Examples:

     var api = new Api(app);

     api.add({
         "url": urlJoin( "/api/", "Comma", "separated", "path", "components"),
         "param": null | {"paramName": { "desc": "description of param", "opt": null | [ "array of options" ] }, ...
         "desc": "Description of the api method.",
         "return": "POST|PUT|GET|DELETE"
     },
     function(req, res, obj){
         // Api method action with final responses using
         // api.response(res, {errorObject}, {documentObject}, obj);
         // where errorObject and documentObject are user defined
     });

     ...

     api.end();

### Params:

* **obj** *app* The express application

## Api.validMethod(method)

Checks to see if valid return type was passed

### Params:

* **Enum** *method* The return type get|post|put|delete

### Return:

* **Boolean** true The return type is valid

* **Boolean** false An unknown return type

## Api.add(obj, func)

Adds a method to the api and documents it.

 Examples:

     var api = new Api(app);

     api.add({
         "url": urlJoin( "/api/", "Comma", "separated", "path", "components"),
         "param": null | {"paramName": { "desc": "description of param", "opt": null | [ "array of options" ] }, ...
         "desc": "Description of the api method.",
         "return": "POST|PUT|GET|DELETE"
     },
     function(req, res, obj){
         // Api method action with final responses using
         // api.response(res, {errorObject}, {documentObject}, obj);
         // where errorObject and documentObject are user defined
     });

     ...

### Params:

* **Object** *obj* The api object documentation
* **Function** *func* The api function

## Api.response(res, err, doc, obj)

Passes the results of a database manipulation to the response handler,
 alongside the type of request that was made with any corresponding
 errors or documents.

### Params:

* **Object** *res* The response passed by the application
* **Object** *err* The error object
* **Object** *doc* The data document
* **Object** *obj* The request type.

## Api.end()

Signals the Api.add method will no longer be used and, prepares
 the help responses. Also sets up and handles api error for invalid url.

## middleWare(app)

Middle ware to intercept for the Api class

### Params:

* **Object** *app* The express application

### Return:

* **Object** An instantiated API object.

<!-- End server\lib\Api.js -->




<!-- Start server\lib\Error-gulp.js -->

## Error-gulp.js

This holds the error handlers for Gulp.

## ErrorGulp

This class holds all the error haandlers for Gulp.

## ErrorGulp.git(err)

Processes a gulp-git error

### Params:

* **Object** *err* The error being handled

## ErrorGulp.exec(err, stdout, stderr)

Handles errors for gulp-exec.

### Params:

* **Object** *err* The error being handled
* **Stream** *stdout* stdout stream
* **Stream** *stderr* stderr stream

## middleWare()

Error handler middle ware intercept function

<!-- End server\lib\Error-gulp.js -->




<!-- Start server\lib\ErrorHandler.js -->

## Error.js

This holds the error handlers for the application.

## ErrorHandler

This class holds all the error responses for the application.

## ErrorHandler.notFound(req, res, next)

Process a 404 missing resource

### Params:

* **Object** *req* The request passed by the application
* **Object** *res* The response passed by the application
* **Function** *next* The function to the next express item

## ErrorHandler.server(err, req, res, next)

Processes a 500 server error

See: tested against ini.mode for `dev|prod`.          `dev` leaks stack trace to user

### Params:

* **Object** *err* The error passed by the application
* **Object** *req* The request passed by the application
* **Object** *res* The response passed by the application
* **Function** *next* The function to the next express item

## middleWare(app)

Error handler middle ware intercept function

### Params:

* **Object** *app* The express application

<!-- End server\lib\ErrorHandler.js -->




<!-- Start server\lib\GlobalApplication.js -->

## GlobalApplication.js

Holds the Global application obj, this object determines information about the
 running application and resolves which configuration file to use. It also
 creates creates logging function wrappers that appends '[appName]' to the
 console logs to help diferentiate message made by the developers from those
 made by dependencies or the system.

## GlobalApplication

The Global application object, ties in configurations package information and application reporting.
 To be run from app.js

 Examples:

     //  Get application root directory and system mode
     var root = path.resolve(__dirname);
     var mode = process.env.TS_RUN_MODE;

     // Set application mode to: development | production
     global.app = require('./server/lib/GlobalApplication.js')(mode, root);

### Params:

* **JSON** *pJson* The package.json contents. Supplied by middleWare function.
* **String** *mode* The ini/(developement|production|gulp).js file to use.
* **String** *root* The application root directory.

## GlobalApplication.console.log(Anything)

Prepends the '[appName appVersion]'

 Examples:

     global.app.console.log( "Message" );
     //  Outputs [ appName versionName ] Message

### Params:

* **List** *Anything* that can be passed to console.log

## GlobalApplication.console.err(Anything)

Prepends the '[appName appVersion:ERROR]' and highlights message as red

 Examples:

     global.app.console.err( "Message" );
     //  Outputs [ appName versionName:ERROR ] Message

### Params:

* **List** *Anything* that can be passed to console.log

## GlobalApplication.ini()

Generates the path to the configuration file

### Return:

* **String** Path to the configuration file to use

## middleWare(mode, root)

GlobalApplication middle ware intercept function

### Params:

* **String** *mode* The ini/(developement|production|gulp).js file to use.
* **String** *root* The application root directory.

<!-- End server\lib\GlobalApplication.js -->




<!-- Start server\lib\mongodb.js -->

## mongodb.js

The database driver wrapper. It processes schema into models and then set up
 connection handlers before attempting to start a connection to the database.

## middleWare 
 GlobalApplication middle ware intercept function

 Examples:

     mdb = {
         models: {}, //  All the MongoDB models
         schema: {}, //  All the MongoDB scemas
         mongoose: require('mongoose')   //  The instance of mongoose to use
    };()

### Return:

* **Obj** The Mongo DB connection object, see the example

Waiting for connection

<!-- End server\lib\mongodb.js -->




<!-- Start server\lib\Security.js -->

## Security.js

The Security handler for the application.

 code modified from http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript

## Security

This is the Security object. It adds hashing and authentication to the application..

 ### Examples:

     var security = new Security();
     var salt = security.salt();
     var hash = security.hash(req.params.pass, salt);

## Security.hash(Input, Salt)

Generates a hash from the input and salt values

 Examples:

     var security = new Security();

     savedHash == security.hash("InputString", savedSalt) ?
         console.log("Same input String") :
         console.log("Different input String");

### Params:

* **String** *Input* to hash
* **String** *Salt* to use in hash

### Return:

* **String** Hash string

## Security.salt()

Generate a salt to use for Hashing

### Return:

* **String** A cryptoplogically secure GUID to use                          as a salt during Hashing

## Security.s4()

Generate a Four digit salt

### Return:

* **String** Four digit salt

## ssl(app)

Enable ssl security if ini.security.ssl.state == true

### Params:

* **obj** *app* The express application

## middleWare()

Middleware to intercept for the Security class

### Return:

* **Object** An instantiated Security object.

<!-- End server\lib\Security.js -->




<!-- Start server\routes\api.js -->

## api.js

This is the API routing file it determines the content to be saved
 or served back

## fileOptions()

Generates an array of document aliases from the ini.file.docs object

### Return:

* **Array** An array of Document aliases

## middleWare(app, mdb)

Sets up API routing. Self Documenting methods are added to the api, They are
self documenting because the first paramter adds itself to the API help object.

See: /api/get/help For generated methods

### Params:

* **Object** *app* The express application reference
* **Object** *mdb* The mongoDB database object

<!-- End server\routes\api.js -->




<!-- Start server\routes\paths.js -->

## paths.js

This is the url routing file it determines the controller or file that will
 be served by the node server.

## middleWare(app)

Sets up static and dynamic routing from the configuration file.

### Params:

* **Object** *app* The express application reference

<!-- End server\routes\paths.js -->




<!-- Start www\app\js\audio.js -->

## audio.js

This is a research file for web audio api it is not used in the project.

<!-- End www\app\js\audio.js -->




<!-- Start www\app\js\DropDown.js -->

## DropDown.js

Contains the class for the DropDown menu.

## DropDown

This is the DropDown class it determines what content is
 displayed in the menu.

## DropDown.init(Object)

Initializes the DropDown menu, should be run on load.

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.init({
         {String} dropDownId: The DropDown id of the DropDown element,
         {String} navigationId: The navigation menu id of the DropDown element
     });

### Params:

* **Object** *Object* The initialization object

## DropDown.open()

Opens the DropDown menu

## DropDown.close()

Closes the DropDown menu

## DropDown.toggle()

Toggles the DropDown

## DropDown.panel.set.fxCatalog(json)

Adds effects to the fx catalog

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.fxCatalog({
         {String} title = The title of an fxObj,
         {String} desc  =  The description of an fxObj,
         {String} image = The URL to the icon image of an fxObj
     });

### Params:

* **Array.fxObj** *json* An array of fxObjects

## DropDown.panel.set.mixCatalog(json)

Adds mixes to the mix catalog

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.mixCatalog({
         {String} title = The title of an mixObj,
         {String} date  = The date of a mixObj creation,
         {String} image = The URL to the icon image of an mixObj
     });

### Params:

* **Array.mixObj** *json* An array of mixObjects

## DropDown.panel.set.account(obj)

Sets the account panel information

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.account({
         {String} name: The name of the account holder,
         {String} email: The name of the email holder
     });

### Params:

* **Object** *obj* The account information.

## DropDown.panel.set.information(obj)

Adds selected item descriptions, titles, images, etc

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.information({
         {String}    title:   The title of the information being displayed
         {URL}       image:   The URL of an image to display
         {String}    desc:    The description of the content being displayed
     });

### Params:

* **Object** *obj* The selected item information object

## DropDown.panel.load(options, pre, success, fail)

Loads information for panels and handles succesful returns and failures. It is
 A modification of the $.ajax function

### Params:

* **Object** *options* an $.ajax settings object
* **Function** *pre* the function to run before the ajax call
* **Function** *success* the function to call after a succesful ajax call
* **Function** *fail* the function to call after a failed ajax call

## DropDown.panel.display.toggle(state, toggleClass)

Displays or hides a panel from view.

### Params:

* **Boolean** *state* The display state of a panel
* **String** *toggleClass* The panel class to control

## DropDown.panel.display.all(state)

Modify the display state of all panels

### Params:

* **Boolean** *state* The state to place all panels

## DropDown.panel.display.left(state)

Modify the display state of all left side panels

### Params:

* **Boolean** *state* The state to place left side panels

## DropDown.panel.display.right(state)

Modify the display state of all right side panels

### Params:

* **Boolean** *state* The state to place right side panels

## DropDown.panel.display.wait.start(position)

Start a wait screen. {Currently disabled}

### Params:

* **Enum** *position* LEFT|RIGHT|ALL The wait screen(s) to start displaying.

switch(position){
                    case 'LEFT':
                        _this.panel.display.left(false);
                        _this.panel.display.toggle(true, '.wait-left-panel' );
                        return;
                    case 'RIGHT':
                        _this.panel.display.right(false);
                        _this.panel.display.toggle(true, '.wait-right-panel' );
                        return;
                    case 'ALL':
                        _this.panel.display.all(false);
                        _this.panel.display.toggle(true, '.wait-right-panel' );
                        _this.panel.display.toggle(true, '.wait-left-panel' );
                        return;
                }

## DropDown.panel.display.wait.start(position)

Stop a wait screen. {Currently disabled}

### Params:

* **Enum** *position* LEFT|RIGHT|ALL The wait screen(s) to stop displaying.

switch(position){
                    case 'LEFT':
                        _this.panel.display.toggle(false, '.wait-left-panel' );
                        return;
                    case 'RIGHT':
                        _this.panel.display.toggle(false, '.wait-right-panel' );
                        return;
                    case 'ALL':
                        _this.panel.display.toggle(false, '.wait-right-panel' );
                        _this.panel.display.toggle(false, '.wait-left-panel' );
                        return;
                }

## DropDown.navigation.display.toggle(state, toggleClass)

Toggle the display of a navbar element

### Params:

* **Boolean** *state* The display state to place a navbar element in
* **String** *toggleClass* The class of the navbar element to modify

## DropDown.navigation.display.all(state)

Toggle the display of all navbar elements

### Params:

* **Boolean** *state* The display state to place all navbar element in

## DropDown.navigation.display.secured(state)

Toggle the display of all secured view navbar elements
 This is the logged in state

### Params:

* **Boolean** *state* The display state to place all secured view navbar element in

## DropDown.navigation.display.unsecured(state)

Toggle the display of all unsecured view navbar elements
 This is the logged out state

### Params:

* **Boolean** *state* The display state to place all unsecured view navbar element in

## DropDown.navigation.display.lock(state)

Toggle the Logged in view state

### Params:

* **Boolean** *state* The state of the secured view

## DropDown.show(view, opt)

Makes the views that the dropdown manages

### Params:

* **String** *view* The view to display
* **String** *opt* Options to pass the views

<!-- End www\app\js\DropDown.js -->




<!-- Start www\app\js\init.js -->

## require 
 This is a client side function that emulates the action of require for
 loaded node_modules that are being served through static virtual directory.

 It is used to resolve the dependency without modifying the node_module itself
 this is important because any changes to the node_module locally will not
 propogate when being rebuilt.(src)

### Params:

* *src* The string name being required

### Return:

* The code being required

## getCookie 
 Retrieves cookies from the system, this function is necessary
 because artifacts were being passed prepended to the cookie
 value.(name)

### Params:

* *name* The cookie name to search for

### Return:

* ret The value of the cookie

<!-- End www\app\js\init.js -->




<!-- Start www\app\js\knob.js -->

Downward compatible, touchable dial

Version: 1.2.12
Requires: jQuery v1.7+

Copyright (c) 2012 Anthony Terrien
Under MIT License (http://www.opensource.org/licenses/mit-license.php)

Thanks to vor, eskimoblood, spiffistan, FabrizioC

Kontrol library

## k

Definition of globals and core

## o()

Kontrol Object

Definition of an abstract UI control

Each concrete component must call this one.
<code>
k.o.call(this);
</code>

## Dial()

k.Dial

<!-- End www\app\js\knob.js -->




<!-- Start www\app\js\mixer.js -->

## $()

## $()

Add data to the mute & record buttons

## $()

Set up track names

## $()

Set up EQ knobs

## $()

Set up pan knobs

## $()

Set up volume sliders

## $()

Knob function

## $()

Slider function

## $()

Mute buttons

## $()

Recording buttons

## $()

Playback buttons

<!-- End www\app\js\mixer.js -->




<!-- Start www\app\js\onLoad.js -->

<!-- End www\app\js\onLoad.js -->




<!-- Start www\app\js\recorder.js -->

## writeString()

RIFF identifier

RIFF chunk length

## writeString()

RIFF type

## writeString()

format chunk identifier

format chunk length

sample format (raw)

channel count

sample rate

byte rate (sample rate * block align)

block align (channel count * bytes per sample)

bits per sample

## writeString()

data chunk identifier

data chunk length

<!-- End www\app\js\recorder.js -->




<!-- Start www\app\js\recorderWorker.js -->

## recLength

License (MIT)

Copyright © 2013 Matt Diamond

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.

## writeString()

RIFF identifier

file length

## writeString()

RIFF type

## writeString()

format chunk identifier

format chunk length

sample format (raw)

channel count

sample rate

byte rate (sample rate * block align)

block align (channel count * bytes per sample)

bits per sample

## writeString()

data chunk identifier

data chunk length

<!-- End www\app\js\recorderWorker.js -->




<!-- Start www\app\js\StopWatch.js -->

## StopWatch 
 This is a stopwatch that will be used to create a clock to manage tracks play position

 modified from https://gist.github.com/electricg/4372563()

## now 
 Gets current time()

### Return:

* current time

## start 
 start the clock()

## stop 
 stop the clock()

## reset 
 reset the clock time values()

## getTime 
 get the runtime()

### Return:

* the runtime

## pad 
 gives a number formated with leading zeroes(num, size)

### Params:

* *num* the number to pad
* *size* how many digits to show

### Return:

* **STRING** formated number

## formatTime 
Formats the time display(time)

### Params:

* *time* The timestamp to display

### Return:

* the new time string to display

## setId 
 sets the id of the element to insert the clock(id)

### Params:

* *id* the id of the element

## getId 
 get the Id of the element that has the clock()

### Return:

* the id of the clock

## setClocktimer 
 sets the display interval of the clock, In other words it animates changes in time()

## clearClocktimer 
 clears the display interval of the clock, in other words it stops animation()

## update 
 interval function, writes the time of the clock into the element.()

## adjust 
adjusts the clock to a given time(mod)

### Params:

* *mod* the value to adjust the time by

### Return:

* the current laptime

## run 
 This is the command function to the clock, it accepts(action, option)

### Params:

* *action* 'START' - Starts the stopwatch                      'STOP'  -   Stops the stopwatch
                     'RESET' -   Restarts the stopwatch
                     'INIT'  -   Initializes the stopwatch
* *option* Any options that an action requires.          null        no options
         idString    Required by 'INIT', the idstring of the element that will display the clock

### Return:

* The lapTime or RunTime on the stopwatch

<!-- End www\app\js\StopWatch.js -->




<!-- Start www\app\js\track-label.js -->

<!-- End www\app\js\track-label.js -->




<!-- Start www\app\js\volume-meter.js -->

The MIT License (MIT)

Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## createAudioMeter()

Usage:
audioNode = createAudioMeter(audioContext,clipLevel,averaging,clipLag);

audioContext: the AudioContext you're using.
clipLevel: the level (0 to 1) that you would consider "clipping".
   Defaults to 0.98.
averaging: how "smoothed" you would like the meter to be over time.
   Should be between 0 and less than 1.  Defaults to 0.95.
clipLag: how long you would like the "clipping" indicator to show
   after clipping has occured, in milliseconds.  Defaults to 750ms.

Access the clipping through node.checkClipping(); use node.shutdown to get rid of it.

<!-- End www\app\js\volume-meter.js -->




<!-- Start www\app\js\webAudioApi.js -->

## AudioContext

<!-- End www\app\js\webAudioApi.js -->




<!-- Start www\app\js\webAudioInterface.js -->

## $()

var track = [null,null,null,null]

captureAudio();
track.forEach(function(index, track){
     track[index] = new TrackTemplate();
     track[index].InitTrack()
});

console.log("armTrackToggle track:"+trackNumber);
track[trackNumber].armTrackToggle();

console.log("recordToggle track:"+trackNumber);
 thisTrack[tracknumber].recordToggle();
 if(thisTrack[tracknumber].isRecording) {
     track.forEach(function(index, thisTrack){
         if (index != tracknumber)
             track[index].playTrack();
      });
  }

track.forEach(function(index, track){
     track[index].playTrack();
});

track[index].pan.pan.value = amount;

<!-- End www\app\js\webAudioInterface.js -->




<!-- Start app.js -->

## app.js

This file is the controller for the application.

<!-- End app.js -->




<!-- Start gulpfile.js -->

## gulpfile.js

This file holds the gulp task scripts, it is the task runner.

 Examples:
     Usage
          gulp [TASK] [OPTIONS...]

     Available tasks
         code.doc              Documents code base
         code.doc.js           Extracts documentation for JS code.
         code.format           Formats code base
         code.format.css       Formats CSS code.
         code.format.js        Formats JS code.
         code.format.json      Formats JSON code.
         code.lint             Performs all syntax tests
         code.lint.css         Checks css syntax.
         code.lint.jade        Checks jade/pug syntax.
         code.lint.js          Checks JS syntax.
         code.lint.json        Checks json syntax.
         code.prepare          Checks, formats, and documents code base
         git.cred.store        Tell git to store your credentials.
         git.error             Handle commong Git errors
         git.heroku            Pushes code to master branch, heroku branch, and deploys to heroku.
          --m="message"        Commit message to use.
         git.master            Pushes code to master branch.
          --m="message"        Commit message to use.
         help                  Display this help text.
         mongodb.config        Shows the MongoDB config file in json.
         mongodb.create        Creates MongoDB service on windows.
         mongodb.delete        Removes MongoDB service on windows.
         mongodb.start         Starts MongoDB service on windows.
         mongodb.stop          Stops MongoDB service on windows.

## function()

'code.doc.readme.new',

<!-- End gulpfile.js -->




<!-- Start ini\development.js -->

## developement.js

The configuration file to use during development. It holds settings for the application.

<!-- End ini\development.js -->




<!-- Start ini\gulp.js -->

## gulp.js

The configuration file to use during gulp tasks. It holds settings for the gulp taskrunner.

<!-- End ini\gulp.js -->




<!-- Start ini\production.js -->

## production.js

The configuration file to use during production.

<!-- End ini\production.js -->




<!-- Start ini\common\cookie.js -->

## cookie.js

The configuration file for cookies.

<!-- End ini\common\cookie.js -->




<!-- Start ini\common\db.js -->

## db.js

The configuration file for mongodb.

<!-- End ini\common\db.js -->




<!-- Start ini\common\file.js -->

## file.js

The configuration file for mapping documents.

<!-- End ini\common\file.js -->




<!-- Start ini\common\map.js -->

## map.js

The configuration file for web mapping paths.

<!-- End ini\common\map.js -->




<!-- Start ini\common\paths.js -->

## paths.js

The configuration file for absolute paths.

<!-- End ini\common\paths.js -->




<!-- Start ini\common\security.js -->

## security.js

The configuration file for security settings.

<!-- End ini\common\security.js -->




<!-- Start server\mvc\controllers\main.js -->

## main.js

This file holds the GET controller for the main page.

## index(req, res)

The default page for the application

### Params:

* **Object** *req* The request passed by the application
* **Object** *res* The response passed by the application

<!-- End server\mvc\controllers\main.js -->




<!-- Start server\lib\Api.js -->

## Api.js

The Api handler for the application.

## Api

This is the Api class. It adds api point to the express application.

 Examples:

     var api = new Api(app);

     api.add({
         "url": urlJoin( "/api/", "Comma", "separated", "path", "components"),
         "param": null | {"paramName": { "desc": "description of param", "opt": null | [ "array of options" ] }, ...
         "desc": "Description of the api method.",
         "return": "POST|PUT|GET|DELETE"
     },
     function(req, res, obj){
         // Api method action with final responses using
         // api.response(res, {errorObject}, {documentObject}, obj);
         // where errorObject and documentObject are user defined
     });

     ...

     api.end();

### Params:

* **obj** *app* The express application

## Api.validMethod(method)

Checks to see if valid return type was passed

### Params:

* **Enum** *method* The return type get|post|put|delete

### Return:

* **Boolean** true The return type is valid

* **Boolean** false An unknown return type

## Api.add(obj, func)

Adds a method to the api and documents it.

 Examples:

     var api = new Api(app);

     api.add({
         "url": urlJoin( "/api/", "Comma", "separated", "path", "components"),
         "param": null | {"paramName": { "desc": "description of param", "opt": null | [ "array of options" ] }, ...
         "desc": "Description of the api method.",
         "return": "POST|PUT|GET|DELETE"
     },
     function(req, res, obj){
         // Api method action with final responses using
         // api.response(res, {errorObject}, {documentObject}, obj);
         // where errorObject and documentObject are user defined
     });

     ...

### Params:

* **Object** *obj* The api object documentation
* **Function** *func* The api function

## Api.response(res, err, doc, obj)

Passes the results of a database manipulation to the response handler,
 alongside the type of request that was made with any corresponding
 errors or documents.

### Params:

* **Object** *res* The response passed by the application
* **Object** *err* The error object
* **Object** *doc* The data document
* **Object** *obj* The request type.

## Api.end()

Signals the Api.add method will no longer be used and, prepares
 the help responses. Also sets up and handles api error for invalid url.

## middleWare(app)

Middle ware to intercept for the Api class

### Params:

* **Object** *app* The express application

### Return:

* **Object** An instantiated API object.

<!-- End server\lib\Api.js -->




<!-- Start server\lib\Error-gulp.js -->

## Error-gulp.js

This holds the error handlers for Gulp.

## ErrorGulp

This class holds all the error haandlers for Gulp.

## ErrorGulp.git(err)

Processes a gulp-git error

### Params:

* **Object** *err* The error being handled

## ErrorGulp.exec(err, stdout, stderr)

Handles errors for gulp-exec.

### Params:

* **Object** *err* The error being handled
* **Stream** *stdout* stdout stream
* **Stream** *stderr* stderr stream

## middleWare()

Error handler middle ware intercept function

<!-- End server\lib\Error-gulp.js -->




<!-- Start server\lib\ErrorHandler.js -->

## Error.js

This holds the error handlers for the application.

## ErrorHandler

This class holds all the error responses for the application.

## ErrorHandler.notFound(req, res, next)

Process a 404 missing resource

### Params:

* **Object** *req* The request passed by the application
* **Object** *res* The response passed by the application
* **Function** *next* The function to the next express item

## ErrorHandler.server(err, req, res, next)

Processes a 500 server error

See: tested against ini.mode for `dev|prod`.          `dev` leaks stack trace to user

### Params:

* **Object** *err* The error passed by the application
* **Object** *req* The request passed by the application
* **Object** *res* The response passed by the application
* **Function** *next* The function to the next express item

## middleWare(app)

Error handler middle ware intercept function

### Params:

* **Object** *app* The express application

<!-- End server\lib\ErrorHandler.js -->




<!-- Start server\lib\GlobalApplication.js -->

## GlobalApplication.js

Holds the Global application obj, this object determines information about the
 running application and resolves which configuration file to use. It also
 creates creates logging function wrappers that appends '[appName]' to the
 console logs to help diferentiate message made by the developers from those
 made by dependencies or the system.

## GlobalApplication

The Global application object, ties in configurations package information and application reporting.
 To be run from app.js

 Examples:

     //  Get application root directory and system mode
     var root = path.resolve(__dirname);
     var mode = process.env.TS_RUN_MODE;

     // Set application mode to: development | production
     global.app = require('./server/lib/GlobalApplication.js')(mode, root);

### Params:

* **JSON** *pJson* The package.json contents. Supplied by middleWare function.
* **String** *mode* The ini/(developement|production|gulp).js file to use.
* **String** *root* The application root directory.

## GlobalApplication.console.log(Anything)

Prepends the '[appName appVersion]'

 Examples:

     global.app.console.log( "Message" );
     //  Outputs [ appName versionName ] Message

### Params:

* **List** *Anything* that can be passed to console.log

## GlobalApplication.console.err(Anything)

Prepends the '[appName appVersion:ERROR]' and highlights message as red

 Examples:

     global.app.console.err( "Message" );
     //  Outputs [ appName versionName:ERROR ] Message

### Params:

* **List** *Anything* that can be passed to console.log

## GlobalApplication.ini()

Generates the path to the configuration file

### Return:

* **String** Path to the configuration file to use

## middleWare(mode, root)

GlobalApplication middle ware intercept function

### Params:

* **String** *mode* The ini/(developement|production|gulp).js file to use.
* **String** *root* The application root directory.

<!-- End server\lib\GlobalApplication.js -->




<!-- Start server\lib\mongodb.js -->

## mongodb.js

The database driver wrapper. It processes schema into models and then set up
 connection handlers before attempting to start a connection to the database.

## middleWare 
 GlobalApplication middle ware intercept function

 Examples:

     mdb = {
         models: {}, //  All the MongoDB models
         schema: {}, //  All the MongoDB scemas
         mongoose: require('mongoose')   //  The instance of mongoose to use
    };()

### Return:

* **Obj** The Mongo DB connection object, see the example

Waiting for connection

<!-- End server\lib\mongodb.js -->




<!-- Start server\lib\Security.js -->

## Security.js

The Security handler for the application.

 code modified from http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript

## Security

This is the Security object. It adds hashing and authentication to the application..

 ### Examples:

     var security = new Security();
     var salt = security.salt();
     var hash = security.hash(req.params.pass, salt);

## Security.hash(Input, Salt)

Generates a hash from the input and salt values

 Examples:

     var security = new Security();

     savedHash == security.hash("InputString", savedSalt) ?
         console.log("Same input String") :
         console.log("Different input String");

### Params:

* **String** *Input* to hash
* **String** *Salt* to use in hash

### Return:

* **String** Hash string

## Security.salt()

Generate a salt to use for Hashing

### Return:

* **String** A cryptoplogically secure GUID to use                          as a salt during Hashing

## Security.s4()

Generate a Four digit salt

### Return:

* **String** Four digit salt

## ssl(app)

Enable ssl security if ini.security.ssl.state == true

### Params:

* **obj** *app* The express application

## middleWare()

Middleware to intercept for the Security class

### Return:

* **Object** An instantiated Security object.

<!-- End server\lib\Security.js -->




<!-- Start server\routes\api.js -->

## api.js

This is the API routing file it determines the content to be saved
 or served back

## fileOptions()

Generates an array of document aliases from the ini.file.docs object

### Return:

* **Array** An array of Document aliases

## middleWare(app, mdb)

Sets up API routing. Self Documenting methods are added to the api, They are
self documenting because the first paramter adds itself to the API help object.

See: /api/get/help For generated methods

### Params:

* **Object** *app* The express application reference
* **Object** *mdb* The mongoDB database object

<!-- End server\routes\api.js -->




<!-- Start server\routes\paths.js -->

## paths.js

This is the url routing file it determines the controller or file that will
 be served by the node server.

## middleWare(app)

Sets up static and dynamic routing from the configuration file.

### Params:

* **Object** *app* The express application reference

<!-- End server\routes\paths.js -->




<!-- Start www\app\js\audio.js -->

## audio.js

This is a research file for web audio api it is not used in the project.

<!-- End www\app\js\audio.js -->




<!-- Start www\app\js\DropDown.js -->

## DropDown.js

Contains the class for the DropDown menu.

## DropDown

This is the DropDown class it determines what content is
 displayed in the menu.

## DropDown.init(Object)

Initializes the DropDown menu, should be run on load.

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.init({
         {String} dropDownId: The DropDown id of the DropDown element,
         {String} navigationId: The navigation menu id of the DropDown element
     });

### Params:

* **Object** *Object* The initialization object

## DropDown.open()

Opens the DropDown menu

## DropDown.close()

Closes the DropDown menu

## DropDown.toggle()

Toggles the DropDown

## DropDown.panel.set.fxCatalog(json)

Adds effects to the fx catalog

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.fxCatalog({
         {String} title = The title of an fxObj,
         {String} desc  =  The description of an fxObj,
         {String} image = The URL to the icon image of an fxObj
     });

### Params:

* **Array.fxObj** *json* An array of fxObjects

## DropDown.panel.set.mixCatalog(json)

Adds mixes to the mix catalog

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.mixCatalog({
         {String} title = The title of an mixObj,
         {String} date  = The date of a mixObj creation,
         {String} image = The URL to the icon image of an mixObj
     });

### Params:

* **Array.mixObj** *json* An array of mixObjects

## DropDown.panel.set.account(obj)

Sets the account panel information

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.account({
         {String} name: The name of the account holder,
         {String} email: The name of the email holder
     });

### Params:

* **Object** *obj* The account information.

## DropDown.panel.set.information(obj)

Adds selected item descriptions, titles, images, etc

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.information({
         {String}    title:   The title of the information being displayed
         {URL}       image:   The URL of an image to display
         {String}    desc:    The description of the content being displayed
     });

### Params:

* **Object** *obj* The selected item information object

## DropDown.panel.load(options, pre, success, fail)

Loads information for panels and handles succesful returns and failures. It is
 A modification of the $.ajax function

### Params:

* **Object** *options* an $.ajax settings object
* **Function** *pre* the function to run before the ajax call
* **Function** *success* the function to call after a succesful ajax call
* **Function** *fail* the function to call after a failed ajax call

## DropDown.panel.display.toggle(state, toggleClass)

Displays or hides a panel from view.

### Params:

* **Boolean** *state* The display state of a panel
* **String** *toggleClass* The panel class to control

## DropDown.panel.display.all(state)

Modify the display state of all panels

### Params:

* **Boolean** *state* The state to place all panels

## DropDown.panel.display.left(state)

Modify the display state of all left side panels

### Params:

* **Boolean** *state* The state to place left side panels

## DropDown.panel.display.right(state)

Modify the display state of all right side panels

### Params:

* **Boolean** *state* The state to place right side panels

## DropDown.panel.display.wait.start(position)

Start a wait screen. {Currently disabled}

### Params:

* **Enum** *position* LEFT|RIGHT|ALL The wait screen(s) to start displaying.

switch(position){
                    case 'LEFT':
                        _this.panel.display.left(false);
                        _this.panel.display.toggle(true, '.wait-left-panel' );
                        return;
                    case 'RIGHT':
                        _this.panel.display.right(false);
                        _this.panel.display.toggle(true, '.wait-right-panel' );
                        return;
                    case 'ALL':
                        _this.panel.display.all(false);
                        _this.panel.display.toggle(true, '.wait-right-panel' );
                        _this.panel.display.toggle(true, '.wait-left-panel' );
                        return;
                }

## DropDown.panel.display.wait.start(position)

Stop a wait screen. {Currently disabled}

### Params:

* **Enum** *position* LEFT|RIGHT|ALL The wait screen(s) to stop displaying.

switch(position){
                    case 'LEFT':
                        _this.panel.display.toggle(false, '.wait-left-panel' );
                        return;
                    case 'RIGHT':
                        _this.panel.display.toggle(false, '.wait-right-panel' );
                        return;
                    case 'ALL':
                        _this.panel.display.toggle(false, '.wait-right-panel' );
                        _this.panel.display.toggle(false, '.wait-left-panel' );
                        return;
                }

## DropDown.navigation.display.toggle(state, toggleClass)

Toggle the display of a navbar element

### Params:

* **Boolean** *state* The display state to place a navbar element in
* **String** *toggleClass* The class of the navbar element to modify

## DropDown.navigation.display.all(state)

Toggle the display of all navbar elements

### Params:

* **Boolean** *state* The display state to place all navbar element in

## DropDown.navigation.display.secured(state)

Toggle the display of all secured view navbar elements
 This is the logged in state

### Params:

* **Boolean** *state* The display state to place all secured view navbar element in

## DropDown.navigation.display.unsecured(state)

Toggle the display of all unsecured view navbar elements
 This is the logged out state

### Params:

* **Boolean** *state* The display state to place all unsecured view navbar element in

## DropDown.navigation.display.lock(state)

Toggle the Logged in view state

### Params:

* **Boolean** *state* The state of the secured view

## DropDown.show(view, opt)

Makes the views that the dropdown manages

### Params:

* **String** *view* The view to display
* **String** *opt* Options to pass the views

<!-- End www\app\js\DropDown.js -->




<!-- Start www\app\js\init.js -->

## require 
 This is a client side function that emulates the action of require for
 loaded node_modules that are being served through static virtual directory.

 It is used to resolve the dependency without modifying the node_module itself
 this is important because any changes to the node_module locally will not
 propogate when being rebuilt.(src)

### Params:

* *src* The string name being required

### Return:

* The code being required

## getCookie 
 Retrieves cookies from the system, this function is necessary
 because artifacts were being passed prepended to the cookie
 value.(name)

### Params:

* *name* The cookie name to search for

### Return:

* ret The value of the cookie

<!-- End www\app\js\init.js -->




<!-- Start www\app\js\knob.js -->

Downward compatible, touchable dial

Version: 1.2.12
Requires: jQuery v1.7+

Copyright (c) 2012 Anthony Terrien
Under MIT License (http://www.opensource.org/licenses/mit-license.php)

Thanks to vor, eskimoblood, spiffistan, FabrizioC

Kontrol library

## k

Definition of globals and core

## o()

Kontrol Object

Definition of an abstract UI control

Each concrete component must call this one.
<code>
k.o.call(this);
</code>

## Dial()

k.Dial

<!-- End www\app\js\knob.js -->




<!-- Start www\app\js\mixer.js -->

## $()

## $()

Add data to the mute & record buttons

## $()

Set up track names

## $()

Set up EQ knobs

## $()

Set up pan knobs

## $()

Set up volume sliders

## $()

Knob function

## $()

Slider function

## $()

Mute buttons

## $()

Recording buttons

## $()

Playback buttons

<!-- End www\app\js\mixer.js -->




<!-- Start www\app\js\onLoad.js -->

<!-- End www\app\js\onLoad.js -->




<!-- Start www\app\js\recorder.js -->

## writeString()

RIFF identifier

RIFF chunk length

## writeString()

RIFF type

## writeString()

format chunk identifier

format chunk length

sample format (raw)

channel count

sample rate

byte rate (sample rate * block align)

block align (channel count * bytes per sample)

bits per sample

## writeString()

data chunk identifier

data chunk length

<!-- End www\app\js\recorder.js -->




<!-- Start www\app\js\recorderWorker.js -->

## recLength

License (MIT)

Copyright © 2013 Matt Diamond

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.

## writeString()

RIFF identifier

file length

## writeString()

RIFF type

## writeString()

format chunk identifier

format chunk length

sample format (raw)

channel count

sample rate

byte rate (sample rate * block align)

block align (channel count * bytes per sample)

bits per sample

## writeString()

data chunk identifier

data chunk length

<!-- End www\app\js\recorderWorker.js -->




<!-- Start www\app\js\StopWatch.js -->

## StopWatch 
 This is a stopwatch that will be used to create a clock to manage tracks play position

 modified from https://gist.github.com/electricg/4372563()

## now 
 Gets current time()

### Return:

* current time

## start 
 start the clock()

## stop 
 stop the clock()

## reset 
 reset the clock time values()

## getTime 
 get the runtime()

### Return:

* the runtime

## pad 
 gives a number formated with leading zeroes(num, size)

### Params:

* *num* the number to pad
* *size* how many digits to show

### Return:

* **STRING** formated number

## formatTime 
Formats the time display(time)

### Params:

* *time* The timestamp to display

### Return:

* the new time string to display

## setId 
 sets the id of the element to insert the clock(id)

### Params:

* *id* the id of the element

## getId 
 get the Id of the element that has the clock()

### Return:

* the id of the clock

## setClocktimer 
 sets the display interval of the clock, In other words it animates changes in time()

## clearClocktimer 
 clears the display interval of the clock, in other words it stops animation()

## update 
 interval function, writes the time of the clock into the element.()

## adjust 
adjusts the clock to a given time(mod)

### Params:

* *mod* the value to adjust the time by

### Return:

* the current laptime

## run 
 This is the command function to the clock, it accepts(action, option)

### Params:

* *action* 'START' - Starts the stopwatch                      'STOP'  -   Stops the stopwatch
                     'RESET' -   Restarts the stopwatch
                     'INIT'  -   Initializes the stopwatch
* *option* Any options that an action requires.          null        no options
         idString    Required by 'INIT', the idstring of the element that will display the clock

### Return:

* The lapTime or RunTime on the stopwatch

<!-- End www\app\js\StopWatch.js -->




<!-- Start www\app\js\track-label.js -->

<!-- End www\app\js\track-label.js -->




<!-- Start www\app\js\volume-meter.js -->

The MIT License (MIT)

Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## createAudioMeter()

Usage:
audioNode = createAudioMeter(audioContext,clipLevel,averaging,clipLag);

audioContext: the AudioContext you're using.
clipLevel: the level (0 to 1) that you would consider "clipping".
   Defaults to 0.98.
averaging: how "smoothed" you would like the meter to be over time.
   Should be between 0 and less than 1.  Defaults to 0.95.
clipLag: how long you would like the "clipping" indicator to show
   after clipping has occured, in milliseconds.  Defaults to 750ms.

Access the clipping through node.checkClipping(); use node.shutdown to get rid of it.

<!-- End www\app\js\volume-meter.js -->




<!-- Start www\app\js\webAudioApi.js -->

## AudioContext

<!-- End www\app\js\webAudioApi.js -->




<!-- Start www\app\js\webAudioInterface.js -->

## $()

var track = [null,null,null,null]

captureAudio();
track.forEach(function(index, track){
     track[index] = new TrackTemplate();
     track[index].InitTrack()
});

console.log("armTrackToggle track:"+trackNumber);
track[trackNumber].armTrackToggle();

console.log("recordToggle track:"+trackNumber);
 thisTrack[tracknumber].recordToggle();
 if(thisTrack[tracknumber].isRecording) {
     track.forEach(function(index, thisTrack){
         if (index != tracknumber)
             track[index].playTrack();
      });
  }

track.forEach(function(index, track){
     track[index].playTrack();
});

track[index].pan.pan.value = amount;

<!-- End www\app\js\webAudioInterface.js -->




<!-- Start app.js -->

## app.js

This file is the controller for the application.

<!-- End app.js -->




<!-- Start gulpfile.js -->

## gulpfile.js

This file holds the gulp task scripts, it is the task runner.

 Examples:
     Usage
          gulp [TASK] [OPTIONS...]

     Available tasks
         code.doc              Documents code base
         code.doc.js           Extracts documentation for JS code.
         code.format           Formats code base
         code.format.css       Formats CSS code.
         code.format.js        Formats JS code.
         code.format.json      Formats JSON code.
         code.lint             Performs all syntax tests
         code.lint.css         Checks css syntax.
         code.lint.jade        Checks jade/pug syntax.
         code.lint.js          Checks JS syntax.
         code.lint.json        Checks json syntax.
         code.prepare          Checks, formats, and documents code base
         git.cred.store        Tell git to store your credentials.
         git.error             Handle commong Git errors
         git.heroku            Pushes code to master branch, heroku branch, and deploys to heroku.
          --m="message"        Commit message to use.
         git.master            Pushes code to master branch.
          --m="message"        Commit message to use.
         help                  Display this help text.
         mongodb.config        Shows the MongoDB config file in json.
         mongodb.create        Creates MongoDB service on windows.
         mongodb.delete        Removes MongoDB service on windows.
         mongodb.start         Starts MongoDB service on windows.
         mongodb.stop          Stops MongoDB service on windows.

## function()

'code.doc.readme.new',

<!-- End gulpfile.js -->




<!-- Start ini\development.js -->

## developement.js

The configuration file to use during development. It holds settings for the application.

<!-- End ini\development.js -->




<!-- Start ini\gulp.js -->

## gulp.js

The configuration file to use during gulp tasks. It holds settings for the gulp taskrunner.

<!-- End ini\gulp.js -->




<!-- Start ini\production.js -->

## production.js

The configuration file to use during production.

<!-- End ini\production.js -->




<!-- Start ini\common\cookie.js -->

## cookie.js

The configuration file for cookies.

<!-- End ini\common\cookie.js -->




<!-- Start ini\common\db.js -->

## db.js

The configuration file for mongodb.

<!-- End ini\common\db.js -->




<!-- Start ini\common\file.js -->

## file.js

The configuration file for mapping documents.

<!-- End ini\common\file.js -->




<!-- Start ini\common\map.js -->

## map.js

The configuration file for web mapping paths.

<!-- End ini\common\map.js -->




<!-- Start ini\common\paths.js -->

## paths.js

The configuration file for absolute paths.

<!-- End ini\common\paths.js -->




<!-- Start ini\common\security.js -->

## security.js

The configuration file for security settings.

<!-- End ini\common\security.js -->




<!-- Start server\mvc\controllers\main.js -->

## main.js

This file holds the GET controller for the main page.

## index(req, res)

The default page for the application

### Params:

* **Object** *req* The request passed by the application
* **Object** *res* The response passed by the application

<!-- End server\mvc\controllers\main.js -->




<!-- Start server\lib\Api.js -->

## Api.js

The Api handler for the application.

## Api

This is the Api class. It adds api point to the express application.

 Examples:

     var api = new Api(app);

     api.add({
         "url": urlJoin( "/api/", "Comma", "separated", "path", "components"),
         "param": null | {"paramName": { "desc": "description of param", "opt": null | [ "array of options" ] }, ...
         "desc": "Description of the api method.",
         "return": "POST|PUT|GET|DELETE"
     },
     function(req, res, obj){
         // Api method action with final responses using
         // api.response(res, {errorObject}, {documentObject}, obj);
         // where errorObject and documentObject are user defined
     });

     ...

     api.end();

### Params:

* **obj** *app* The express application

## Api.validMethod(method)

Checks to see if valid return type was passed

### Params:

* **Enum** *method* The return type get|post|put|delete

### Return:

* **Boolean** true The return type is valid

* **Boolean** false An unknown return type

## Api.add(obj, func)

Adds a method to the api and documents it.

 Examples:

     var api = new Api(app);

     api.add({
         "url": urlJoin( "/api/", "Comma", "separated", "path", "components"),
         "param": null | {"paramName": { "desc": "description of param", "opt": null | [ "array of options" ] }, ...
         "desc": "Description of the api method.",
         "return": "POST|PUT|GET|DELETE"
     },
     function(req, res, obj){
         // Api method action with final responses using
         // api.response(res, {errorObject}, {documentObject}, obj);
         // where errorObject and documentObject are user defined
     });

     ...

### Params:

* **Object** *obj* The api object documentation
* **Function** *func* The api function

## Api.response(res, err, doc, obj)

Passes the results of a database manipulation to the response handler,
 alongside the type of request that was made with any corresponding
 errors or documents.

### Params:

* **Object** *res* The response passed by the application
* **Object** *err* The error object
* **Object** *doc* The data document
* **Object** *obj* The request type.

## Api.end()

Signals the Api.add method will no longer be used and, prepares
 the help responses. Also sets up and handles api error for invalid url.

## middleWare(app)

Middle ware to intercept for the Api class

### Params:

* **Object** *app* The express application

### Return:

* **Object** An instantiated API object.

<!-- End server\lib\Api.js -->




<!-- Start server\lib\Error-gulp.js -->

## Error-gulp.js

This holds the error handlers for Gulp.

## ErrorGulp

This class holds all the error haandlers for Gulp.

## ErrorGulp.git(err)

Processes a gulp-git error

### Params:

* **Object** *err* The error being handled

## ErrorGulp.exec(err, stdout, stderr)

Handles errors for gulp-exec.

### Params:

* **Object** *err* The error being handled
* **Stream** *stdout* stdout stream
* **Stream** *stderr* stderr stream

## middleWare()

Error handler middle ware intercept function

<!-- End server\lib\Error-gulp.js -->




<!-- Start server\lib\ErrorHandler.js -->

## Error.js

This holds the error handlers for the application.

## ErrorHandler

This class holds all the error responses for the application.

## ErrorHandler.notFound(req, res, next)

Process a 404 missing resource

### Params:

* **Object** *req* The request passed by the application
* **Object** *res* The response passed by the application
* **Function** *next* The function to the next express item

## ErrorHandler.server(err, req, res, next)

Processes a 500 server error

See: tested against ini.mode for `dev|prod`.          `dev` leaks stack trace to user

### Params:

* **Object** *err* The error passed by the application
* **Object** *req* The request passed by the application
* **Object** *res* The response passed by the application
* **Function** *next* The function to the next express item

## middleWare(app)

Error handler middle ware intercept function

### Params:

* **Object** *app* The express application

<!-- End server\lib\ErrorHandler.js -->




<!-- Start server\lib\GlobalApplication.js -->

## GlobalApplication.js

Holds the Global application obj, this object determines information about the
 running application and resolves which configuration file to use. It also
 creates creates logging function wrappers that appends '[appName]' to the
 console logs to help diferentiate message made by the developers from those
 made by dependencies or the system.

## GlobalApplication

The Global application object, ties in configurations package information and application reporting.
 To be run from app.js

 Examples:

     //  Get application root directory and system mode
     var root = path.resolve(__dirname);
     var mode = process.env.TS_RUN_MODE;

     // Set application mode to: development | production
     global.app = require('./server/lib/GlobalApplication.js')(mode, root);

### Params:

* **JSON** *pJson* The package.json contents. Supplied by middleWare function.
* **String** *mode* The ini/(developement|production|gulp).js file to use.
* **String** *root* The application root directory.

## GlobalApplication.console.log(Anything)

Prepends the '[appName appVersion]'

 Examples:

     global.app.console.log( "Message" );
     //  Outputs [ appName versionName ] Message

### Params:

* **List** *Anything* that can be passed to console.log

## GlobalApplication.console.err(Anything)

Prepends the '[appName appVersion:ERROR]' and highlights message as red

 Examples:

     global.app.console.err( "Message" );
     //  Outputs [ appName versionName:ERROR ] Message

### Params:

* **List** *Anything* that can be passed to console.log

## GlobalApplication.ini()

Generates the path to the configuration file

### Return:

* **String** Path to the configuration file to use

## middleWare(mode, root)

GlobalApplication middle ware intercept function

### Params:

* **String** *mode* The ini/(developement|production|gulp).js file to use.
* **String** *root* The application root directory.

<!-- End server\lib\GlobalApplication.js -->




<!-- Start server\lib\mongodb.js -->

## mongodb.js

The database driver wrapper. It processes schema into models and then set up
 connection handlers before attempting to start a connection to the database.

## middleWare 
 GlobalApplication middle ware intercept function

 Examples:

     mdb = {
         models: {}, //  All the MongoDB models
         schema: {}, //  All the MongoDB scemas
         mongoose: require('mongoose')   //  The instance of mongoose to use
    };()

### Return:

* **Obj** The Mongo DB connection object, see the example

Waiting for connection

<!-- End server\lib\mongodb.js -->




<!-- Start server\lib\Security.js -->

## Security.js

The Security handler for the application.

 code modified from http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript

## Security

This is the Security object. It adds hashing and authentication to the application..

 ### Examples:

     var security = new Security();
     var salt = security.salt();
     var hash = security.hash(req.params.pass, salt);

## Security.hash(Input, Salt)

Generates a hash from the input and salt values

 Examples:

     var security = new Security();

     savedHash == security.hash("InputString", savedSalt) ?
         console.log("Same input String") :
         console.log("Different input String");

### Params:

* **String** *Input* to hash
* **String** *Salt* to use in hash

### Return:

* **String** Hash string

## Security.salt()

Generate a salt to use for Hashing

### Return:

* **String** A cryptoplogically secure GUID to use                          as a salt during Hashing

## Security.s4()

Generate a Four digit salt

### Return:

* **String** Four digit salt

## ssl(app)

Enable ssl security if ini.security.ssl.state == true

### Params:

* **obj** *app* The express application

## middleWare()

Middleware to intercept for the Security class

### Return:

* **Object** An instantiated Security object.

<!-- End server\lib\Security.js -->




<!-- Start server\routes\api.js -->

## api.js

This is the API routing file it determines the content to be saved
 or served back

## fileOptions()

Generates an array of document aliases from the ini.file.docs object

### Return:

* **Array** An array of Document aliases

## middleWare(app, mdb)

Sets up API routing. Self Documenting methods are added to the api, They are
self documenting because the first paramter adds itself to the API help object.

See: /api/get/help For generated methods

### Params:

* **Object** *app* The express application reference
* **Object** *mdb* The mongoDB database object

<!-- End server\routes\api.js -->




<!-- Start server\routes\paths.js -->

## paths.js

This is the url routing file it determines the controller or file that will
 be served by the node server.

## middleWare(app)

Sets up static and dynamic routing from the configuration file.

### Params:

* **Object** *app* The express application reference

<!-- End server\routes\paths.js -->




<!-- Start www\app\js\audio.js -->

## audio.js

This is a research file for web audio api it is not used in the project.

<!-- End www\app\js\audio.js -->




<!-- Start www\app\js\DropDown.js -->

## DropDown.js

Contains the class for the DropDown menu.

## DropDown

This is the DropDown class it determines what content is
 displayed in the menu.

## DropDown.init(Object)

Initializes the DropDown menu, should be run on load.

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.init({
         {String} dropDownId: The DropDown id of the DropDown element,
         {String} navigationId: The navigation menu id of the DropDown element
     });

### Params:

* **Object** *Object* The initialization object

## DropDown.open()

Opens the DropDown menu

## DropDown.close()

Closes the DropDown menu

## DropDown.toggle()

Toggles the DropDown

## DropDown.panel.set.fxCatalog(json)

Adds effects to the fx catalog

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.fxCatalog({
         {String} title = The title of an fxObj,
         {String} desc  =  The description of an fxObj,
         {String} image = The URL to the icon image of an fxObj
     });

### Params:

* **Array.fxObj** *json* An array of fxObjects

## DropDown.panel.set.mixCatalog(json)

Adds mixes to the mix catalog

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.mixCatalog({
         {String} title = The title of an mixObj,
         {String} date  = The date of a mixObj creation,
         {String} image = The URL to the icon image of an mixObj
     });

### Params:

* **Array.mixObj** *json* An array of mixObjects

## DropDown.panel.set.account(obj)

Sets the account panel information

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.account({
         {String} name: The name of the account holder,
         {String} email: The name of the email holder
     });

### Params:

* **Object** *obj* The account information.

## DropDown.panel.set.information(obj)

Adds selected item descriptions, titles, images, etc

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.information({
         {String}    title:   The title of the information being displayed
         {URL}       image:   The URL of an image to display
         {String}    desc:    The description of the content being displayed
     });

### Params:

* **Object** *obj* The selected item information object

## DropDown.panel.load(options, pre, success, fail)

Loads information for panels and handles succesful returns and failures. It is
 A modification of the $.ajax function

### Params:

* **Object** *options* an $.ajax settings object
* **Function** *pre* the function to run before the ajax call
* **Function** *success* the function to call after a succesful ajax call
* **Function** *fail* the function to call after a failed ajax call

## DropDown.panel.display.toggle(state, toggleClass)

Displays or hides a panel from view.

### Params:

* **Boolean** *state* The display state of a panel
* **String** *toggleClass* The panel class to control

## DropDown.panel.display.all(state)

Modify the display state of all panels

### Params:

* **Boolean** *state* The state to place all panels

## DropDown.panel.display.left(state)

Modify the display state of all left side panels

### Params:

* **Boolean** *state* The state to place left side panels

## DropDown.panel.display.right(state)

Modify the display state of all right side panels

### Params:

* **Boolean** *state* The state to place right side panels

## DropDown.panel.display.wait.start(position)

Start a wait screen. {Currently disabled}

### Params:

* **Enum** *position* LEFT|RIGHT|ALL The wait screen(s) to start displaying.

switch(position){
                    case 'LEFT':
                        _this.panel.display.left(false);
                        _this.panel.display.toggle(true, '.wait-left-panel' );
                        return;
                    case 'RIGHT':
                        _this.panel.display.right(false);
                        _this.panel.display.toggle(true, '.wait-right-panel' );
                        return;
                    case 'ALL':
                        _this.panel.display.all(false);
                        _this.panel.display.toggle(true, '.wait-right-panel' );
                        _this.panel.display.toggle(true, '.wait-left-panel' );
                        return;
                }

## DropDown.panel.display.wait.start(position)

Stop a wait screen. {Currently disabled}

### Params:

* **Enum** *position* LEFT|RIGHT|ALL The wait screen(s) to stop displaying.

switch(position){
                    case 'LEFT':
                        _this.panel.display.toggle(false, '.wait-left-panel' );
                        return;
                    case 'RIGHT':
                        _this.panel.display.toggle(false, '.wait-right-panel' );
                        return;
                    case 'ALL':
                        _this.panel.display.toggle(false, '.wait-right-panel' );
                        _this.panel.display.toggle(false, '.wait-left-panel' );
                        return;
                }

## DropDown.navigation.display.toggle(state, toggleClass)

Toggle the display of a navbar element

### Params:

* **Boolean** *state* The display state to place a navbar element in
* **String** *toggleClass* The class of the navbar element to modify

## DropDown.navigation.display.all(state)

Toggle the display of all navbar elements

### Params:

* **Boolean** *state* The display state to place all navbar element in

## DropDown.navigation.display.secured(state)

Toggle the display of all secured view navbar elements
 This is the logged in state

### Params:

* **Boolean** *state* The display state to place all secured view navbar element in

## DropDown.navigation.display.unsecured(state)

Toggle the display of all unsecured view navbar elements
 This is the logged out state

### Params:

* **Boolean** *state* The display state to place all unsecured view navbar element in

## DropDown.navigation.display.lock(state)

Toggle the Logged in view state

### Params:

* **Boolean** *state* The state of the secured view

## DropDown.show(view, opt)

Makes the views that the dropdown manages

### Params:

* **String** *view* The view to display
* **String** *opt* Options to pass the views

<!-- End www\app\js\DropDown.js -->




<!-- Start www\app\js\init.js -->

## require 
 This is a client side function that emulates the action of require for
 loaded node_modules that are being served through static virtual directory.

 It is used to resolve the dependency without modifying the node_module itself
 this is important because any changes to the node_module locally will not
 propogate when being rebuilt.(src)

### Params:

* *src* The string name being required

### Return:

* The code being required

## getCookie 
 Retrieves cookies from the system, this function is necessary
 because artifacts were being passed prepended to the cookie
 value.(name)

### Params:

* *name* The cookie name to search for

### Return:

* ret The value of the cookie

<!-- End www\app\js\init.js -->




<!-- Start www\app\js\knob.js -->

Downward compatible, touchable dial

Version: 1.2.12
Requires: jQuery v1.7+

Copyright (c) 2012 Anthony Terrien
Under MIT License (http://www.opensource.org/licenses/mit-license.php)

Thanks to vor, eskimoblood, spiffistan, FabrizioC

Kontrol library

## k

Definition of globals and core

## o()

Kontrol Object

Definition of an abstract UI control

Each concrete component must call this one.
<code>
k.o.call(this);
</code>

## Dial()

k.Dial

<!-- End www\app\js\knob.js -->




<!-- Start www\app\js\mixer.js -->

## $()

## $()

Add data to the mute & record buttons

## $()

Set up track names

## $()

Set up EQ knobs

## $()

Set up pan knobs

## $()

Set up volume sliders

## $()

Knob function

## $()

Slider function

## $()

Mute buttons

## $()

Recording buttons

## $()

Playback buttons

<!-- End www\app\js\mixer.js -->




<!-- Start www\app\js\onLoad.js -->

<!-- End www\app\js\onLoad.js -->




<!-- Start www\app\js\recorder.js -->

## writeString()

RIFF identifier

RIFF chunk length

## writeString()

RIFF type

## writeString()

format chunk identifier

format chunk length

sample format (raw)

channel count

sample rate

byte rate (sample rate * block align)

block align (channel count * bytes per sample)

bits per sample

## writeString()

data chunk identifier

data chunk length

<!-- End www\app\js\recorder.js -->




<!-- Start www\app\js\recorderWorker.js -->

## recLength

License (MIT)

Copyright © 2013 Matt Diamond

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.

## writeString()

RIFF identifier

file length

## writeString()

RIFF type

## writeString()

format chunk identifier

format chunk length

sample format (raw)

channel count

sample rate

byte rate (sample rate * block align)

block align (channel count * bytes per sample)

bits per sample

## writeString()

data chunk identifier

data chunk length

<!-- End www\app\js\recorderWorker.js -->




<!-- Start www\app\js\StopWatch.js -->

## StopWatch 
 This is a stopwatch that will be used to create a clock to manage tracks play position

 modified from https://gist.github.com/electricg/4372563()

## now 
 Gets current time()

### Return:

* current time

## start 
 start the clock()

## stop 
 stop the clock()

## reset 
 reset the clock time values()

## getTime 
 get the runtime()

### Return:

* the runtime

## pad 
 gives a number formated with leading zeroes(num, size)

### Params:

* *num* the number to pad
* *size* how many digits to show

### Return:

* **STRING** formated number

## formatTime 
Formats the time display(time)

### Params:

* *time* The timestamp to display

### Return:

* the new time string to display

## setId 
 sets the id of the element to insert the clock(id)

### Params:

* *id* the id of the element

## getId 
 get the Id of the element that has the clock()

### Return:

* the id of the clock

## setClocktimer 
 sets the display interval of the clock, In other words it animates changes in time()

## clearClocktimer 
 clears the display interval of the clock, in other words it stops animation()

## update 
 interval function, writes the time of the clock into the element.()

## adjust 
adjusts the clock to a given time(mod)

### Params:

* *mod* the value to adjust the time by

### Return:

* the current laptime

## run 
 This is the command function to the clock, it accepts(action, option)

### Params:

* *action* 'START' - Starts the stopwatch                      'STOP'  -   Stops the stopwatch
                     'RESET' -   Restarts the stopwatch
                     'INIT'  -   Initializes the stopwatch
* *option* Any options that an action requires.          null        no options
         idString    Required by 'INIT', the idstring of the element that will display the clock

### Return:

* The lapTime or RunTime on the stopwatch

<!-- End www\app\js\StopWatch.js -->




<!-- Start www\app\js\track-label.js -->

<!-- End www\app\js\track-label.js -->




<!-- Start www\app\js\volume-meter.js -->

The MIT License (MIT)

Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## createAudioMeter()

Usage:
audioNode = createAudioMeter(audioContext,clipLevel,averaging,clipLag);

audioContext: the AudioContext you're using.
clipLevel: the level (0 to 1) that you would consider "clipping".
   Defaults to 0.98.
averaging: how "smoothed" you would like the meter to be over time.
   Should be between 0 and less than 1.  Defaults to 0.95.
clipLag: how long you would like the "clipping" indicator to show
   after clipping has occured, in milliseconds.  Defaults to 750ms.

Access the clipping through node.checkClipping(); use node.shutdown to get rid of it.

<!-- End www\app\js\volume-meter.js -->




<!-- Start www\app\js\webAudioApi.js -->

## AudioContext

<!-- End www\app\js\webAudioApi.js -->




<!-- Start www\app\js\webAudioInterface.js -->

## $()

var track = [null,null,null,null]

captureAudio();
track.forEach(function(index, track){
     track[index] = new TrackTemplate();
     track[index].InitTrack()
});

console.log("armTrackToggle track:"+trackNumber);
track[trackNumber].armTrackToggle();

console.log("recordToggle track:"+trackNumber);
 thisTrack[tracknumber].recordToggle();
 if(thisTrack[tracknumber].isRecording) {
     track.forEach(function(index, thisTrack){
         if (index != tracknumber)
             track[index].playTrack();
      });
  }

track.forEach(function(index, track){
     track[index].playTrack();
});

track[index].pan.pan.value = amount;

<!-- End www\app\js\webAudioInterface.js -->




<!-- Start app.js -->

## app.js

This file is the controller for the application.

<!-- End app.js -->




<!-- Start gulpfile.js -->

## gulpfile.js

This file holds the gulp task scripts, it is the task runner.

 Examples:
     Usage
          gulp [TASK] [OPTIONS...]

     Available tasks
         code.doc              Documents code base
         code.doc.js           Extracts documentation for JS code.
         code.format           Formats code base
         code.format.css       Formats CSS code.
         code.format.js        Formats JS code.
         code.format.json      Formats JSON code.
         code.lint             Performs all syntax tests
         code.lint.css         Checks css syntax.
         code.lint.jade        Checks jade/pug syntax.
         code.lint.js          Checks JS syntax.
         code.lint.json        Checks json syntax.
         code.prepare          Checks, formats, and documents code base
         git.cred.store        Tell git to store your credentials.
         git.error             Handle commong Git errors
         git.heroku            Pushes code to master branch, heroku branch, and deploys to heroku.
          --m="message"        Commit message to use.
         git.master            Pushes code to master branch.
          --m="message"        Commit message to use.
         help                  Display this help text.
         mongodb.config        Shows the MongoDB config file in json.
         mongodb.create        Creates MongoDB service on windows.
         mongodb.delete        Removes MongoDB service on windows.
         mongodb.start         Starts MongoDB service on windows.
         mongodb.stop          Stops MongoDB service on windows.

## function()

'code.doc.readme.new',

<!-- End gulpfile.js -->




<!-- Start ini\development.js -->
## ini\development.js

The configuration file to use during development. It holds settings for the application.

<!-- End ini\development.js -->




<!-- Start ini\gulp.js -->
## ini\gulp.js

The configuration file to use during gulp tasks. It holds settings for the gulp taskrunner.

<!-- End ini\gulp.js -->




<!-- Start ini\production.js -->
## ini\production.js

The configuration file to use during production.

<!-- End ini\production.js -->




<!-- Start ini\common\cookie.js -->
## ini\common\cookie.js

The configuration file for cookies.

<!-- End ini\common\cookie.js -->




<!-- Start ini\common\db.js -->
## ini\common\db.js

The configuration file for mongodb.

<!-- End ini\common\db.js -->




<!-- Start ini\common\file.js -->
## ini\common\file.js

The configuration file for mapping documents.

<!-- End ini\common\file.js -->




<!-- Start ini\common\map.js -->
## ini\common\map.js

The configuration file for web mapping paths.

<!-- End ini\common\map.js -->




<!-- Start ini\common\paths.js -->
## ini\common\paths.js

The configuration file for absolute paths.

<!-- End ini\common\paths.js -->




<!-- Start ini\common\security.js -->
## ini\common\security.js

The configuration file for security settings.

<!-- End ini\common\security.js -->




<!-- Start server\mvc\controllers\main.js -->
## server\mvc\controllers\main.js

This file holds the GET controller for the main page.

### Function: index(req, res)

The default page for the application

#### Params:

* **Object** *req* The request passed by the application
* **Object** *res* The response passed by the application

<!-- End server\mvc\controllers\main.js -->




<!-- Start server\lib\Api.js -->
## server\lib\Api.js

The Api handler for the application.

### Class: Api

This is the Api class. It adds api point to the express application.

 Examples:

     var api = new Api(app);

     api.add({
         "url": urlJoin( "/api/", "Comma", "separated", "path", "components"),
         "param": null | {"paramName": { "desc": "description of param", "opt": null | [ "array of options" ] }, ...
         "desc": "Description of the api method.",
         "return": "POST|PUT|GET|DELETE"
     },
     function(req, res, obj){
         // Api method action with final responses using
         // api.response(res, {errorObject}, {documentObject}, obj);
         // where errorObject and documentObject are user defined
     });

     ...

     api.end();

#### Params:

* **obj** *app* The express application

### Method: Api.validMethod(method)

Checks to see if valid return type was passed

#### Params:

* **Enum** *method* The return type get|post|put|delete

#### Return:

* **Boolean** true The return type is valid

* **Boolean** false An unknown return type

### Method: Api.add(obj, func)

Adds a method to the api and documents it.

 Examples:

     var api = new Api(app);

     api.add({
         "url": urlJoin( "/api/", "Comma", "separated", "path", "components"),
         "param": null | {"paramName": { "desc": "description of param", "opt": null | [ "array of options" ] }, ...
         "desc": "Description of the api method.",
         "return": "POST|PUT|GET|DELETE"
     },
     function(req, res, obj){
         // Api method action with final responses using
         // api.response(res, {errorObject}, {documentObject}, obj);
         // where errorObject and documentObject are user defined
     });

     ...

#### Params:

* **Object** *obj* The api object documentation
* **Function** *func* The api function

### Method: Api.response(res, err, doc, obj)

Passes the results of a database manipulation to the response handler,
 alongside the type of request that was made with any corresponding
 errors or documents.

#### Params:

* **Object** *res* The response passed by the application
* **Object** *err* The error object
* **Object** *doc* The data document
* **Object** *obj* The request type.

### Method: Api.end()

Signals the Api.add method will no longer be used and, prepares
 the help responses. Also sets up and handles api error for invalid url.

### Function: middleWare(app)

Middle ware to intercept for the Api class

#### Params:

* **Object** *app* The express application

#### Return:

* **Object** An instantiated API object.

<!-- End server\lib\Api.js -->




<!-- Start server\lib\Error-gulp.js -->
## server\lib\Error-gulp.js

This holds the error handlers for Gulp.

### Class: ErrorGulp

This class holds all the error haandlers for Gulp.

### Method: ErrorGulp.git(err)

Processes a gulp-git error

#### Params:

* **Object** *err* The error being handled

### Method: ErrorGulp.exec(err, stdout, stderr)

Handles errors for gulp-exec.

#### Params:

* **Object** *err* The error being handled
* **Stream** *stdout* stdout stream
* **Stream** *stderr* stderr stream

### Function: middleWare()

Error handler middle ware intercept function

<!-- End server\lib\Error-gulp.js -->




<!-- Start server\lib\ErrorHandler.js -->
## server\lib\ErrorHandler.js

This holds the error handlers for the application.

### Class: ErrorHandler

This class holds all the error responses for the application.

### Method: ErrorHandler.notFound(req, res, next)

Process a 404 missing resource

#### Params:

* **Object** *req* The request passed by the application
* **Object** *res* The response passed by the application
* **Function** *next* The function to the next express item

### Method: ErrorHandler.server(err, req, res, next)

Processes a 500 server error

See: tested against ini.mode for `dev|prod`.          `dev` leaks stack trace to user

#### Params:

* **Object** *err* The error passed by the application
* **Object** *req* The request passed by the application
* **Object** *res* The response passed by the application
* **Function** *next* The function to the next express item

### Function: middleWare(app)

Error handler middle ware intercept function

#### Params:

* **Object** *app* The express application

<!-- End server\lib\ErrorHandler.js -->




<!-- Start server\lib\GlobalApplication.js -->
## server\lib\GlobalApplication.js

Holds the Global application obj, this object determines information about the
 running application and resolves which configuration file to use. It also
 creates creates logging function wrappers that appends '[appName]' to the
 console logs to help diferentiate message made by the developers from those
 made by dependencies or the system.

### Class: GlobalApplication

The Global application object, ties in configurations package information and application reporting.
 To be run from app.js

 Examples:

     //  Get application root directory and system mode
     var root = path.resolve(__dirname);
     var mode = process.env.TS_RUN_MODE;

     // Set application mode to: development | production
     global.app = require('./server/lib/GlobalApplication.js')(mode, root);

#### Params:

* **JSON** *pJson* The package.json contents. Supplied by middleWare function.
* **String** *mode* The ini/(developement|production|gulp).js file to use.
* **String** *root* The application root directory.

### Method: GlobalApplication.console.log(Anything)

Prepends the '[appName appVersion]'

 Examples:

     global.app.console.log( "Message" );
     //  Outputs [ appName versionName ] Message

#### Params:

* **List** *Anything* that can be passed to console.log

### Method: GlobalApplication.console.err(Anything)

Prepends the '[appName appVersion:ERROR]' and highlights message as red

 Examples:

     global.app.console.err( "Message" );
     //  Outputs [ appName versionName:ERROR ] Message

#### Params:

* **List** *Anything* that can be passed to console.log

### Method: GlobalApplication.ini()

Generates the path to the configuration file

#### Return:

* **String** Path to the configuration file to use

### Function: middleWare(mode, root)

GlobalApplication middle ware intercept function

#### Params:

* **String** *mode* The ini/(developement|production|gulp).js file to use.
* **String** *root* The application root directory.

<!-- End server\lib\GlobalApplication.js -->




<!-- Start server\lib\mongodb.js -->
## server\lib\mongodb.js

The database driver wrapper. It processes schema into models and then set up
 connection handlers before attempting to start a connection to the database.

### Function: middleWare 
 GlobalApplication middle ware intercept function

 Examples:

     mdb = {
         models: {}, //  All the MongoDB models
         schema: {}, //  All the MongoDB scemas
         mongoose: require('mongoose')   //  The instance of mongoose to use
    };()

#### Return:

* **Obj** The Mongo DB connection object, see the example

Waiting for connection

<!-- End server\lib\mongodb.js -->




<!-- Start server\lib\Security.js -->
## server\lib\Security.js

The Security handler for the application.

 code modified from http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript

### Class: Security

This is the Security object. It adds hashing and authentication to the application..

 ### Examples:

     var security = new Security();
     var salt = security.salt();
     var hash = security.hash(req.params.pass, salt);

### Method: Security.hash(Input, Salt)

Generates a hash from the input and salt values

 Examples:

     var security = new Security();

     savedHash == security.hash("InputString", savedSalt) ?
         console.log("Same input String") :
         console.log("Different input String");

#### Params:

* **String** *Input* to hash
* **String** *Salt* to use in hash

#### Return:

* **String** Hash string

### Method: Security.salt()

Generate a salt to use for Hashing

#### Return:

* **String** A cryptoplogically secure GUID to use                          as a salt during Hashing

### Method: Security.s4()

Generate a Four digit salt

#### Return:

* **String** Four digit salt

### Method: ssl(app)

Enable ssl security if ini.security.ssl.state == true

#### Params:

* **obj** *app* The express application

### Function: middleWare()

Middleware to intercept for the Security class

#### Return:

* **Object** An instantiated Security object.

<!-- End server\lib\Security.js -->




<!-- Start server\routes\api.js -->
## server\routes\api.js

This is the API routing file it determines the content to be saved
 or served back

### Function: fileOptions()

Generates an array of document aliases from the ini.file.docs object

#### Return:

* **Array** An array of Document aliases

### Function: middleWare(app, mdb)

Sets up API routing. Self Documenting methods are added to the api, They are
self documenting because the first paramter adds itself to the API help object.

See: /api/get/help For generated methods

#### Params:

* **Object** *app* The express application reference
* **Object** *mdb* The mongoDB database object

<!-- End server\routes\api.js -->




<!-- Start server\routes\paths.js -->
## server\routes\paths.js

This is the url routing file it determines the controller or file that will
 be served by the node server.

### Function: middleWare(app)

Sets up static and dynamic routing from the configuration file.

#### Params:

* **Object** *app* The express application reference

<!-- End server\routes\paths.js -->




<!-- Start www\app\js\audio.js -->
## www\app\js\audio.js

This is a research file for web audio api it is not used in the project.

<!-- End www\app\js\audio.js -->




<!-- Start www\app\js\DropDown.js -->
## www\app\js\DropDown.js

Contains the class for the DropDown menu.

### Class: DropDown

This is the DropDown class it determines what content is
 displayed in the menu.

### Method: DropDown.init(Object)

Initializes the DropDown menu, should be run on load.

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.init({
         {String} dropDownId: The DropDown id of the DropDown element,
         {String} navigationId: The navigation menu id of the DropDown element
     });

#### Params:

* **Object** *Object* The initialization object

### Method: DropDown.open()

Opens the DropDown menu

### Method: DropDown.close()

Closes the DropDown menu

### Method: DropDown.toggle()

Toggles the DropDown

### Method: DropDown.panel.set.fxCatalog(json)

Adds effects to the fx catalog

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.fxCatalog({
         {String} title = The title of an fxObj,
         {String} desc  =  The description of an fxObj,
         {String} image = The URL to the icon image of an fxObj
     });

#### Params:

* **Array.fxObj** *json* An array of fxObjects

### Method: DropDown.panel.set.mixCatalog(json)

Adds mixes to the mix catalog

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.mixCatalog({
         {String} title = The title of an mixObj,
         {String} date  = The date of a mixObj creation,
         {String} image = The URL to the icon image of an mixObj
     });

#### Params:

* **Array.mixObj** *json* An array of mixObjects

### Method: DropDown.panel.set.account(obj)

Sets the account panel information

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.account({
         {String} name: The name of the account holder,
         {String} email: The name of the email holder
     });

#### Params:

* **Object** *obj* The account information.

### Method: DropDown.panel.set.information(obj)

Adds selected item descriptions, titles, images, etc

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.information({
         {String}    title:   The title of the information being displayed
         {URL}       image:   The URL of an image to display
         {String}    desc:    The description of the content being displayed
     });

#### Params:

* **Object** *obj* The selected item information object

### Method: DropDown.panel.load(options, pre, success, fail)

Loads information for panels and handles succesful returns and failures. It is
 A modification of the $.ajax function

#### Params:

* **Object** *options* an $.ajax settings object
* **Function** *pre* the function to run before the ajax call
* **Function** *success* the function to call after a succesful ajax call
* **Function** *fail* the function to call after a failed ajax call

### Method: DropDown.panel.display.toggle(state, toggleClass)

Displays or hides a panel from view.

#### Params:

* **Boolean** *state* The display state of a panel
* **String** *toggleClass* The panel class to control

### Method: DropDown.panel.display.all(state)

Modify the display state of all panels

#### Params:

* **Boolean** *state* The state to place all panels

### Method: DropDown.panel.display.left(state)

Modify the display state of all left side panels

#### Params:

* **Boolean** *state* The state to place left side panels

### Method: DropDown.panel.display.right(state)

Modify the display state of all right side panels

#### Params:

* **Boolean** *state* The state to place right side panels

### Method: DropDown.panel.display.wait.start(position)

Start a wait screen. {Currently disabled}

#### Params:

* **Enum** *position* LEFT|RIGHT|ALL The wait screen(s) to start displaying.

switch(position){
                    case 'LEFT':
                        _this.panel.display.left(false);
                        _this.panel.display.toggle(true, '.wait-left-panel' );
                        return;
                    case 'RIGHT':
                        _this.panel.display.right(false);
                        _this.panel.display.toggle(true, '.wait-right-panel' );
                        return;
                    case 'ALL':
                        _this.panel.display.all(false);
                        _this.panel.display.toggle(true, '.wait-right-panel' );
                        _this.panel.display.toggle(true, '.wait-left-panel' );
                        return;
                }

### Method: DropDown.panel.display.wait.start(position)

Stop a wait screen. {Currently disabled}

#### Params:

* **Enum** *position* LEFT|RIGHT|ALL The wait screen(s) to stop displaying.

switch(position){
                    case 'LEFT':
                        _this.panel.display.toggle(false, '.wait-left-panel' );
                        return;
                    case 'RIGHT':
                        _this.panel.display.toggle(false, '.wait-right-panel' );
                        return;
                    case 'ALL':
                        _this.panel.display.toggle(false, '.wait-right-panel' );
                        _this.panel.display.toggle(false, '.wait-left-panel' );
                        return;
                }

### Method: DropDown.navigation.display.toggle(state, toggleClass)

Toggle the display of a navbar element

#### Params:

* **Boolean** *state* The display state to place a navbar element in
* **String** *toggleClass* The class of the navbar element to modify

### Method: DropDown.navigation.display.all(state)

Toggle the display of all navbar elements

#### Params:

* **Boolean** *state* The display state to place all navbar element in

### Method: DropDown.navigation.display.secured(state)

Toggle the display of all secured view navbar elements
 This is the logged in state

#### Params:

* **Boolean** *state* The display state to place all secured view navbar element in

### Method: DropDown.navigation.display.unsecured(state)

Toggle the display of all unsecured view navbar elements
 This is the logged out state

#### Params:

* **Boolean** *state* The display state to place all unsecured view navbar element in

### Method: DropDown.navigation.display.lock(state)

Toggle the Logged in view state

#### Params:

* **Boolean** *state* The state of the secured view

### Method: DropDown.show(view, opt)

Makes the views that the dropdown manages

#### Params:

* **String** *view* The view to display
* **String** *opt* Options to pass the views

<!-- End www\app\js\DropDown.js -->




<!-- Start www\app\js\init.js -->
## www\app\js\init.js

### Function: require 
 This is a client side function that emulates the action of require for
 loaded node_modules that are being served through static virtual directory.

 It is used to resolve the dependency without modifying the node_module itself
 this is important because any changes to the node_module locally will not
 propogate when being rebuilt.(src)

#### Params:

* *src* The string name being required

#### Return:

* The code being required

### Function: getCookie 
 Retrieves cookies from the system, this function is necessary
 because artifacts were being passed prepended to the cookie
 value.(name)

#### Params:

* *name* The cookie name to search for

#### Return:

* ret The value of the cookie

<!-- End www\app\js\init.js -->




<!-- Start www\app\js\knob.js -->
## www\app\js\knob.js

Downward compatible, touchable dial

Version: 1.2.12
Requires: jQuery v1.7+

Copyright (c) 2012 Anthony Terrien
Under MIT License (http://www.opensource.org/licenses/mit-license.php)

Thanks to vor, eskimoblood, spiffistan, FabrizioC

Kontrol library

### Class: k

Definition of globals and core

### Method: o()

Kontrol Object

Definition of an abstract UI control

Each concrete component must call this one.
<code>
k.o.call(this);
</code>

### Method: Dial()

k.Dial

<!-- End www\app\js\knob.js -->




<!-- Start www\app\js\mixer.js -->
## www\app\js\mixer.js

### Method: $()

### Method: $()

Add data to the mute & record buttons

### Method: $()

Set up track names

### Method: $()

Set up EQ knobs

### Method: $()

Set up pan knobs

### Method: $()

Set up volume sliders

### Method: $()

Knob function

### Method: $()

Slider function

### Method: $()

Mute buttons

### Method: $()

Recording buttons

### Method: $()

Playback buttons

<!-- End www\app\js\mixer.js -->




<!-- Start www\app\js\onLoad.js -->
## www\app\js\onLoad.js

<!-- End www\app\js\onLoad.js -->




<!-- Start www\app\js\recorder.js -->
## www\app\js\recorder.js

### Method: writeString()

RIFF identifier

RIFF chunk length

### Method: writeString()

RIFF type

### Method: writeString()

format chunk identifier

format chunk length

sample format (raw)

channel count

sample rate

byte rate (sample rate * block align)

block align (channel count * bytes per sample)

bits per sample

### Method: writeString()

data chunk identifier

data chunk length

<!-- End www\app\js\recorder.js -->




<!-- Start www\app\js\recorderWorker.js -->
## www\app\js\recorderWorker.js

### Class: recLength

License (MIT)

Copyright © 2013 Matt Diamond

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.

### Method: writeString()

RIFF identifier

file length

### Method: writeString()

RIFF type

### Method: writeString()

format chunk identifier

format chunk length

sample format (raw)

channel count

sample rate

byte rate (sample rate * block align)

block align (channel count * bytes per sample)

bits per sample

### Method: writeString()

data chunk identifier

data chunk length

<!-- End www\app\js\recorderWorker.js -->




<!-- Start www\app\js\StopWatch.js -->
## www\app\js\StopWatch.js

### Function: StopWatch 
 This is a stopwatch that will be used to create a clock to manage tracks play position

 modified from https://gist.github.com/electricg/4372563()

### Method: now 
 Gets current time()

#### Return:

* current time

### Method: start 
 start the clock()

### Method: stop 
 stop the clock()

### Method: reset 
 reset the clock time values()

### Method: getTime 
 get the runtime()

#### Return:

* the runtime

### Method: pad 
 gives a number formated with leading zeroes(num, size)

#### Params:

* *num* the number to pad
* *size* how many digits to show

#### Return:

* **STRING** formated number

### Method: formatTime 
Formats the time display(time)

#### Params:

* *time* The timestamp to display

#### Return:

* the new time string to display

### Method: setId 
 sets the id of the element to insert the clock(id)

#### Params:

* *id* the id of the element

### Method: getId 
 get the Id of the element that has the clock()

#### Return:

* the id of the clock

### Method: setClocktimer 
 sets the display interval of the clock, In other words it animates changes in time()

### Method: clearClocktimer 
 clears the display interval of the clock, in other words it stops animation()

### Method: update 
 interval function, writes the time of the clock into the element.()

### Method: adjust 
adjusts the clock to a given time(mod)

#### Params:

* *mod* the value to adjust the time by

#### Return:

* the current laptime

### Method: run 
 This is the command function to the clock, it accepts(action, option)

#### Params:

* *action* 'START' - Starts the stopwatch                      'STOP'  -   Stops the stopwatch
                     'RESET' -   Restarts the stopwatch
                     'INIT'  -   Initializes the stopwatch
* *option* Any options that an action requires.          null        no options
         idString    Required by 'INIT', the idstring of the element that will display the clock

#### Return:

* The lapTime or RunTime on the stopwatch

<!-- End www\app\js\StopWatch.js -->




<!-- Start www\app\js\track-label.js -->
## www\app\js\track-label.js

<!-- End www\app\js\track-label.js -->




<!-- Start www\app\js\volume-meter.js -->
## www\app\js\volume-meter.js

The MIT License (MIT)

Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

### Function: createAudioMeter()

Usage:
audioNode = createAudioMeter(audioContext,clipLevel,averaging,clipLag);

audioContext: the AudioContext you're using.
clipLevel: the level (0 to 1) that you would consider "clipping".
   Defaults to 0.98.
averaging: how "smoothed" you would like the meter to be over time.
   Should be between 0 and less than 1.  Defaults to 0.95.
clipLag: how long you would like the "clipping" indicator to show
   after clipping has occured, in milliseconds.  Defaults to 750ms.

Access the clipping through node.checkClipping(); use node.shutdown to get rid of it.

<!-- End www\app\js\volume-meter.js -->




<!-- Start www\app\js\webAudioApi.js -->
## www\app\js\webAudioApi.js

### Class: AudioContext

<!-- End www\app\js\webAudioApi.js -->




<!-- Start www\app\js\webAudioInterface.js -->
## www\app\js\webAudioInterface.js

### Method: $()

var track = [null,null,null,null]

captureAudio();
track.forEach(function(index, track){
     track[index] = new TrackTemplate();
     track[index].InitTrack()
});

console.log("armTrackToggle track:"+trackNumber);
track[trackNumber].armTrackToggle();

console.log("recordToggle track:"+trackNumber);
 thisTrack[tracknumber].recordToggle();
 if(thisTrack[tracknumber].isRecording) {
     track.forEach(function(index, thisTrack){
         if (index != tracknumber)
             track[index].playTrack();
      });
  }

track.forEach(function(index, track){
     track[index].playTrack();
});

track[index].pan.pan.value = amount;

<!-- End www\app\js\webAudioInterface.js -->




<!-- Start app.js -->
## app.js

This file is the controller for the application.

<!-- End app.js -->




<!-- Start gulpfile.js -->
## gulpfile.js

This file holds the gulp task scripts, it is the task runner.

 Examples:
     Usage
          gulp [TASK] [OPTIONS...]

     Available tasks
         code.doc              Documents code base
         code.doc.js           Extracts documentation for JS code.
         code.format           Formats code base
         code.format.css       Formats CSS code.
         code.format.js        Formats JS code.
         code.format.json      Formats JSON code.
         code.lint             Performs all syntax tests
         code.lint.css         Checks css syntax.
         code.lint.jade        Checks jade/pug syntax.
         code.lint.js          Checks JS syntax.
         code.lint.json        Checks json syntax.
         code.prepare          Checks, formats, and documents code base
         git.cred.store        Tell git to store your credentials.
         git.error             Handle commong Git errors
         git.heroku            Pushes code to master branch, heroku branch, and deploys to heroku.
          --m="message"        Commit message to use.
         git.master            Pushes code to master branch.
          --m="message"        Commit message to use.
         help                  Display this help text.
         mongodb.config        Shows the MongoDB config file in json.
         mongodb.create        Creates MongoDB service on windows.
         mongodb.delete        Removes MongoDB service on windows.
         mongodb.start         Starts MongoDB service on windows.
         mongodb.stop          Stops MongoDB service on windows.

### Method: function()

'code.doc.readme.new',

<!-- End gulpfile.js -->




<!-- Start ini\development.js -->
## ini\development.js

The configuration file to use during development. It holds settings for the application.

<!-- End ini\development.js -->




<!-- Start ini\gulp.js -->
## ini\gulp.js

The configuration file to use during gulp tasks. It holds settings for the gulp taskrunner.

<!-- End ini\gulp.js -->




<!-- Start ini\production.js -->
## ini\production.js

The configuration file to use during production.

<!-- End ini\production.js -->




<!-- Start ini\common\cookie.js -->
## ini\common\cookie.js

The configuration file for cookies.

<!-- End ini\common\cookie.js -->




<!-- Start ini\common\db.js -->
## ini\common\db.js

The configuration file for mongodb.

<!-- End ini\common\db.js -->




<!-- Start ini\common\file.js -->
## ini\common\file.js

The configuration file for mapping documents.

<!-- End ini\common\file.js -->




<!-- Start ini\common\map.js -->
## ini\common\map.js

The configuration file for web mapping paths.

<!-- End ini\common\map.js -->




<!-- Start ini\common\paths.js -->
## ini\common\paths.js

The configuration file for absolute paths.

<!-- End ini\common\paths.js -->




<!-- Start ini\common\security.js -->
## ini\common\security.js

The configuration file for security settings.

<!-- End ini\common\security.js -->




<!-- Start server\mvc\controllers\main.js -->
## server\mvc\controllers\main.js

This file holds the GET controller for the main page.

### Function: index(req, res)

The default page for the application

#### Params:

* **Object** *req* The request passed by the application
* **Object** *res* The response passed by the application

<!-- End server\mvc\controllers\main.js -->




<!-- Start server\lib\Api.js -->
## server\lib\Api.js

The Api handler for the application.

### Class: Api

This is the Api class. It adds api point to the express application.

 Examples:

     var api = new Api(app);

     api.add({
         "url": urlJoin( "/api/", "Comma", "separated", "path", "components"),
         "param": null | {"paramName": { "desc": "description of param", "opt": null | [ "array of options" ] }, ...
         "desc": "Description of the api method.",
         "return": "POST|PUT|GET|DELETE"
     },
     function(req, res, obj){
         // Api method action with final responses using
         // api.response(res, {errorObject}, {documentObject}, obj);
         // where errorObject and documentObject are user defined
     });

     ...

     api.end();

#### Params:

* **obj** *app* The express application

### Method: Api.validMethod(method)

Checks to see if valid return type was passed

#### Params:

* **Enum** *method* The return type get|post|put|delete

#### Return:

* **Boolean** true The return type is valid

* **Boolean** false An unknown return type

### Method: Api.add(obj, func)

Adds a method to the api and documents it.

 Examples:

     var api = new Api(app);

     api.add({
         "url": urlJoin( "/api/", "Comma", "separated", "path", "components"),
         "param": null | {"paramName": { "desc": "description of param", "opt": null | [ "array of options" ] }, ...
         "desc": "Description of the api method.",
         "return": "POST|PUT|GET|DELETE"
     },
     function(req, res, obj){
         // Api method action with final responses using
         // api.response(res, {errorObject}, {documentObject}, obj);
         // where errorObject and documentObject are user defined
     });

     ...

#### Params:

* **Object** *obj* The api object documentation
* **Function** *func* The api function

### Method: Api.response(res, err, doc, obj)

Passes the results of a database manipulation to the response handler,
 alongside the type of request that was made with any corresponding
 errors or documents.

#### Params:

* **Object** *res* The response passed by the application
* **Object** *err* The error object
* **Object** *doc* The data document
* **Object** *obj* The request type.

### Method: Api.end()

Signals the Api.add method will no longer be used and, prepares
 the help responses. Also sets up and handles api error for invalid url.

### Function: middleWare(app)

Middle ware to intercept for the Api class

#### Params:

* **Object** *app* The express application

#### Return:

* **Object** An instantiated API object.

<!-- End server\lib\Api.js -->




<!-- Start server\lib\Error-gulp.js -->
## server\lib\Error-gulp.js

This holds the error handlers for Gulp.

### Class: ErrorGulp

This class holds all the error haandlers for Gulp.

### Method: ErrorGulp.git(err)

Processes a gulp-git error

#### Params:

* **Object** *err* The error being handled

### Method: ErrorGulp.exec(err, stdout, stderr)

Handles errors for gulp-exec.

#### Params:

* **Object** *err* The error being handled
* **Stream** *stdout* stdout stream
* **Stream** *stderr* stderr stream

### Function: middleWare()

Error handler middle ware intercept function

<!-- End server\lib\Error-gulp.js -->




<!-- Start server\lib\ErrorHandler.js -->
## server\lib\ErrorHandler.js

This holds the error handlers for the application.

### Class: ErrorHandler

This class holds all the error responses for the application.

### Method: ErrorHandler.notFound(req, res, next)

Process a 404 missing resource

#### Params:

* **Object** *req* The request passed by the application
* **Object** *res* The response passed by the application
* **Function** *next* The function to the next express item

### Method: ErrorHandler.server(err, req, res, next)

Processes a 500 server error

See: tested against ini.mode for `dev|prod`.          `dev` leaks stack trace to user

#### Params:

* **Object** *err* The error passed by the application
* **Object** *req* The request passed by the application
* **Object** *res* The response passed by the application
* **Function** *next* The function to the next express item

### Function: middleWare(app)

Error handler middle ware intercept function

#### Params:

* **Object** *app* The express application

<!-- End server\lib\ErrorHandler.js -->




<!-- Start server\lib\GlobalApplication.js -->
## server\lib\GlobalApplication.js

Holds the Global application obj, this object determines information about the
 running application and resolves which configuration file to use. It also
 creates creates logging function wrappers that appends '[appName]' to the
 console logs to help diferentiate message made by the developers from those
 made by dependencies or the system.

### Class: GlobalApplication

The Global application object, ties in configurations package information and application reporting.
 To be run from app.js

 Examples:

     //  Get application root directory and system mode
     var root = path.resolve(__dirname);
     var mode = process.env.TS_RUN_MODE;

     // Set application mode to: development | production
     global.app = require('./server/lib/GlobalApplication.js')(mode, root);

#### Params:

* **JSON** *pJson* The package.json contents. Supplied by middleWare function.
* **String** *mode* The ini/(developement|production|gulp).js file to use.
* **String** *root* The application root directory.

### Method: GlobalApplication.console.log(Anything)

Prepends the '[appName appVersion]'

 Examples:

     global.app.console.log( "Message" );
     //  Outputs [ appName versionName ] Message

#### Params:

* **List** *Anything* that can be passed to console.log

### Method: GlobalApplication.console.err(Anything)

Prepends the '[appName appVersion:ERROR]' and highlights message as red

 Examples:

     global.app.console.err( "Message" );
     //  Outputs [ appName versionName:ERROR ] Message

#### Params:

* **List** *Anything* that can be passed to console.log

### Method: GlobalApplication.ini()

Generates the path to the configuration file

#### Return:

* **String** Path to the configuration file to use

### Function: middleWare(mode, root)

GlobalApplication middle ware intercept function

#### Params:

* **String** *mode* The ini/(developement|production|gulp).js file to use.
* **String** *root* The application root directory.

<!-- End server\lib\GlobalApplication.js -->




<!-- Start server\lib\mongodb.js -->
## server\lib\mongodb.js

The database driver wrapper. It processes schema into models and then set up
 connection handlers before attempting to start a connection to the database.

### Function: middleWare 
 GlobalApplication middle ware intercept function

 Examples:

     mdb = {
         models: {}, //  All the MongoDB models
         schema: {}, //  All the MongoDB scemas
         mongoose: require('mongoose')   //  The instance of mongoose to use
    };()

#### Return:

* **Obj** The Mongo DB connection object, see the example

Waiting for connection

<!-- End server\lib\mongodb.js -->




<!-- Start server\lib\Security.js -->
## server\lib\Security.js

The Security handler for the application.

 code modified from http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript

### Class: Security

This is the Security object. It adds hashing and authentication to the application..

 ### Examples:

     var security = new Security();
     var salt = security.salt();
     var hash = security.hash(req.params.pass, salt);

### Method: Security.hash(Input, Salt)

Generates a hash from the input and salt values

 Examples:

     var security = new Security();

     savedHash == security.hash("InputString", savedSalt) ?
         console.log("Same input String") :
         console.log("Different input String");

#### Params:

* **String** *Input* to hash
* **String** *Salt* to use in hash

#### Return:

* **String** Hash string

### Method: Security.salt()

Generate a salt to use for Hashing

#### Return:

* **String** A cryptoplogically secure GUID to use                          as a salt during Hashing

### Method: Security.s4()

Generate a Four digit salt

#### Return:

* **String** Four digit salt

### Method: ssl(app)

Enable ssl security if ini.security.ssl.state == true

#### Params:

* **obj** *app* The express application

### Function: middleWare()

Middleware to intercept for the Security class

#### Return:

* **Object** An instantiated Security object.

<!-- End server\lib\Security.js -->




<!-- Start server\routes\api.js -->
## server\routes\api.js

This is the API routing file it determines the content to be saved
 or served back

### Function: fileOptions()

Generates an array of document aliases from the ini.file.docs object

#### Return:

* **Array** An array of Document aliases

### Function: middleWare(app, mdb)

Sets up API routing. Self Documenting methods are added to the api, They are
self documenting because the first paramter adds itself to the API help object.

See: /api/get/help For generated methods

#### Params:

* **Object** *app* The express application reference
* **Object** *mdb* The mongoDB database object

<!-- End server\routes\api.js -->




<!-- Start server\routes\paths.js -->
## server\routes\paths.js

This is the url routing file it determines the controller or file that will
 be served by the node server.

### Function: middleWare(app)

Sets up static and dynamic routing from the configuration file.

#### Params:

* **Object** *app* The express application reference

<!-- End server\routes\paths.js -->




<!-- Start www\app\js\audio.js -->
## www\app\js\audio.js

This is a research file for web audio api it is not used in the project.

<!-- End www\app\js\audio.js -->




<!-- Start www\app\js\DropDown.js -->
## www\app\js\DropDown.js

Contains the class for the DropDown menu.

### Class: DropDown

This is the DropDown class it determines what content is
 displayed in the menu.

### Method: DropDown.init(Object)

Initializes the DropDown menu, should be run on load.

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.init({
         {String} dropDownId: The DropDown id of the DropDown element,
         {String} navigationId: The navigation menu id of the DropDown element
     });

#### Params:

* **Object** *Object* The initialization object

### Method: DropDown.open()

Opens the DropDown menu

### Method: DropDown.close()

Closes the DropDown menu

### Method: DropDown.toggle()

Toggles the DropDown

### Method: DropDown.panel.set.fxCatalog(json)

Adds effects to the fx catalog

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.fxCatalog({
         {String} title = The title of an fxObj,
         {String} desc  =  The description of an fxObj,
         {String} image = The URL to the icon image of an fxObj
     });

#### Params:

* **Array.fxObj** *json* An array of fxObjects

### Method: DropDown.panel.set.mixCatalog(json)

Adds mixes to the mix catalog

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.mixCatalog({
         {String} title = The title of an mixObj,
         {String} date  = The date of a mixObj creation,
         {String} image = The URL to the icon image of an mixObj
     });

#### Params:

* **Array.mixObj** *json* An array of mixObjects

### Method: DropDown.panel.set.account(obj)

Sets the account panel information

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.account({
         {String} name: The name of the account holder,
         {String} email: The name of the email holder
     });

#### Params:

* **Object** *obj* The account information.

### Method: DropDown.panel.set.information(obj)

Adds selected item descriptions, titles, images, etc

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.information({
         {String}    title:   The title of the information being displayed
         {URL}       image:   The URL of an image to display
         {String}    desc:    The description of the content being displayed
     });

#### Params:

* **Object** *obj* The selected item information object

### Method: DropDown.panel.load(options, pre, success, fail)

Loads information for panels and handles succesful returns and failures. It is
 A modification of the $.ajax function

#### Params:

* **Object** *options* an $.ajax settings object
* **Function** *pre* the function to run before the ajax call
* **Function** *success* the function to call after a succesful ajax call
* **Function** *fail* the function to call after a failed ajax call

### Method: DropDown.panel.display.toggle(state, toggleClass)

Displays or hides a panel from view.

#### Params:

* **Boolean** *state* The display state of a panel
* **String** *toggleClass* The panel class to control

### Method: DropDown.panel.display.all(state)

Modify the display state of all panels

#### Params:

* **Boolean** *state* The state to place all panels

### Method: DropDown.panel.display.left(state)

Modify the display state of all left side panels

#### Params:

* **Boolean** *state* The state to place left side panels

### Method: DropDown.panel.display.right(state)

Modify the display state of all right side panels

#### Params:

* **Boolean** *state* The state to place right side panels

### Method: DropDown.panel.display.wait.start(position)

Start a wait screen. {Currently disabled}

#### Params:

* **Enum** *position* LEFT|RIGHT|ALL The wait screen(s) to start displaying.

switch(position){
                    case 'LEFT':
                        _this.panel.display.left(false);
                        _this.panel.display.toggle(true, '.wait-left-panel' );
                        return;
                    case 'RIGHT':
                        _this.panel.display.right(false);
                        _this.panel.display.toggle(true, '.wait-right-panel' );
                        return;
                    case 'ALL':
                        _this.panel.display.all(false);
                        _this.panel.display.toggle(true, '.wait-right-panel' );
                        _this.panel.display.toggle(true, '.wait-left-panel' );
                        return;
                }

### Method: DropDown.panel.display.wait.start(position)

Stop a wait screen. {Currently disabled}

#### Params:

* **Enum** *position* LEFT|RIGHT|ALL The wait screen(s) to stop displaying.

switch(position){
                    case 'LEFT':
                        _this.panel.display.toggle(false, '.wait-left-panel' );
                        return;
                    case 'RIGHT':
                        _this.panel.display.toggle(false, '.wait-right-panel' );
                        return;
                    case 'ALL':
                        _this.panel.display.toggle(false, '.wait-right-panel' );
                        _this.panel.display.toggle(false, '.wait-left-panel' );
                        return;
                }

### Method: DropDown.navigation.display.toggle(state, toggleClass)

Toggle the display of a navbar element

#### Params:

* **Boolean** *state* The display state to place a navbar element in
* **String** *toggleClass* The class of the navbar element to modify

### Method: DropDown.navigation.display.all(state)

Toggle the display of all navbar elements

#### Params:

* **Boolean** *state* The display state to place all navbar element in

### Method: DropDown.navigation.display.secured(state)

Toggle the display of all secured view navbar elements
 This is the logged in state

#### Params:

* **Boolean** *state* The display state to place all secured view navbar element in

### Method: DropDown.navigation.display.unsecured(state)

Toggle the display of all unsecured view navbar elements
 This is the logged out state

#### Params:

* **Boolean** *state* The display state to place all unsecured view navbar element in

### Method: DropDown.navigation.display.lock(state)

Toggle the Logged in view state

#### Params:

* **Boolean** *state* The state of the secured view

### Method: DropDown.show(view, opt)

Makes the views that the dropdown manages

#### Params:

* **String** *view* The view to display
* **String** *opt* Options to pass the views

<!-- End www\app\js\DropDown.js -->




<!-- Start www\app\js\init.js -->
## www\app\js\init.js

### Function: require 
 This is a client side function that emulates the action of require for
 loaded node_modules that are being served through static virtual directory.

 It is used to resolve the dependency without modifying the node_module itself
 this is important because any changes to the node_module locally will not
 propogate when being rebuilt.(src)

#### Params:

* *src* The string name being required

#### Return:

* The code being required

### Function: getCookie 
 Retrieves cookies from the system, this function is necessary
 because artifacts were being passed prepended to the cookie
 value.(name)

#### Params:

* *name* The cookie name to search for

#### Return:

* ret The value of the cookie

<!-- End www\app\js\init.js -->




<!-- Start www\app\js\knob.js -->
## www\app\js\knob.js

Downward compatible, touchable dial

Version: 1.2.12
Requires: jQuery v1.7+

Copyright (c) 2012 Anthony Terrien
Under MIT License (http://www.opensource.org/licenses/mit-license.php)

Thanks to vor, eskimoblood, spiffistan, FabrizioC

Kontrol library

### Class: k

Definition of globals and core

### Method: o()

Kontrol Object

Definition of an abstract UI control

Each concrete component must call this one.
<code>
k.o.call(this);
</code>

### Method: Dial()

k.Dial

<!-- End www\app\js\knob.js -->




<!-- Start www\app\js\mixer.js -->
## www\app\js\mixer.js

### Method: $()

### Method: $()

Add data to the mute & record buttons

### Method: $()

Set up track names

### Method: $()

Set up EQ knobs

### Method: $()

Set up pan knobs

### Method: $()

Set up volume sliders

### Method: $()

Knob function

### Method: $()

Slider function

### Method: $()

Mute buttons

### Method: $()

Recording buttons

### Method: $()

Playback buttons

<!-- End www\app\js\mixer.js -->




<!-- Start www\app\js\onLoad.js -->
## www\app\js\onLoad.js

<!-- End www\app\js\onLoad.js -->




<!-- Start www\app\js\recorder.js -->
## www\app\js\recorder.js

### Method: writeString()

RIFF identifier

RIFF chunk length

### Method: writeString()

RIFF type

### Method: writeString()

format chunk identifier

format chunk length

sample format (raw)

channel count

sample rate

byte rate (sample rate * block align)

block align (channel count * bytes per sample)

bits per sample

### Method: writeString()

data chunk identifier

data chunk length

<!-- End www\app\js\recorder.js -->




<!-- Start www\app\js\recorderWorker.js -->
## www\app\js\recorderWorker.js

### Class: recLength

License (MIT)

Copyright © 2013 Matt Diamond

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.

### Method: writeString()

RIFF identifier

file length

### Method: writeString()

RIFF type

### Method: writeString()

format chunk identifier

format chunk length

sample format (raw)

channel count

sample rate

byte rate (sample rate * block align)

block align (channel count * bytes per sample)

bits per sample

### Method: writeString()

data chunk identifier

data chunk length

<!-- End www\app\js\recorderWorker.js -->




<!-- Start www\app\js\StopWatch.js -->
## www\app\js\StopWatch.js

### Function: StopWatch 
 This is a stopwatch that will be used to create a clock to manage tracks play position

 modified from https://gist.github.com/electricg/4372563()

### Method: now 
 Gets current time()

#### Return:

* current time

### Method: start 
 start the clock()

### Method: stop 
 stop the clock()

### Method: reset 
 reset the clock time values()

### Method: getTime 
 get the runtime()

#### Return:

* the runtime

### Method: pad 
 gives a number formated with leading zeroes(num, size)

#### Params:

* *num* the number to pad
* *size* how many digits to show

#### Return:

* **STRING** formated number

### Method: formatTime 
Formats the time display(time)

#### Params:

* *time* The timestamp to display

#### Return:

* the new time string to display

### Method: setId 
 sets the id of the element to insert the clock(id)

#### Params:

* *id* the id of the element

### Method: getId 
 get the Id of the element that has the clock()

#### Return:

* the id of the clock

### Method: setClocktimer 
 sets the display interval of the clock, In other words it animates changes in time()

### Method: clearClocktimer 
 clears the display interval of the clock, in other words it stops animation()

### Method: update 
 interval function, writes the time of the clock into the element.()

### Method: adjust 
adjusts the clock to a given time(mod)

#### Params:

* *mod* the value to adjust the time by

#### Return:

* the current laptime

### Method: run 
 This is the command function to the clock, it accepts(action, option)

#### Params:

* *action* 'START' - Starts the stopwatch                      'STOP'  -   Stops the stopwatch
                     'RESET' -   Restarts the stopwatch
                     'INIT'  -   Initializes the stopwatch
* *option* Any options that an action requires.          null        no options
         idString    Required by 'INIT', the idstring of the element that will display the clock

#### Return:

* The lapTime or RunTime on the stopwatch

<!-- End www\app\js\StopWatch.js -->




<!-- Start www\app\js\track-label.js -->
## www\app\js\track-label.js

<!-- End www\app\js\track-label.js -->




<!-- Start www\app\js\volume-meter.js -->
## www\app\js\volume-meter.js

The MIT License (MIT)

Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

### Function: createAudioMeter()

Usage:
audioNode = createAudioMeter(audioContext,clipLevel,averaging,clipLag);

audioContext: the AudioContext you're using.
clipLevel: the level (0 to 1) that you would consider "clipping".
   Defaults to 0.98.
averaging: how "smoothed" you would like the meter to be over time.
   Should be between 0 and less than 1.  Defaults to 0.95.
clipLag: how long you would like the "clipping" indicator to show
   after clipping has occured, in milliseconds.  Defaults to 750ms.

Access the clipping through node.checkClipping(); use node.shutdown to get rid of it.

<!-- End www\app\js\volume-meter.js -->




<!-- Start www\app\js\webAudioApi.js -->
## www\app\js\webAudioApi.js

### Class: AudioContext

<!-- End www\app\js\webAudioApi.js -->




<!-- Start www\app\js\webAudioInterface.js -->
## www\app\js\webAudioInterface.js

### Method: $()

var track = [null,null,null,null]

captureAudio();
track.forEach(function(index, track){
     track[index] = new TrackTemplate();
     track[index].InitTrack()
});

console.log("armTrackToggle track:"+trackNumber);
track[trackNumber].armTrackToggle();

console.log("recordToggle track:"+trackNumber);
 thisTrack[tracknumber].recordToggle();
 if(thisTrack[tracknumber].isRecording) {
     track.forEach(function(index, thisTrack){
         if (index != tracknumber)
             track[index].playTrack();
      });
  }

track.forEach(function(index, track){
     track[index].playTrack();
});

track[index].pan.pan.value = amount;

<!-- End www\app\js\webAudioInterface.js -->




<!-- Start app.js -->
## app.js

This file is the controller for the application.

<!-- End app.js -->




<!-- Start gulpfile.js -->
## gulpfile.js

This file holds the gulp task scripts, it is the task runner.

 Examples:
     Usage
          gulp [TASK] [OPTIONS...]

     Available tasks
         code.doc              Documents code base
         code.doc.js           Extracts documentation for JS code.
         code.format           Formats code base
         code.format.css       Formats CSS code.
         code.format.js        Formats JS code.
         code.format.json      Formats JSON code.
         code.lint             Performs all syntax tests
         code.lint.css         Checks css syntax.
         code.lint.jade        Checks jade/pug syntax.
         code.lint.js          Checks JS syntax.
         code.lint.json        Checks json syntax.
         code.prepare          Checks, formats, and documents code base
         git.cred.store        Tell git to store your credentials.
         git.error             Handle commong Git errors
         git.heroku            Pushes code to master branch, heroku branch, and deploys to heroku.
          --m="message"        Commit message to use.
         git.master            Pushes code to master branch.
          --m="message"        Commit message to use.
         help                  Display this help text.
         mongodb.config        Shows the MongoDB config file in json.
         mongodb.create        Creates MongoDB service on windows.
         mongodb.delete        Removes MongoDB service on windows.
         mongodb.start         Starts MongoDB service on windows.
         mongodb.stop          Stops MongoDB service on windows.

### Method: function()

'code.doc.readme.new',

<!-- End gulpfile.js -->




<!-- Start ini\development.js -->
## ini\development.js

The configuration file to use during development. It holds settings for the application.

<!-- End ini\development.js -->




<!-- Start ini\gulp.js -->
## ini\gulp.js

The configuration file to use during gulp tasks. It holds settings for the gulp taskrunner.

<!-- End ini\gulp.js -->




<!-- Start ini\production.js -->
## ini\production.js

The configuration file to use during production.

<!-- End ini\production.js -->




<!-- Start ini\common\cookie.js -->
## ini\common\cookie.js

The configuration file for cookies.

<!-- End ini\common\cookie.js -->




<!-- Start ini\common\db.js -->
## ini\common\db.js

The configuration file for mongodb.

<!-- End ini\common\db.js -->




<!-- Start ini\common\file.js -->
## ini\common\file.js

The configuration file for mapping documents.

<!-- End ini\common\file.js -->




<!-- Start ini\common\map.js -->
## ini\common\map.js

The configuration file for web mapping paths.

<!-- End ini\common\map.js -->




<!-- Start ini\common\paths.js -->
## ini\common\paths.js

The configuration file for absolute paths.

<!-- End ini\common\paths.js -->




<!-- Start ini\common\security.js -->
## ini\common\security.js

The configuration file for security settings.

<!-- End ini\common\security.js -->




<!-- Start server\mvc\controllers\main.js -->
## server\mvc\controllers\main.js

This file holds the GET controller for the main page.

### Function: index(req, res)

The default page for the application

#### Params:

* **Object** *req* The request passed by the application
* **Object** *res* The response passed by the application

<!-- End server\mvc\controllers\main.js -->




<!-- Start server\lib\Api.js -->
## server\lib\Api.js

The Api handler for the application.

### Class: Api

This is the Api class. It adds api point to the express application.

 Examples:

     var api = new Api(app);

     api.add({
         "url": urlJoin( "/api/", "Comma", "separated", "path", "components"),
         "param": null | {"paramName": { "desc": "description of param", "opt": null | [ "array of options" ] }, ...
         "desc": "Description of the api method.",
         "return": "POST|PUT|GET|DELETE"
     },
     function(req, res, obj){
         // Api method action with final responses using
         // api.response(res, {errorObject}, {documentObject}, obj);
         // where errorObject and documentObject are user defined
     });

     ...

     api.end();

#### Params:

* **obj** *app* The express application

### Method: Api.validMethod(method)

Checks to see if valid return type was passed

#### Params:

* **Enum** *method* The return type get|post|put|delete

#### Return:

* **Boolean** true The return type is valid

* **Boolean** false An unknown return type

### Method: Api.add(obj, func)

Adds a method to the api and documents it.

 Examples:

     var api = new Api(app);

     api.add({
         "url": urlJoin( "/api/", "Comma", "separated", "path", "components"),
         "param": null | {"paramName": { "desc": "description of param", "opt": null | [ "array of options" ] }, ...
         "desc": "Description of the api method.",
         "return": "POST|PUT|GET|DELETE"
     },
     function(req, res, obj){
         // Api method action with final responses using
         // api.response(res, {errorObject}, {documentObject}, obj);
         // where errorObject and documentObject are user defined
     });

     ...

#### Params:

* **Object** *obj* The api object documentation
* **Function** *func* The api function

### Method: Api.response(res, err, doc, obj)

Passes the results of a database manipulation to the response handler,
 alongside the type of request that was made with any corresponding
 errors or documents.

#### Params:

* **Object** *res* The response passed by the application
* **Object** *err* The error object
* **Object** *doc* The data document
* **Object** *obj* The request type.

### Method: Api.end()

Signals the Api.add method will no longer be used and, prepares
 the help responses. Also sets up and handles api error for invalid url.

### Function: middleWare(app)

Middle ware to intercept for the Api class

#### Params:

* **Object** *app* The express application

#### Return:

* **Object** An instantiated API object.

<!-- End server\lib\Api.js -->




<!-- Start server\lib\Error-gulp.js -->
## server\lib\Error-gulp.js

This holds the error handlers for Gulp.

### Class: ErrorGulp

This class holds all the error haandlers for Gulp.

### Method: ErrorGulp.git(err)

Processes a gulp-git error

#### Params:

* **Object** *err* The error being handled

### Method: ErrorGulp.exec(err, stdout, stderr)

Handles errors for gulp-exec.

#### Params:

* **Object** *err* The error being handled
* **Stream** *stdout* stdout stream
* **Stream** *stderr* stderr stream

### Function: middleWare()

Error handler middle ware intercept function

<!-- End server\lib\Error-gulp.js -->




<!-- Start server\lib\ErrorHandler.js -->
## server\lib\ErrorHandler.js

This holds the error handlers for the application.

### Class: ErrorHandler

This class holds all the error responses for the application.

### Method: ErrorHandler.notFound(req, res, next)

Process a 404 missing resource

#### Params:

* **Object** *req* The request passed by the application
* **Object** *res* The response passed by the application
* **Function** *next* The function to the next express item

### Method: ErrorHandler.server(err, req, res, next)

Processes a 500 server error

See: tested against ini.mode for `dev|prod`.          `dev` leaks stack trace to user

#### Params:

* **Object** *err* The error passed by the application
* **Object** *req* The request passed by the application
* **Object** *res* The response passed by the application
* **Function** *next* The function to the next express item

### Function: middleWare(app)

Error handler middle ware intercept function

#### Params:

* **Object** *app* The express application

<!-- End server\lib\ErrorHandler.js -->




<!-- Start server\lib\GlobalApplication.js -->
## server\lib\GlobalApplication.js

Holds the Global application obj, this object determines information about the
 running application and resolves which configuration file to use. It also
 creates creates logging function wrappers that appends '[appName]' to the
 console logs to help diferentiate message made by the developers from those
 made by dependencies or the system.

### Class: GlobalApplication

The Global application object, ties in configurations package information and application reporting.
 To be run from app.js

 Examples:

     //  Get application root directory and system mode
     var root = path.resolve(__dirname);
     var mode = process.env.TS_RUN_MODE;

     // Set application mode to: development | production
     global.app = require('./server/lib/GlobalApplication.js')(mode, root);

#### Params:

* **JSON** *pJson* The package.json contents. Supplied by middleWare function.
* **String** *mode* The ini/(developement|production|gulp).js file to use.
* **String** *root* The application root directory.

### Method: GlobalApplication.console.log(Anything)

Prepends the '[appName appVersion]'

 Examples:

     global.app.console.log( "Message" );
     //  Outputs [ appName versionName ] Message

#### Params:

* **List** *Anything* that can be passed to console.log

### Method: GlobalApplication.console.err(Anything)

Prepends the '[appName appVersion:ERROR]' and highlights message as red

 Examples:

     global.app.console.err( "Message" );
     //  Outputs [ appName versionName:ERROR ] Message

#### Params:

* **List** *Anything* that can be passed to console.log

### Method: GlobalApplication.ini()

Generates the path to the configuration file

#### Return:

* **String** Path to the configuration file to use

### Function: middleWare(mode, root)

GlobalApplication middle ware intercept function

#### Params:

* **String** *mode* The ini/(developement|production|gulp).js file to use.
* **String** *root* The application root directory.

<!-- End server\lib\GlobalApplication.js -->




<!-- Start server\lib\mongodb.js -->
## server\lib\mongodb.js

The database driver wrapper. It processes schema into models and then set up
 connection handlers before attempting to start a connection to the database.

### Function: middleWare 
 GlobalApplication middle ware intercept function

 Examples:

     mdb = {
         models: {}, //  All the MongoDB models
         schema: {}, //  All the MongoDB scemas
         mongoose: require('mongoose')   //  The instance of mongoose to use
    };()

#### Return:

* **Obj** The Mongo DB connection object, see the example

Waiting for connection

<!-- End server\lib\mongodb.js -->




<!-- Start server\lib\Security.js -->
## server\lib\Security.js

The Security handler for the application.

 code modified from http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript

### Class: Security

This is the Security object. It adds hashing and authentication to the application..

 ### Examples:

     var security = new Security();
     var salt = security.salt();
     var hash = security.hash(req.params.pass, salt);

### Method: Security.hash(Input, Salt)

Generates a hash from the input and salt values

 Examples:

     var security = new Security();

     savedHash == security.hash("InputString", savedSalt) ?
         console.log("Same input String") :
         console.log("Different input String");

#### Params:

* **String** *Input* to hash
* **String** *Salt* to use in hash

#### Return:

* **String** Hash string

### Method: Security.salt()

Generate a salt to use for Hashing

#### Return:

* **String** A cryptoplogically secure GUID to use                          as a salt during Hashing

### Method: Security.s4()

Generate a Four digit salt

#### Return:

* **String** Four digit salt

### Method: ssl(app)

Enable ssl security if ini.security.ssl.state == true

#### Params:

* **obj** *app* The express application

### Function: middleWare()

Middleware to intercept for the Security class

#### Return:

* **Object** An instantiated Security object.

<!-- End server\lib\Security.js -->




<!-- Start server\routes\api.js -->
## server\routes\api.js

This is the API routing file it determines the content to be saved
 or served back

### Function: fileOptions()

Generates an array of document aliases from the ini.file.docs object

#### Return:

* **Array** An array of Document aliases

### Function: middleWare(app, mdb)

Sets up API routing. Self Documenting methods are added to the api, They are
self documenting because the first paramter adds itself to the API help object.

See: /api/get/help For generated methods

#### Params:

* **Object** *app* The express application reference
* **Object** *mdb* The mongoDB database object

<!-- End server\routes\api.js -->




<!-- Start server\routes\paths.js -->
## server\routes\paths.js

This is the url routing file it determines the controller or file that will
 be served by the node server.

### Function: middleWare(app)

Sets up static and dynamic routing from the configuration file.

#### Params:

* **Object** *app* The express application reference

<!-- End server\routes\paths.js -->




<!-- Start www\app\js\audio.js -->
## www\app\js\audio.js

This is a research file for web audio api it is not used in the project.

<!-- End www\app\js\audio.js -->




<!-- Start www\app\js\DropDown.js -->
## www\app\js\DropDown.js

Contains the class for the DropDown menu.

### Class: DropDown

This is the DropDown class it determines what content is
 displayed in the menu.

### Method: DropDown.init(Object)

Initializes the DropDown menu, should be run on load.

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.init({
         {String} dropDownId: The DropDown id of the DropDown element,
         {String} navigationId: The navigation menu id of the DropDown element
     });

#### Params:

* **Object** *Object* The initialization object

### Method: DropDown.open()

Opens the DropDown menu

### Method: DropDown.close()

Closes the DropDown menu

### Method: DropDown.toggle()

Toggles the DropDown

### Method: DropDown.panel.set.fxCatalog(json)

Adds effects to the fx catalog

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.fxCatalog({
         {String} title = The title of an fxObj,
         {String} desc  =  The description of an fxObj,
         {String} image = The URL to the icon image of an fxObj
     });

#### Params:

* **Array.fxObj** *json* An array of fxObjects

### Method: DropDown.panel.set.mixCatalog(json)

Adds mixes to the mix catalog

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.mixCatalog({
         {String} title = The title of an mixObj,
         {String} date  = The date of a mixObj creation,
         {String} image = The URL to the icon image of an mixObj
     });

#### Params:

* **Array.mixObj** *json* An array of mixObjects

### Method: DropDown.panel.set.account(obj)

Sets the account panel information

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.account({
         {String} name: The name of the account holder,
         {String} email: The name of the email holder
     });

#### Params:

* **Object** *obj* The account information.

### Method: DropDown.panel.set.information(obj)

Adds selected item descriptions, titles, images, etc

 Examples:

     var dropDown = new DropDown();
     ...
     dropDown.panel.set.information({
         {String}    title:   The title of the information being displayed
         {URL}       image:   The URL of an image to display
         {String}    desc:    The description of the content being displayed
     });

#### Params:

* **Object** *obj* The selected item information object

### Method: DropDown.panel.load(options, pre, success, fail)

Loads information for panels and handles succesful returns and failures. It is
 A modification of the $.ajax function

#### Params:

* **Object** *options* an $.ajax settings object
* **Function** *pre* the function to run before the ajax call
* **Function** *success* the function to call after a succesful ajax call
* **Function** *fail* the function to call after a failed ajax call

### Method: DropDown.panel.display.toggle(state, toggleClass)

Displays or hides a panel from view.

#### Params:

* **Boolean** *state* The display state of a panel
* **String** *toggleClass* The panel class to control

### Method: DropDown.panel.display.all(state)

Modify the display state of all panels

#### Params:

* **Boolean** *state* The state to place all panels

### Method: DropDown.panel.display.left(state)

Modify the display state of all left side panels

#### Params:

* **Boolean** *state* The state to place left side panels

### Method: DropDown.panel.display.right(state)

Modify the display state of all right side panels

#### Params:

* **Boolean** *state* The state to place right side panels

### Method: DropDown.panel.display.wait.start(position)

Start a wait screen. {Currently disabled}

#### Params:

* **Enum** *position* LEFT|RIGHT|ALL The wait screen(s) to start displaying.

switch(position){
                    case 'LEFT':
                        _this.panel.display.left(false);
                        _this.panel.display.toggle(true, '.wait-left-panel' );
                        return;
                    case 'RIGHT':
                        _this.panel.display.right(false);
                        _this.panel.display.toggle(true, '.wait-right-panel' );
                        return;
                    case 'ALL':
                        _this.panel.display.all(false);
                        _this.panel.display.toggle(true, '.wait-right-panel' );
                        _this.panel.display.toggle(true, '.wait-left-panel' );
                        return;
                }

### Method: DropDown.panel.display.wait.start(position)

Stop a wait screen. {Currently disabled}

#### Params:

* **Enum** *position* LEFT|RIGHT|ALL The wait screen(s) to stop displaying.

switch(position){
                    case 'LEFT':
                        _this.panel.display.toggle(false, '.wait-left-panel' );
                        return;
                    case 'RIGHT':
                        _this.panel.display.toggle(false, '.wait-right-panel' );
                        return;
                    case 'ALL':
                        _this.panel.display.toggle(false, '.wait-right-panel' );
                        _this.panel.display.toggle(false, '.wait-left-panel' );
                        return;
                }

### Method: DropDown.navigation.display.toggle(state, toggleClass)

Toggle the display of a navbar element

#### Params:

* **Boolean** *state* The display state to place a navbar element in
* **String** *toggleClass* The class of the navbar element to modify

### Method: DropDown.navigation.display.all(state)

Toggle the display of all navbar elements

#### Params:

* **Boolean** *state* The display state to place all navbar element in

### Method: DropDown.navigation.display.secured(state)

Toggle the display of all secured view navbar elements
 This is the logged in state

#### Params:

* **Boolean** *state* The display state to place all secured view navbar element in

### Method: DropDown.navigation.display.unsecured(state)

Toggle the display of all unsecured view navbar elements
 This is the logged out state

#### Params:

* **Boolean** *state* The display state to place all unsecured view navbar element in

### Method: DropDown.navigation.display.lock(state)

Toggle the Logged in view state

#### Params:

* **Boolean** *state* The state of the secured view

### Method: DropDown.show(view, opt)

Makes the views that the dropdown manages

#### Params:

* **String** *view* The view to display
* **String** *opt* Options to pass the views

<!-- End www\app\js\DropDown.js -->




<!-- Start www\app\js\init.js -->
## www\app\js\init.js

### Function: require 
 This is a client side function that emulates the action of require for
 loaded node_modules that are being served through static virtual directory.

 It is used to resolve the dependency without modifying the node_module itself
 this is important because any changes to the node_module locally will not
 propogate when being rebuilt.(src)

#### Params:

* *src* The string name being required

#### Return:

* The code being required

### Function: getCookie 
 Retrieves cookies from the system, this function is necessary
 because artifacts were being passed prepended to the cookie
 value.(name)

#### Params:

* *name* The cookie name to search for

#### Return:

* ret The value of the cookie

<!-- End www\app\js\init.js -->




<!-- Start www\app\js\knob.js -->
## www\app\js\knob.js

Downward compatible, touchable dial

Version: 1.2.12
Requires: jQuery v1.7+

Copyright (c) 2012 Anthony Terrien
Under MIT License (http://www.opensource.org/licenses/mit-license.php)

Thanks to vor, eskimoblood, spiffistan, FabrizioC

Kontrol library

### Class: k

Definition of globals and core

### Method: o()

Kontrol Object

Definition of an abstract UI control

Each concrete component must call this one.
<code>
k.o.call(this);
</code>

### Method: Dial()

k.Dial

<!-- End www\app\js\knob.js -->




<!-- Start www\app\js\mixer.js -->
## www\app\js\mixer.js

### Method: $()

### Method: $()

Add data to the mute & record buttons

### Method: $()

Set up track names

### Method: $()

Set up EQ knobs

### Method: $()

Set up pan knobs

### Method: $()

Set up volume sliders

### Method: $()

Knob function

### Method: $()

Slider function

### Method: $()

Mute buttons

### Method: $()

Recording buttons

### Method: $()

Playback buttons

<!-- End www\app\js\mixer.js -->




<!-- Start www\app\js\onLoad.js -->
## www\app\js\onLoad.js

<!-- End www\app\js\onLoad.js -->




<!-- Start www\app\js\recorder.js -->
## www\app\js\recorder.js

### Method: writeString()

RIFF identifier

RIFF chunk length

### Method: writeString()

RIFF type

### Method: writeString()

format chunk identifier

format chunk length

sample format (raw)

channel count

sample rate

byte rate (sample rate * block align)

block align (channel count * bytes per sample)

bits per sample

### Method: writeString()

data chunk identifier

data chunk length

<!-- End www\app\js\recorder.js -->




<!-- Start www\app\js\recorderWorker.js -->
## www\app\js\recorderWorker.js

### Class: recLength

License (MIT)

Copyright © 2013 Matt Diamond

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.

### Method: writeString()

RIFF identifier

file length

### Method: writeString()

RIFF type

### Method: writeString()

format chunk identifier

format chunk length

sample format (raw)

channel count

sample rate

byte rate (sample rate * block align)

block align (channel count * bytes per sample)

bits per sample

### Method: writeString()

data chunk identifier

data chunk length

<!-- End www\app\js\recorderWorker.js -->




<!-- Start www\app\js\StopWatch.js -->
## www\app\js\StopWatch.js

### Function: StopWatch 
 This is a stopwatch that will be used to create a clock to manage tracks play position

 modified from https://gist.github.com/electricg/4372563()

### Method: now 
 Gets current time()

#### Return:

* current time

### Method: start 
 start the clock()

### Method: stop 
 stop the clock()

### Method: reset 
 reset the clock time values()

### Method: getTime 
 get the runtime()

#### Return:

* the runtime

### Method: pad 
 gives a number formated with leading zeroes(num, size)

#### Params:

* *num* the number to pad
* *size* how many digits to show

#### Return:

* **STRING** formated number

### Method: formatTime 
Formats the time display(time)

#### Params:

* *time* The timestamp to display

#### Return:

* the new time string to display

### Method: setId 
 sets the id of the element to insert the clock(id)

#### Params:

* *id* the id of the element

### Method: getId 
 get the Id of the element that has the clock()

#### Return:

* the id of the clock

### Method: setClocktimer 
 sets the display interval of the clock, In other words it animates changes in time()

### Method: clearClocktimer 
 clears the display interval of the clock, in other words it stops animation()

### Method: update 
 interval function, writes the time of the clock into the element.()

### Method: adjust 
adjusts the clock to a given time(mod)

#### Params:

* *mod* the value to adjust the time by

#### Return:

* the current laptime

### Method: run 
 This is the command function to the clock, it accepts(action, option)

#### Params:

* *action* 'START' - Starts the stopwatch                      'STOP'  -   Stops the stopwatch
                     'RESET' -   Restarts the stopwatch
                     'INIT'  -   Initializes the stopwatch
* *option* Any options that an action requires.          null        no options
         idString    Required by 'INIT', the idstring of the element that will display the clock

#### Return:

* The lapTime or RunTime on the stopwatch

<!-- End www\app\js\StopWatch.js -->




<!-- Start www\app\js\track-label.js -->
## www\app\js\track-label.js

<!-- End www\app\js\track-label.js -->




<!-- Start www\app\js\volume-meter.js -->
## www\app\js\volume-meter.js

The MIT License (MIT)

Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

### Function: createAudioMeter()

Usage:
audioNode = createAudioMeter(audioContext,clipLevel,averaging,clipLag);

audioContext: the AudioContext you're using.
clipLevel: the level (0 to 1) that you would consider "clipping".
   Defaults to 0.98.
averaging: how "smoothed" you would like the meter to be over time.
   Should be between 0 and less than 1.  Defaults to 0.95.
clipLag: how long you would like the "clipping" indicator to show
   after clipping has occured, in milliseconds.  Defaults to 750ms.

Access the clipping through node.checkClipping(); use node.shutdown to get rid of it.

<!-- End www\app\js\volume-meter.js -->




<!-- Start www\app\js\webAudioApi.js -->
## www\app\js\webAudioApi.js

### Class: AudioContext

<!-- End www\app\js\webAudioApi.js -->




<!-- Start www\app\js\webAudioInterface.js -->
## www\app\js\webAudioInterface.js

### Method: $()

var track = [null,null,null,null]

captureAudio();
track.forEach(function(index, track){
     track[index] = new TrackTemplate();
     track[index].InitTrack()
});

console.log("armTrackToggle track:"+trackNumber);
track[trackNumber].armTrackToggle();

console.log("recordToggle track:"+trackNumber);
 thisTrack[tracknumber].recordToggle();
 if(thisTrack[tracknumber].isRecording) {
     track.forEach(function(index, thisTrack){
         if (index != tracknumber)
             track[index].playTrack();
      });
  }

track.forEach(function(index, track){
     track[index].playTrack();
});

track[index].pan.pan.value = amount;

<!-- End www\app\js\webAudioInterface.js -->




<!-- Start app.js -->
## app.js

This file is the controller for the application.

<!-- End app.js -->




<!-- Start gulpfile.js -->
## gulpfile.js

This file holds the gulp task scripts, it is the task runner.

 Examples:
     Usage
          gulp [TASK] [OPTIONS...]

     Available tasks
         code.doc              Documents code base
         code.doc.js           Extracts documentation for JS code.
         code.format           Formats code base
         code.format.css       Formats CSS code.
         code.format.js        Formats JS code.
         code.format.json      Formats JSON code.
         code.lint             Performs all syntax tests
         code.lint.css         Checks css syntax.
         code.lint.jade        Checks jade/pug syntax.
         code.lint.js          Checks JS syntax.
         code.lint.json        Checks json syntax.
         code.prepare          Checks, formats, and documents code base
         git.cred.store        Tell git to store your credentials.
         git.error             Handle commong Git errors
         git.heroku            Pushes code to master branch, heroku branch, and deploys to heroku.
          --m="message"        Commit message to use.
         git.master            Pushes code to master branch.
          --m="message"        Commit message to use.
         help                  Display this help text.
         mongodb.config        Shows the MongoDB config file in json.
         mongodb.create        Creates MongoDB service on windows.
         mongodb.delete        Removes MongoDB service on windows.
         mongodb.start         Starts MongoDB service on windows.
         mongodb.stop          Stops MongoDB service on windows.

### Method: function()

'code.doc.readme.new',

<!-- End gulpfile.js -->

