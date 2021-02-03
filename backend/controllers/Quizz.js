'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');
var Quizz = require('../service/QuizzService');

module.exports.getQuizz = function getQuizz (req, res, next, quizzId) {
  User.identifyUser(req.get("Authorization")).then(function(identified){
    if(identified){
      Quizz.getQuizz(quizzId)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
    }
    else{
      utils.writeJson(res, writer.respondWithCode(403, "User unidentified"));
    }
  }).catch(function(response){
      utils.writeJson(res, writer.respondWithCode(500, "User unidentified"));
  });
};

module.exports.getQuizzes = function getQuizzes (req, res, next) {
  User.identifyUser(req.get("Authorization")).then(function(identified){
    if(identified){
      Quizz.getQuizzes()
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
    }
    else{
      utils.writeJson(res, writer.respondWithCode(403, "User unidentified"));
    }
  }).catch(function(response){
      utils.writeJson(res, writer.respondWithCode(500, "User unidentified"));
  });
};

module.exports.sendAnswer = function sendAnswer (req, res, next, body, quizzId) {
  User.identifyUser(req.get("Authorization")).then(function(identified){
    if(identified){
      Quizz.sendAnswer(body, quizzId)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
    }
    else{
      utils.writeJson(res, writer.respondWithCode(403, "User unidentified"));
    }
  }).catch(function(response){
      utils.writeJson(res, writer.respondWithCode(500, "User unidentified"));
  });
};
