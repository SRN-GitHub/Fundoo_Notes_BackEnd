"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUserValidator = void 0;
var _joi = _interopRequireWildcard(require("@hapi/joi"));
var _user = _interopRequireDefault(require("../models/user.model"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var newUserValidator = exports.newUserValidator = function newUserValidator(req, res, next) {
  var schema = _joi["default"].object({
    FirstName: _joi["default"].string().min(2).required(),
    LastName: _joi["default"].string().min(2).required(),
    Email: _joi["default"].string().email().required(),
    Age: _joi["default"].number().required(),
    Password: _joi["default"].string().min(8).required().label('Paaassword L1')
    // confirmPassword: Joi.any().equal(Joi.ref('Passsword L2'))
    // .required().label('Confrim PasssWord L3')
    // .options({ messages:{ 'any.only': '{{#label}} does not match L4' } })
  });
  var _schema$validate = schema.validate(req.body),
    error = _schema$validate.error,
    value = _schema$validate.value;
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};