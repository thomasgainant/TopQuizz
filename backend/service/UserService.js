'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.logUserIn = void 0;
/**
 * Logs a User in by sending a username and password
 *
 * body User User with correct log in information
 * returns User
 **/
function logUserIn(body) {
    return new Promise(function (resolve, reject) {
        if (body.email && body.password) {
        }
        else {
            console.error("Could not find every login information in:");
            console.error("%j", body);
            reject();
        }
    });
}
exports.logUserIn = logUserIn;
