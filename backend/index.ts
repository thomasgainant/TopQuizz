'use strict';

import { Database } from './database';

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

var database:any = null;

async function main(){
    return new Promise<void>(async (resolve, reject) => {
        //Database synchronisation
        database = new Database();        
        await database.sync();

        // Initialize the Swagger middleware
        http.createServer(app).listen(serverPort, function () {
            console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
            console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
        });

        resolve();
    });
}
main();