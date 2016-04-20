/**
 *  The configuration file for mapping documents.
 *
 *  @name   file.js
 */

//  REQUIRES

var path = require('path');
var paths = require('./paths.js');

//  File alias and mime descriptions
var files = {
    docs: [{
        alias: 'json-effects',
        ext: 'json',
        mime: 'application/json',
        sys: path.join(paths.models, 'effects.json')
    }, {
        alias: 'readme-javascript',
        ext: 'md',
        mime: 'text/markdown',
        sys: path.join(paths.documents, 'readme.md')
    }, {
        alias: 'readme-application',
        ext: 'md',
        mime: 'text/markdown',
        sys: path.join(paths.root, 'readme.md')
    }, {
        alias: 'report-memo',
        ext: 'pdf',
        mime: 'application/pdf',
        sys: path.join(paths.documents, 'memo', 'Memo-trackstudio-Anderson-Cabrall-Flores-Meza.pdf')
    }, {
        alias: 'report-proposal',
        ext: 'pdf',
        mime: 'application/pdf',
        sys: path.join(paths.documents, 'proposal', 'Proposal-trackstudio-Anderson-Cabrall-Flores-Meza.pdf')
    }, {
        alias: 'report-usability',
        ext: 'pdf',
        mime: 'application/pdf',
        sys: path.join(paths.documents, 'usability', 'usability-report.pdf')
    }, {
        alias: 'report-usability-user-survey',
        ext: 'pdf',
        mime: 'application/pdf',
        sys: path.join(paths.documents, 'usability', 'usability-user-survey.pdf')
    }, {
        alias: 'report-usability-user-demographic',
        ext: 'pdf',
        mime: 'application/pdf',
        sys: path.join(paths.documents, 'usability', 'usability-user-demographic.pdf')
    }, {
        alias: 'report-usability-proctor-script',
        ext: 'pdf',
        mime: 'application/pdf',
        sys: path.join(paths.documents, 'usability', 'usability-proctor-script.pdf')
    }],
    favicon: path.join(paths.images, 'favicon', 'favicon-black.ico')
};

//  Export content
module.exports = files;