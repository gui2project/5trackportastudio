/**
 *  @file   init.js
 *
 *  This file runs before any other scripts to initialize the system
 */

/**
 *  @name   require
 *
 *  This is a client side function that emulates the action of require for
 *  loaded node_modules that are being served through static virtual directory.
 *
 *  It is used to resolve the dependency without modifying the node_module itself
 *  this is important because any changes to the node_module locally will not
 *  propogate when being rebuilt.
 *
 *  @param      src     the string name being required
 *  @return             the code being required
 */
var require = function(src){
    switch(src){
        case 'jquery':
            return $;
        default:
            return undefined;
    }
};

var sw = null;
var dd = null;