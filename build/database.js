"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].connect('mongodb://localhost/test-rentCar', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true
}).then(function (db) {
  return console.log('DATABASE RENT CAR is connected');
})["catch"](function (err) {
  return console.log(err);
});