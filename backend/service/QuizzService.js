'use strict';


/**
 * Gets a quizz with updated data, including results
 *
 * quizzId Integer UUID of the quizz
 * returns Quizz
 **/
exports.getQuizz = function(quizzId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "completion" : "Correct",
  "questions" : [ {
    "image" : "image",
    "correctAnswer" : {
      "validity" : "Correct",
      "content" : "content"
    },
    "possibleAnswers" : [ null, null ],
    "content" : "content"
  }, {
    "image" : "image",
    "correctAnswer" : {
      "validity" : "Correct",
      "content" : "content"
    },
    "possibleAnswers" : [ null, null ],
    "content" : "content"
  } ],
  "answers" : [ null, null ],
  "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
  "title" : "title"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get available quizzes for User
 *
 * returns List
 **/
exports.getQuizzes = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "password" : "password",
  "tokenExpiration" : "tokenExpiration",
  "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
  "email" : "",
  "token" : "token"
}, {
  "password" : "password",
  "tokenExpiration" : "tokenExpiration",
  "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
  "email" : "",
  "token" : "token"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Sends an answer to a quizz
 *
 * body Answer Answer to add to this quizz
 * quizzId Integer UUID of the quizz
 * returns Quizz
 **/
exports.sendAnswer = function(body,quizzId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "completion" : "Correct",
  "questions" : [ {
    "image" : "image",
    "correctAnswer" : {
      "validity" : "Correct",
      "content" : "content"
    },
    "possibleAnswers" : [ null, null ],
    "content" : "content"
  }, {
    "image" : "image",
    "correctAnswer" : {
      "validity" : "Correct",
      "content" : "content"
    },
    "possibleAnswers" : [ null, null ],
    "content" : "content"
  } ],
  "answers" : [ null, null ],
  "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
  "title" : "title"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

