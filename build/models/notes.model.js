"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _mongoose = _interopRequireDefault(require("mongoose"));
var notesSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  noteDetails: {
    type: String
  },
  isArchive: {
    type: Boolean,
    "default": false
  },
  isInTrash: {
    type: Boolean,
    "default": false
  }
});
var Notes = _mongoose["default"].model('Notes', notesSchema);
module.exports = Notes;
// export default Notes;