/**
 *  @file   mongodb.js
 *
 *  The database driver wrapper
 */

var mdb = {}
mdb.mongoose        = require('mongoose')
mdb.models          = {};

var ini             = require(global.app.ini());
var msg             = '[ MongoDB ]' ;


global.app.console.log(msg, 'Using', '\n', ini.db.url);

global.app.console.log(msg, 'Initializing connection.');
mdb.mongoose.connect(ini.db.url, ini.db.options);

global.app.console.log(msg, 'Attempting connection.');
mdb.mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

global.app.console.log(msg, 'Waiting for connection.');
mdb.mongoose.connection.once('open', function() {});

global.app.console.log(msg, 'Defining models.');
ini.db.models.forEach(function(model){
    global.app.console.log(msg, 'Adding model:', model.collection);
    mdb.models[model.collection] = mdb.mongoose.model(model.collection, new mdb.mongoose.Schema(model.schema, { collection: model.collection }))
});

global.app.console.log(msg, 'Initialization complete.');

//  Export content
module.exports = mdb;
