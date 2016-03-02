/**
 *  @file   Api.js
 *
 *  The Api handler for the application.
 */

var path    = require('path');
var urlJoin = require('url-join');

var ini     = require(global.app.ini());
var httpRes = require(path.join(ini.path.models, 'response.json'));
var msg     = '[ API ]';


/**
 *  @name   Api
 *
 *  This is the api object. It adds api point to the express application.
 *
 *  API Usage:
 *
 *  var api = new Api(app);
 *
 *  api.add({
 *      "url": urlJoin( "/api/", "Comma", "separated", "path", "components"),
 *      "param": null | {"paramName": "description", ... },
 *      "desc": "Description of the api method.",
 *      "return": "POST|PUT|GET|DELETE "
 *  },
 *  function(req, res, obj){
 *      // Api method action with final responses using
 *      // api.response(res, {errorObject}, {documentObject}, obj);
 *      // where errorObject and documentObject are user defined
 *  });
 *
 *  ...
 *
 *  api.end();
 */
var Api = function(app) {
    //  Properties
    this.app = app;     //  The express application

    //  Crud types
    this.methods = {
        GET: [],
        PUT: [],
        POST: [],
        DELETE: []
    };

    /**
     *  @name   add
     *
     *  Adds a method to the api and documents it.
     *
     *  @param  obj     The api object documentation
     *  @param  func    The api function
     */
    this.add = function( obj, func){
        this.methods[obj["return"]].push(obj);
        this.app.get(obj.url,
                function(req, res){
                    func(req, res, httpRes.crud[obj["return"]]);
                });
        global.app.console.log(msg, "Added:", obj.url);
    };

    /**
     *  @name   response
     *
     *  Passes the results of a database manipulation to the response handler,
     *  alongside the type of request that was made with any corresponding
     *  errors or documents.
     *
     *  @param  res     The response
     *  @param  err     The error object
     *  @param  doc     The object to display
     *  @param  obj     The httpResponse object, the request type.
     */
    this.response = function(res, err, doc, obj){
        if (err) {
            global.app.console.err(msg, doc)
            res.status(obj.failure).send(httpRes.resp[obj.failure].msg);
        } else {
            if (obj.data){
                res.status(obj.success).json(doc);
            } else {
                res.status(obj.success).send(httpResresp[obj.success].msg);
            }
        }
    };

    /**
     *  @name   end
     *
     *  Prepares the help response and handles api error for invalid url.
     */
    this.end = function(){
        var _this = this;

        // Adding help method
        this.add({
            "url": urlJoin("/api", "get", "help"),
            "param": null,
            "desc": "Returns a help menu.",
            "return": "GET"
        },
        function(req, res, obj){
            _this.response(res, null, _this.methods, obj);
        });

        // Bad Request the API url does not  exist
        this.app.get( '/api/*', function(req,res){
            _this.response(res, true, "400", httpRes.crud.MISSING);
        });
    };

};

/**
 *  @name exp
 *
 *  Middle ware to intercept for the Api class
 *
 *  @param      app    The express object
 *
 *  @return     An instantiated API object.
 */
var exp = function(app){
    //  Generate an instance of the API object
    return new Api(app);
};

//  Export content
module.exports = exp;
