'use strict';

// user-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: { type: String, required: true },
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  birthday: { type: String },
  roles: { type: [String], enum: ['member', 'admin'], default: 'member' },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
