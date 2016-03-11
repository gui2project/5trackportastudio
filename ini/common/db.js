/**
 *  @file   db.js
 *
 *  The configuration file for mongodb.
 */

//  Requires
var schema          = require('mongoose').Schema;
var root            = global.app.root

//  Database configurations
var db = {
    host: 'www.josefflores.com',
    models:[
        {
            collection: 'users',
            schema: {
                name: {type: String, required: true},
                email: {type: String, required: true},
                pass: {type: String, required: true},
                projects: {type: String, required: true}
            }
        }
    ],
    name: 'trackstudio',
    options: {
        server: {
            socketOptions:  {
                keepAlive: 1,
                connectTimeoutMS: 30000
            }
        },
        replset: {
            socketOptions: {
                keepAlive: 1,
                connectTimeoutMS: 30000
            }
        }
    },
    pass: process.env.MONGO_DB_PASS,
    port: 27017,
    user: process.env.MONGO_DB_USER,
}

//  Mongo DB URL
db.url = 'mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name ;

//  Export content
module.exports = db;
