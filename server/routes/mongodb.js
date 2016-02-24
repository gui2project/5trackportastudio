/**
 *  @file   mongodb.js
 *
 *  The database driver
 */

var mongoose        = require('mongoose')

var ini             = require(global.app.ini());
var msg             = '[ MongoDB ]' ;
/*
var Db              = require('mongodb').Db;
var MongoClient     = require('mongodb').MongoClient;
var Server          = require('mongodb').Server;
var ReplSetServers  = require('mongodb').ReplSetServers;
var ObjectID        = require('mongodb').ObjectID;
var Binary          = require('mongodb').Binary;
var Grid            = require('mongodb').Grid;
var GridStore       = require('mongodb').GridStore;
var Code            = require('mongodb').Code;
var assert          = require('assert');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');



var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('test');
    global.app.console.log(collection);
};

var connect = function(pass, fail){

    MongoClient.connect(ini.db.url, function(err, db) {
        assert.equal(null, err);
        global.app.console.log(msg, "Connection made.");

        insertDocuments(db, function() {

        });

        db.close();
    });
};


//  Export content
module.exports = connect;
*/



//var connect = function(){};

//module.exports = connect
global.app.console.log(msg, 'Initializing.');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
    global.app.console.log(msg, 'Generating schema.');
    // Create your schemas and models here.
    var movieSchema = new mongoose.Schema({ title: { type: String },
                                            rating: String,
                                            releaseYear: Number,
                                            hasCreditCookie: Boolean});

    // Compile a 'Movie' model using the movieSchema as the structure.
    // Mongoose also creates a MongoDB collection called 'Movies' for these documents.
    var Movie = mongoose.model('Movie', movieSchema);

    var thor = new Movie({ title: 'Thor',
                       rating: 'PG-13',
                       releaseYear: '20119',  // Notice the use of a String rather than a Number - Mongoose will automatically convert this for us.
                       hasCreditCookie: true});

    thor.save(function(err, thor) {
        if(err) console.error(err);
    });

    // Find a single movie by name.
    Movie.findOne({ title: 'Thor' }, function(err, thor) {
        err ? console.error(err): console.dir(thor._doc);
    });

    // Find all movies.
    //Movie.find(function(err, movies) {
    //    err ? console.error(err): console.dir(movies);
    //});

    // Find all movies that have a credit cookie.
    //Movie.find({ hasCreditCookie: true }, function(err, movies) {
     //   err ? console.error(err): console.dir(movies);
    //});
});


mongoose.connect(ini.db.url, ini.db.options);




