/**
 *  @file   db.js
 *
 *  The configuration file for mongodb.
 */

//  Requires
var root            = global.app.root

var db = {
    host: 'www.josefflores.com',
    models:[
        {
            collection: 'users',
            schema: { name: String }
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

db.url = 'mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name ;

//  Export content
module.exports = db;
