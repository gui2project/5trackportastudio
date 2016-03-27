

<!-- Start ini\development.js -->

<!-- End ini\development.js -->




<!-- Start ini\gulp.js -->

<!-- End ini\gulp.js -->




<!-- Start ini\production.js -->

<!-- End ini\production.js -->




<!-- Start ini\common\cookie.js -->

<!-- End ini\common\cookie.js -->




<!-- Start ini\common\db.js -->

<!-- End ini\common\db.js -->




<!-- Start ini\common\file.js -->

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

## index 
 The default page for the application(req, res)

### Params:

* **Object** *req* The request passed by the application
* **Object** *res* The response passed by the application

<!-- End server\mvc\controllers\main.js -->




<!-- Start server\lib\Api.js -->

## Api.js 
 The Api handler for the application.

## Api 
 This is the api object. It adds api point to the express application.

 ### Examples:

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

## validMethod 
 Checks to see if valid return type was passed(method)

### Params:

* **String** *method* the return type

### Return:

* **Boolean** true return type is valid

* **Boolean** false unknown return type

## add 
 Adds a method to the api and documents it.(obj, func)

### Params:

* **Object** *obj* The api object documentation
* **Function** *func* The api function

## response 
 Passes the results of a database manipulation to the response handler,
 alongside the type of request that was made with any corresponding
 errors or documents.(res, err, doc, obj)

### Params:

* **Object** *res* The response passed by the application
* **Object** *err* The error object
* **Object** *doc* The data document
* **Object** *obj* The request type.

## end 
 Prepares the help response and handles api error for invalid url.()

## middleWare 
 Middle ware to intercept for the Api class(app)

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

## git 
 Processes a gulp-git error(err)

### Params:

* **Object** *err* The error being handled

## exec 
 Handles errors for gulp-exec.(err, stdout, stderr)

### Params:

* **Object** *err* The error being handled
* **Stream** *stdout* stdout stream
* **Stream** *stderr* stderr stream

## middleWare 
 Error handler middle ware intercept function()

<!-- End server\lib\Error-gulp.js -->




<!-- Start server\lib\ErrorHandler.js -->

## Error.js 
 This holds the error handlers for the application.

## Error 
 This class holds all the error responses for the application.

## notFound 
 Process a 404 missing resource(req, res, next)

### Params:

* **Object** *req* The request passed by the application
* **Object** *res* The response passed by the application
* **Function** *next* The function to the next express item

## server 
 Processes a 500 server error(err, req, res, next)

See: tested against ini.mode for `dev|prod`.          `dev` leaks stack trace to user

### Params:

* **Object** *err* The error passed by the application
* **Object** *req* The request passed by the application
* **Object** *res* The response passed by the application
* **Function** *next* The function to the next express item

## middleWare 
 Error handler middle ware intercept function(app)

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

### Params:

* **JSON** *pJson* The package.json contents.
* **String** *mode* The ini/(developement|production|gulp).js file to use.
* **String** *root* The application root directory.

## about 
 The label to use for the application, Name and version of the application from package.json

## console.log 
 Prepends the '[appName appVersion]'()

## console.err 
 Prepends the '[appName appVersion:ERROR]' and highlights message as red()

## ini 
 The path to the configuration file()

### Return:

* **String** Path to the configuration file to use

## mode 
 The mode the application is running in

## root 
 The root path of the application

## middleWare 
 GlobalApplication middle ware intercept function(mode, root)

### Params:

* **String** *mode* The ini/(developement|production|gulp).js file to use.
* **String** *root* The application root directory.

<!-- End server\lib\GlobalApplication.js -->




<!-- Start server\lib\mongodb.js -->

## mongodb.js 
 The database driver wrapper. It processes schema into models and then set up
 connection handlers before attempting to start a connection to the database.

## middleWare 
 GlobalApplication middle ware intercept function()

### Return:

* **Obj** The Mongo DB connection object

Waiting for connection

<!-- End server\lib\mongodb.js -->




<!-- Start server\lib\Security.js -->

## Security.js 
 The Security handler for the application.

 code modified from @link http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript

## Security 
 This is the Security object. It adds hashing and authentication to the application..

 ### Examples:

     var security = new Security();
     var salt = security.salt();
     var hash = security.hash(req.params.pass, salt);

## hash 
 Generates a hash from the input and salt values(Input, Salt)

### Params:

* **String** *Input* to hash
* **String** *Salt* to use in hash

### Return:

* **String** Hash string

## salt 
 Generate a salt to use for Hashing()

### Return:

* **String** A cryptoplogically secure GUID to use                          as a salt during Hashing

## s4 
 Generate a Four digit salt()

### Return:

* **String** Four digit salt

## ssl 
 Enable ssl security if ini.security.ssl.state == true(app)

### Params:

* **obj** *app* The express application

## middleWare 
 Middle ware to intercept for the Security class()

### Return:

* **Object** An instantiated Security object.

<!-- End server\lib\Security.js -->




<!-- Start server\routes\api.js -->

## api.js 
 This is the API routing file it determines the content to be saved
 or served back

## fileOptions 
 Generates an array of document aliases from the ini.file.docs object()

### Return:

* **Array** An array of Document aliases

## middleWare 
Sets up API routing. Self Documenting methods are added to the api, They are
self documenting because the first paramter adds itself to the API help object.(app, mdb)

### Params:

* **Object** *app* The express application reference
* **Object** *mdb* The mongoDB database object

<!-- End server\routes\api.js -->




<!-- Start server\routes\paths.js -->

## paths.js 
 This is the url routing file it determines the controller or file that will
 be served by the node server.

## middleWare 
Sets up static and dynamic routing from the configuration file.(app)

### Params:

* **Object** *app* The express application reference

<!-- End server\routes\paths.js -->




<!-- Start www\app\js\audio.js -->

## msg

<!-- End www\app\js\audio.js -->




<!-- Start www\app\js\DropDown.js -->

## DropDown 
 This is the dropdown class it determines what content is
 displayed in the menu.()

## init 
 Initializes the dropdown menu, should be run on load.(dropDownId, navigationId)

### Params:

* *dropDownId* The drop down id of the dropdown element
* *navigationId* The navigation menu id of the dropdown element

## dropdown 
 Dropdown actions

## open 
 Opens the menu()

## close 
 Closes the menu()

## toggle 
 Toggles the dropdown()

## panel 
 Panel actions

## fxCatalog 
 Adds effects to the fx catalog(json)

### Params:

* *json* The json object that holds the effects information

## fxCatalog 
 Adds mixes to the mix catalog(json)

### Params:

* *json* The json object that holds the mix information

## account 
 Adds account information(obj)

### Params:

* *obj* The json object that holds the account information

## information 
 Adds selected item descriptions, titles, images, etc(obj)

### Params:

* *obj* The json object that holds the extra information

## display 
 displays or hdropDownIdes a panel

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

## show 
 Makes the views that the dropdown can hold(view)

### Params:

* *view* The view to display

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

 ### Examples:
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

<!-- End gulpfile.js -->

