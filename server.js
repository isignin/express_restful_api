//server.js
//Base Setup
var express = require('express');
var app = express(); 
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080

// SETUP DATABASE
var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost:27017/member'
mongoose.connect(dbUrl);

var Member = require('./app/models/member');


//ROUTES FOR API
require('./routes')(app);

//app.use(require('./routes'));

// REGISTER ROUTES. All routes will be prefixed wit /api
//app.use('/api', require('./routes'));


app.listen(port);
console.log('Server is now active on port ' + port);
