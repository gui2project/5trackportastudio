/**
 *  @name   db.js
 *
 *  The configuration file for mongodb.
 */

//  Requires
var schema = require('mongoose')
    .Schema;

//  Database configurations
var db = {
    host: 'www.josefflores.com',
    models: [{
        collection: 'users',
        schema: {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            hash: {
                type: String,
                required: true
            },
            salt: {
                type: String,
                required: true
            },
            projects: [{
                type: String
            }]
        }
    }, {
        collection: 'session',
        schema: {
            user: {
                type: String,
                required: true
            },
            hash: {
                type: String,
                required: true
            },
            time: {
                type: Number,
                required: true
            },
            live: {
                type: Boolean,
                required: true
            }
        }
    }],
    name: 'trackstudio',
    options: {
        server: {
            socketOptions: {
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
};

//  Mongo DB URL
db.url = 'mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name;

//  Export content
module.exports = db;