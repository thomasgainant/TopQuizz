'use strict';

var utils = require('../utils/writer.js');
var Quizz = require('../service/QuizzService');

module.exports.getQuizz = function getQuizz (req, res, next, quizzId) {
  Quizz.getQuizz(quizzId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getQuizzes = function getQuizzes (req, res, next) {
  Quizz.getQuizzes()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.sendAnswer = function sendAnswer (req, res, next, body, quizzId) {
  Quizz.sendAnswer(body, quizzId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
