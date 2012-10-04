/**
 * Module dependencies.
 */
var express = require('express'),
    mongoose = require('mongoose');

var app = module.exports = express.createServer();

//configuration 
require('./config/configure')(app, express);
require('./config/routes')(app);

//database
var dbSettings = app.settings.db;
mongoose.connect('mongodb://'+dbSettings.user+':'+dbSettings.password+'@'+ dbSettings.host +":"+ dbSettings.port +"/"+ dbSettings.database);

app.listen(app.settings.port, function(){
    console.log("Express server listening on port %d in %s mode",
        app.address().port,
        app.settings.env
    );
});
