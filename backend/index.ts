'use strict';

import { Database } from './database';

var path = require('path');
var http = require('http');
var oas3Tools = require('oas3-tools');
var cors = require('cors');

var serverPort = require('./config.json').port;

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();
app.use(cors());

/*let corsMiddleware = app._router.stack[app._router.stack.length - 1];
console.log(corsMiddleware);
app._router.stack.splice(app._router.stack - 1, 1);
app._router.stack.unshift(corsMiddleware);*/

/*app.all('/*', function(req:any, res:any, next:any) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});*/

/*app.use(function(req:any, res:any, next:any){
    res.on('finish', function(){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
    });
    next();
});*/

/*app.all('/*', function(req:any, res:any, next:any){
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});*/

/*app.all('/*', function(req:any, res:any, next:any) {
    res.set('Access-Control-Allow-Origin', '*'),
    res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS, DELETE, HEAD');

    console.log("%j", res.getHeaders());

    next();
});*/

/*app._router.stack.forEach(function(r:any){
    if (r.route && r.route.path){
      console.log(r.route.path)
    }
})

console.log("%j", app._router.stack);*/

var database:any = null;

async function main(){
    return new Promise<void>(async (resolve, reject) => {
        //Database synchronisation
        database = new Database();
        try{
            await database.sync();
            await database.init();
        }
        catch(error:any){
            console.error("Database initialisation error: "+error);
            reject();
        }

        // Initialize the Swagger middleware
        http.createServer(app).listen(serverPort, function () {
            console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
            console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
        });

        resolve();
    });
}
main();

exports.database = database;