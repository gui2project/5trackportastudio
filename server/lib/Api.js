/**
 *  @name   Api.js
 *
 *  The Api handler for the application.
 */

var path = require('path');
var urlJoin = require('url-join');

var ini = require(global.app.ini());
var httpRes = require(path.join(ini.path.models, 'response.json'));
var msg = '[ API ]';

/**
 *  @class   Api
 *
 *  This is the api object. It adds api point to the express application.
 *
 *  ### Examples:
 *
 *      var api = new Api(app);
 *
 *      api.add({
 *          "url": urlJoin( "/api/", "Comma", "separated", "path", "components"),
 *          "param": null | {"paramName": { "desc": "description of param", "opt": null | [ "array of options" ] }, ...
 *          "desc": "Description of the api method.",
 *          "return": "POST|PUT|GET|DELETE"
 *      },
 *      function(req, res, obj){
 *          // Api method action with final responses using
 *          // api.response(res, {errorObject}, {documentObject}, obj);
 *          // where errorObject and documentObject are user defined
 *      });
 *
 *      ...
 *
 *      api.end();
 *
 *  @param {obj}    app     The express application
 */
var Api = function (app) {
    //  Properties
    this.app = app; //  The express application
    this.first = true; //  First method flag
    this.methods = [];

    /**
     *  @method validMethod
     *
     *  Checks to see if valid return type was passed
     *
     *  @param  {String}    method  the return type
     *
     *  @return {Boolean}   true    return type is valid
     *  @return {Boolean}   false   unknown return type
     */
    this.validMethod = function (method) {
        switch (method.toLowerCase()) {
        case "get":
        case "post":
        case "put":
        case "delete":
            return true;

        default:
            return false;
        }
    };

    /**
     *  @method   add
     *
     *  Adds a method to the api and documents it.
     *
     *  @param  {Object}    obj     The api object documentation
     *  @param  {Function}  func    The api function
     */
    this.add = function (obj, func) {
        global.app.console.log(msg, 'Adding API method.', obj.url);
        if (!this.validMethod(obj.return)) {
            global.app.console.err(msg, 'Invalid API return methods for', obj.url);
            return false;
        }
        global.app.console.log(msg, 'Valid method.', obj.url);
        this.methods.push(obj);
        this.app[obj["return"].toLowerCase()](obj.url,
            function (req, res) {
                func(req, res, httpRes.crud[obj["return"]]);
            });

        if (this.first) {
            global.app.console.log(msg, 'Defining API methods.');
            this.first = false;
        }

        global.app.console.log(msg, ' - ', obj.url);
    };

    /**
     *  @method   response
     *
     *  Passes the results of a database manipulation to the response handler,
     *  alongside the type of request that was made with any corresponding
     *  errors or documents.
     *
     *  @param  {Object}    res     The response passed by the application
     *  @param  {Object}    err     The error object
     *  @param  {Object}    doc     The data document
     *  @param  {Object}    obj     The request type.
     */
    this.response = function (res, err, doc, obj) {
        if (err) {
            global.app.console.err(msg, 'Error case', err, doc);
            res.status(obj.failure)
                .send(httpRes.resp[obj.failure].msg);
        } else {
            if (obj.data) {
                res.status(obj.success)
                    .json(doc);
            } else {
                res.status(obj.success)
                    .send(httpRes.resp[obj.success].msg);
            }
        }
    };

    /**
     *  @method   end
     *
     *  Prepares the help response and handles api error for invalid url.
     */
    this.end = function () {
        var _this = this;

        // Adding help method
        this.add({
                "url": urlJoin("/api", "get", "help"),
                "param": [null],
                "desc": "Returns an api description object.",
                "return": "GET"
            },
            function (req, res, obj) {
                _this.response(res, null, _this.methods, obj);
            });

        // Sort methods by url
        this.methods.sort(function (a, b) {
            if (a.url < b.url) return -1;
            if (a.url > b.url) return 1;
            return 0;
        });

        // Bad Request the API url does not  exist
        this.app.get('/api/*', function (req, res) {
            _this.response(res, true, "400", httpRes.crud.MISSING);
        });

        global.app.console.log(msg, "Waiting for method call ...");
    };

    global.app.console.log(msg, "Initializing.");
};

/**
 *  @function     middleWare
 *
 *  Middle ware to intercept for the Api class
 *
 *  @param  {Object}    app    The express application
 *
 *  @return {Object}        An instantiated API object.
 */
var middleWare = function (app) {
    //  Generate an instance of the API object
    return new Api(app);
};

//  Export content
module.exports = middleWare;