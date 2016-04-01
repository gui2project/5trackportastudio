/**
 *  The configuration file for mapping documents.
 *
 *  @name   file.js
 */

//  Requires
var path = require('path');
var paths = require('./paths.js');

//  File alias and mime descriptions
var files = {
    docs: [{
        alias: "doc-readme.md",
        mime: "text/markdown",
        sys: path.join(paths.documents, "readme.md")
    }, {
        alias: "memo",
        mime: "application/pdf",
        sys: path.join(paths.documents, "Memo-trackstudio-Anderson-Cabrall-Flores-Meza.pdf")
    }, {
        alias: "readme",
        mime: "text/markdown",
        sys: path.join(paths.root, "readme.md")
    }, {
        alias: "proposal",
        mime: "application/pdf",
        sys: path.join(paths.documents, "Proposal-trackstudio-Anderson-Cabrall-Flores-Meza.pdf")
    }],
    favicon: path.join(paths.images, 'favicon-black.ico')
};

//  Export content
module.exports = files;