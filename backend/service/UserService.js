'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logUserIn = void 0;
const uuid_1 = require("uuid");
const writer = require('../utils/writer.js');
/**
 * Logs a User in by sending a username and password
 *
 * body User User with correct log in information
 * returns User
 **/
function logUserIn(body) {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            const database = require('../index').database;
            if (body.email && body.password) {
                const User = database.connection["models"]["User"];
                let user;
                try {
                    user = yield User.findOne({
                        where: {
                            email: body.email,
                            password: body.password
                        }
                    });
                }
                catch (error) {
                    console.error("Could not find User with this login data");
                    reject(writer.respondWithCode(500, `Error: ${error}`));
                }
                user.token = uuid_1.v4();
                user.tokenExpiration = new Date().getTime() / 1000;
                try {
                    yield User.update(user, {
                        where: {
                            id: user.id
                        }
                    });
                    resolve(writer.respondWithCode(200, { token: user.token, tokenExpiration: user.tokenExpiration }));
                }
                catch (modifyError) {
                    reject(writer.respondWithCode(500, `Error: ${modifyError}`));
                }
            }
            else {
                console.error("Could not find required login data in:");
                console.error("%j", body);
                reject();
            }
        });
    });
}
exports.logUserIn = logUserIn;
