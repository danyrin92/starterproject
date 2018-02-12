"use strict";

let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

app.use(bodyParser.json());

let User = require('./models/user');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/starterdb');
let db = mongoose.connection;

app.get('/', function(req, res){
	res.send('Please use /api');
});

app.get('/api/users', function(req, res){
	User.getUsers(function(err, users){
		if (err) {
			throw err;
		}
		res.json(users);
	});
});

app.get('/api/users/:_id', function(req, res){
	User.getUserById(req.params._id, function(err, user){
		if (err) {
			throw err;
		}
		res.json(user);
	});
});

app.post('/api/users', function(req, res){
	let user = req.body;
	User.addUser(user, function(err, user){
		if (err){
			throw(err);
		}
		res.json(user);
	});
});

app.put('/api/users/:_id', function(req, res){
	let id = req.params._id;
	let user = req.body;
	User.updateUser(id, user, {}, function(err, user){
		if (err){
			throw(err);
		}
		res.json(user);
	});
});

app.delete('/api/users/:_id', function(req, res){
	let id = req.params._id;
	User.removeUser(id, function(err, user){
		if (err){
			throw(err);
		}
		res.json(user);
	})
})

app.listen(3000);
console.log('Running starterproject on port 3000...');