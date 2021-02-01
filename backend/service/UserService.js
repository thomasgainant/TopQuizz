'use strict';


/**
 * Logs a User in by sending a username and password
 *
 * body User User with correct log in information
 * returns User
 **/
exports.logUserIn = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "password" : "password",
  "tokenExpiration" : "tokenExpiration",
  "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
  "email" : "",
  "token" : "token"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

