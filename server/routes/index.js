/**
 *  @file   index.js
 *
 *  This is the url routing file it determines the controller that will be used
 *  by the node server.
 *
 *  01/21/2015  Reorganized and added comments
 *
 */

var router  = require('express').Router();
var path    = require('path');
var ini     = require(global.app.ini());

// Code

/* Routing - GET */
router.get('/', require(path.join(ini.path.ctrl, 'home/index')).index);
router.get('/home', require(path.join(ini.path.ctrl, 'home/index')).home);

router.get('/about', require(path.join(ini.path.ctrl, 'about/index')).index);
router.get('/contact', require(path.join(ini.path.ctrl, 'contact/index')).index);
router.get('/faq', require(path.join(ini.path.ctrl, 'faq/index')).index);

/* Exports */
module.exports = router;
