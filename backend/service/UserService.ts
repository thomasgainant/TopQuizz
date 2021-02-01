'use strict';

import { User } from "../api/data/user";


/**
 * Logs a User in by sending a username and password
 *
 * body User User with correct log in information
 * returns User
 **/
export function logUserIn(body:User) {
  return new Promise(function(resolve, reject) {
    if(body.email && body.password){
        
    }
    else{
        console.error("Could not find every login information in:");
        console.error("%j", body);
        reject();
    }
  });
}

