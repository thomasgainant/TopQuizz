'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');
var Quizz = require('../service/QuizzService');

module.exports.getQuizz = function getQuizz (req, res, next, quizzId) {
  User.identifyUser(req.get("Authorization")).then(
    Quizz.getQuizz(quizzId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    })
  ).catch(

  );
};

module.exports.getQuizzes = function getQuizzes (req, res, next) {
  User.identifyUser(req.get("Authorization")).then(
    Quizz.getQuizzes()
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      })
  ).catch(

  );
};

module.exports.sendAnswer = function sendAnswer (req, res, next, body, quizzId) {
  User.identifyUser(req.get("Authorization")).then(
    Quizz.sendAnswer(body, quizzId)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      })
  ).catch(

  );
};
