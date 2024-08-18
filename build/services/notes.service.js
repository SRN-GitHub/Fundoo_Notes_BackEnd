"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newNotes = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _notes = _interopRequireDefault(require("../models/notes.model"));
//*     CREATE NOTES >>>

var newNotes = exports.newNotes = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var note;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _notes["default"].create(body);
        case 3:
          note = _context.sent;
          return _context.abrupt("return", note);
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log('errorrrrr');
          throw new Error('Unable to Create Notes');
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function newNotes(_x) {
    return _ref.apply(this, arguments);
  };
}();