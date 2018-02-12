"use strict";

let mongoose = require('mongoose');

// User Schema
let userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	created_date: {
		type: Date,
		default: Date.now
	}
});

let User = module.exports = mongoose.model('User', userSchema);

// Get Users
module.exports.getUsers = function(callback, limit){
	User.find(callback).limit(limit);
};

module.exports.getUserById = function(userId, callback){
	User.findById(userId, callback);
};

module.exports.addUser = function(user, callback){
	User.create(user, callback);
};

module.exports.updateUser = function(userId, user, options, callback){
	let query = {_id: userId};
	let update = {
		name: user.name
	};
	User.findOneAndUpdate(query, update, options, callback);
};

module.exports.removeUser = function(userId, callback){
	let query = {_id: userId};
	User.remove(query, callback);
};