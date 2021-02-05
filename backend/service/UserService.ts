'use strict';

import { v4 as uuidv4 } from 'uuid';
import { Database } from '../database';

import { User } from "../api/data/user";

const writer = require('../utils/writer.js');

/**
 * Logs a User in by sending a username and password
 *
 * body User User with correct log in information
 * returns User
 **/
export function logUserIn(body:User) {
  return new Promise(async function(resolve, reject) {
    const database:Database = require('../index').database;

    if(body.email && body.password){
        const User = database.connection["models"]["User"];

        let user;
        try{
          user = await User.findOne({
                where: {
                  email: body.email,
                  password: body.password
                }
            });
        }
        catch(error:any){
          console.error("Could not find User with this login data");
          reject(writer.respondWithCode(403, `Error: ${error}`));
        }

        console.log("User authenticated, generating new token...");
        user.token = uuidv4();
        user.tokenExpiration = new Date().getTime() + 1000*60*60;
        console.log("Token is "+user.token+", valid until "+new Date(user.tokenExpiration));

        try{
          console.log("Saving user with new token:");
          console.log("%j", user);

          await User.update({
            token: user.token,
            tokenExpiration: user.tokenExpiration
          }, {
              where: {
                id: user.id
              }
          });

          resolve(writer.respondWithCode(200, {token: user.token, tokenExpiration: user.tokenExpiration}));
        }
        catch(modifyError){
          console.error('Could not save token for user. Reason: '+modifyError);
          reject(writer.respondWithCode(500, `Error: ${modifyError}`));
        }
    }
    else{
        console.error("Could not find required login data in:");
        console.error("%j", body);
        reject();
    }
  });
}

export function identifyUser(headerValue:string){
  return new Promise(async function(resolve, reject) {
    if(headerValue == null || headerValue == ""){
      console.log("Could not authorize user as no authorization header has been sent.");
      resolve(false);
    }
    else{
      const database:Database = require('../index').database;
      const User = database.connection["models"]["User"];

      let token:string = headerValue.replace('Bearer ', '');
      console.log("Authorizing user with token "+token);

      let user;
      try{
        user = await User.findOne({
              where: {
                token: token
              }
          });
      }
      catch(error:any){
        console.error("Could not fetch User with this token");
        reject(writer.respondWithCode(500, `Error: ${error}`));
      }

      if(user != null){
        if(new Date().getTime() < user.tokenExpiration){
          resolve(true);
        }
        else{
          resolve(false);
        }
      }
      else{
        resolve(false);
      }
    }
  });
}