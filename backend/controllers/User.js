'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.logUserIn = function logUserIn (req, res, next, body) {
  User.logUserIn(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
