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
const database_1 = require("./database");
var path = require('path');
var http = require('http');
var oas3Tools = require('oas3-tools');
var serverPort = require('./config.json').port;
// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};
var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();
var database = null;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            //Database synchronisation
            database = new database_1.Database();
            try {
                yield database.sync();
                yield database.init();
            }
            catch (error) {
                console.error("Database initialisation error: " + error);
                reject();
            }
            // Initialize the Swagger middleware
            http.createServer(app).listen(serverPort, function () {
                console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
                console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
            });
            resolve();
        }));
    });
}
main();
exports.database = database;
