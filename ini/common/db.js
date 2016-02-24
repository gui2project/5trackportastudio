/**
 *  @file   db.js
 *
 *  The configuration file for mongodb.
 */

//  Requires
var root            = global.app.root

var db = {
    host: 'localhost',
    name: 'test',
    port: 27017,
    options: {
        db: { native_parser: true },
        server: { poolSize: 5 }//,
        //user: process.env.MONGO_DB_USER,
        //pass: process.env.MONGO_DB_PASS
        //replset: '', // passed to the connection ReplSet instance
        //auth: '',    // options for authentication
        //mongos: ''   // passed to the [underlying driver's mongos options](http://mongodb.github.io/node-mongodb-native/2.0/api/Mongos.html)
    }

}

db.url = 'mongodb://' + db.host + ':' + db.port + '/' + db.name ;

//  Export content
module.exports = db;
