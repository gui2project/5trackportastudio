/**
 *  @file   mongodb.js
 *
 *  The database driver wrapper. It processes schema into models and then set up
 *  connection handlers before attempting to start a connection to the database.
 */

var ini = require(global.app.ini());
var msg = '[ MongoDB ]';

global.app.console.log(msg, 'Initializing.');
//  The mongoose db connection object, models hold the processed schema, while
//  mongoose holds the mongoose middle ware
var mdb = {
    models: {},
    schema: {},
    mongoose: require('mongoose')
};

//  Declaring URI
global.app.console.log(msg, 'Using URI:', ini.db.url);

//  Process Schema and saving as a model
global.app.console.log(msg, 'Defining models and schemas.');
ini.db.models.forEach(function (model) {
    global.app.console.log(msg, ' - ', model.collection, "\nschema :", model.schema);
    mdb.models[model.collection] = mdb.mongoose.model(model.collection,
        new mdb.mongoose.Schema(model.schema, {
            collection: model.collection
        }));
    mdb.schema[model.collection] = model.schema;
});

//  Setting up reusable connection
global.app.console.log(msg, 'Configuring connection.');
mdb.mongoose.connect(ini.db.url, ini.db.options);

//  Setting up connection handlers
mdb.mongoose.connection.on('connected',
    function () {
        global.app.console.log(msg, 'Connection success.');
    });

mdb.mongoose.connection.on('error',
    function () {
        global.app.console.err.bind(console, msg, 'connection error:');
    });

mdb.mongoose.connection.on('disconnected',
    function () {
        global.app.console.err(msg, 'Connection broken.');
    });

mdb.mongoose.connection.on('SIGINT',
    function () {
        global.app.console.err(msg, 'Connection terminated by an application crash.');
        process.exit(0);
    });

//  Attempting connection
global.app.console.log(msg, 'Attempting connection ...');
mdb.mongoose.connection.once('open', function () { /* Waiting for connection*/ });

//  Export content
module.exports = mdb;