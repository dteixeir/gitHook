var express = require('express');
var fs = require('fs');
var cors = require('cors');
var _ = require('lodash');
var bodyParser = require("body-parser");
var Datastore = require('nedb');

db = new Datastore({ filename: './db/data.json' });
db.loadDatabase();

var app = express().use(cors());
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.listen(port);

console.log('listening on port ' + port);

var routes = require('./routes');

_.each(routes, function(controller, route) {
    app.use(route, controller(app, route));
});