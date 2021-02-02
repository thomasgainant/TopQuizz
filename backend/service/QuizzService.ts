'use strict';

import { Database } from "../database";

import { Answer } from "../api/data/answer";
import { Quizz } from "../api/data/quizz";

const writer = require('../utils/writer.js');

/**
 * Gets a quizz with updated data, including results
 *
 * quizzId Integer UUID of the quizz
 * returns Quizz
 **/
exports.getQuizz = function(quizzId:string) {
  return new Promise(async function(resolve, reject) {
    const database:Database = require('../index').database;
    const Quizz = database.connection["models"]["Quizz"];

    let quizz;
    try{
        quizz = await Quizz.findOne({
            where: {
                id: quizzId
            }
        });
    }
    catch(error:any){
        console.error("Could not fetch Quizz with this id");
        reject(writer.respondWithCode(500, `Error: ${error}`));
    }

    if(quizz != null){
        resolve(quizz);
    }
    else{
        reject(writer.respondWithCode(404, `Could not find quizz with id ${quizzId}`));
    }
  });
}


/**
 * Get available quizzes for User
 *
 * returns List
 **/
exports.getQuizzes = function() {
  return new Promise(async function(resolve, reject) {
    const database:Database = require('../index').database;
    const Quizz = database.connection["models"]["Quizz"];

    let quizzes:Quizz[] = [];
    try{
        quizzes = await Quizz.findAll();
    }
    catch(error:any){
        console.error("Could not fetch Quizz with this id");
        reject(writer.respondWithCode(500, `Error: ${error}`));
    }

    resolve(quizzes);
  });
}


/**
 * Sends an answer to a quizz
 *
 * body Answer Answer to add to this quizz
 * quizzId Integer UUID of the quizz
 * returns Quizz
 **/
exports.sendAnswer = function(body:Answer, quizzId:string) {
  return new Promise(async function(resolve, reject) {
    const database:Database = require('../index').database;
    const Quizz = database.connection["models"]["Quizz"];

    let quizz;
    try{
        quizz = await Quizz.findOne({
            where: {
                id: quizzId
            }
        });
    }
    catch(error:any){
        console.error("Could not fetch Quizz with this id");
        reject(writer.respondWithCode(500, `Error: ${error}`));
    }

    if(quizz != null){
        if(quizz.answers == null || quizz.answers.length == 0){
            quizz.answers = [];
        }

        quizz.answers.push(body);

        try{
            await Quizz.update(quizz, {
                where: {
                  id: quizz.id
                }
            });

            resolve(writer.respondWithCode(200, quizz));
        }
        catch(modifyError){
            reject(writer.respondWithCode(500, `Error: ${modifyError}`));
        }
    }
    else{
        reject(writer.respondWithCode(404, `Could not find quizz with id ${quizzId}`));
    }
  });
}

