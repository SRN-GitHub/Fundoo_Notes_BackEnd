"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = require("@hapi/joi");
var _errors = require("@hapi/joi/lib/errors");
var _extend = require("@hapi/joi/lib/extend");
var _mongoose = require("mongoose");
var userSchema = new _mongoose.Schema({
  FirstName: {
    type: String
  },
  LastName: {
    type: String
  },
  Email: {
    type: String,
    unique: true
  },
  Age: {
    type: Number
  },
  Password: {
    type: String
  }
  // confirmPassword: {type: String}
}, {
  timestamps: true
});
var _default = exports["default"] = (0, _mongoose.model)('User', userSchema);