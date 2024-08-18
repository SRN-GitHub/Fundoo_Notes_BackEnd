"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUser = exports.loginUserOne = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _base = require("@hapi/joi/lib/base");
var _user = _interopRequireDefault(require("../models/user.model"));
var _user2 = _interopRequireDefault(require("../routes/user.route"));
var _morgan = require("morgan");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var bcrypt = require('bcryptjs');

//*   performs core oporations . CRUD operations performing. 
//&   create new user >>> BCRYPTS

var newUser = exports.newUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var saltRound, hashedPassword, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (body.Password) {
            _context.next = 2;
            break;
          }
          throw new Error('Password is requiredd');
        case 2:
          saltRound = 12;
          _context.next = 5;
          return bcrypt.hash(body.Password, saltRound);
        case 5:
          hashedPassword = _context.sent;
          _context.next = 8;
          return _user["default"].create(_objectSpread(_objectSpread({}, body), {}, {
            Password: hashedPassword
          }));
        case 8:
          data = _context.sent;
          return _context.abrupt("return", data);
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function newUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

//* LOGIN USER >>>

var loginUserOne = exports.loginUserOne = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(Email, Password) {
    var user, isMatch;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _user["default"].findOne({
            Email: Email
          });
        case 2:
          user = _context2.sent;
          if (user) {
            _context2.next = 5;
            break;
          }
          throw new Error('User Not Found');
        case 5:
          _context2.next = 7;
          return bcrypt.compare(Password, user.Password);
        case 7:
          isMatch = _context2.sent;
          if (isMatch) {
            _context2.next = 10;
            break;
          }
          throw new Error('Invalid Password');
        case 10:
          return _context2.abrupt("return", {
            id: user.id,
            FirstName: user.FirstName,
            LastName: user.LastName,
            email: user.Email
          });
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function loginUserOne(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

// get all users
// export const getAllUsers = async () => {
//   const data = await User.find();
//   return data;
// };

//update single user
// export const updateUser = async (_id, body) => {
//   const data = await User.findByIdAndUpdate(
//     {
//       _id
//     },
//     body,
//     {
//       new: true
//     }
//   );
//   return data;
// };

//delete single user
// export const deleteUser = async (id) => {
//   await User.findByIdAndDelete(id);
//   return '';
// };

//get single user
// export const getUser = async (id) => {
//   const data = await User.findById(id);
//   return data;
// };