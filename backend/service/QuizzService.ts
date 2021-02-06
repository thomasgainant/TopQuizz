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
      console.log("Receiving answer for quizz #"+quizzId);
      console.log("%j", body);
    const database:Database = require('../index').database;
    const Quizz = database.connection["models"]["Quizz"];

    let quizz:any;
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

    console.log("%j", quizz);

    if(quizz != null){
        //FIX creates a copy of the quizz because Sequelize seems to lock the object for modification
        let clone = (JSON.parse(JSON.stringify(quizz)));;

        console.log("QUIZZ ANSWERS");
        console.log("%j", clone.answers);
        console.log(typeof clone);
        console.log(typeof clone.answers);
        if(clone.answers == null || Array.isArray(clone.answers) === false){
            console.log("init quizz answers");
            clone.answers = [];
        }

        console.log("%j", clone.answers);
        console.log("%j", body);
        console.log(typeof body);
        clone.answers.push(body);
        console.log("%j", clone.answers);
        clone = checkQuizz(clone);

        try{
            await Quizz.update({
                questions: clone.questions,
                answers: clone.answers,
                completion: clone.completion
            }, {
                where: {
                  id: clone.id
                }
            });

            resolve(writer.respondWithCode(200, clone));
        }
        catch(modifyError){
            console.error(`Could not modify quizz with id ${quizzId}. Reason: ${modifyError}`);
            reject(writer.respondWithCode(500, `Error: ${modifyError}`));
        }
    }
    else{
        console.error(`Could not find quizz with id ${quizzId}`);
        reject(writer.respondWithCode(404, `Could not find quizz with id ${quizzId}`));
    }
  });
}

function checkQuizz(quizz:Quizz):Quizz{
    if(quizz.answers != null && quizz.answers.length == quizz.questions.length){
        let everyAnswerCorrect:boolean = true;

        for(let index in quizz.questions){
            let question = quizz.questions[index];
            if(question.correctAnswer != null){
                question.chosenAnswer = quizz.answers[index];

                if(checkAnswer(question.chosenAnswer, question.correctAnswer)){
                    question.chosenAnswer.validity = Answer.Validity.Correct;
                }
                else{
                    question.chosenAnswer.validity = Answer.Validity.Incorrect;
                    everyAnswerCorrect = false;
                }
            }
        }

        if(everyAnswerCorrect){
            quizz.completion = Quizz.Completion.Correct;
        }
        else{
            quizz.completion = Quizz.Completion.Incorrect;
        }
    }

    return quizz;
}

function checkAnswer(chosenAnswer:Answer, correctAnswer:Answer):boolean{
    if(chosenAnswer.content === correctAnswer.content){
      return true;
    }
    return false;
}

