/**
 *  @file   gulp.js
 *
 *  The configuration file to use during gulp tasks.
 *  It holds settings for the gulp taskrunner.
 */

// Configuration settings
var ini = {
    app: {
        mode: 'dev'
    },
    cookie: require('./common/cookie.js'),
    db: require('./common/db.js'),
    file: require('./common/file.js'),
    map: require('./common/map.js'),
    opt: {
        help: {
            hideDepsMessage: true,
            hideEmpty: true
        },
        inPlace: {
            base: './'
        },
        git: {
            lock: {
                read: false
            },
            add: {
                args: '-A'
            },
            commit: {
                options: {
                    'm="message"': 'Commit message to use.'
                }
            }
        }
    },
    path: require('./common/paths.js'),
    security: require('./common/security.js')
};

//  Default override
ini.security.ssl.state = false;

// Export Content
module.exports = ini;