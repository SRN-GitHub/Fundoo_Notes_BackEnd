"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var userController = _interopRequireWildcard(require("../controllers/user.controller"));
var _user2 = require("../validators/user.validator");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// import { userAuth } from '../middlewares/auth.middleware';

var router = _express["default"].Router();

//^ Route to get all users
// router.get('/getuser', userController.getAllUsers);

//^ Route to create a new user
router.post('/createuser', _user2.newUserValidator, userController.newUser);

//*  Route to Login User >>>
router.post('/login', userController.loginUser);

//& Route to get a single user by their user id
// router.get('/:_id', userController.getUser);

//& Route to update a single user by their user id
// router.put('/:_id', userController.updateUser);

//! Route to delete a single user by their user id
// router.delete('/:_id', userController.deleteUser);
var _default = exports["default"] = router;