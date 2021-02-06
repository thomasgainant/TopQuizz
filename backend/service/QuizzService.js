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
const answer_1 = require("../api/data/answer");
const quizz_1 = require("../api/data/quizz");
const writer = require('../utils/writer.js');
/**
 * Gets a quizz with updated data, including results
 *
 * quizzId Integer UUID of the quizz
 * returns Quizz
 **/
exports.getQuizz = function (quizzId) {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            const database = require('../index').database;
            const Quizz = database.connection["models"]["Quizz"];
            let quizz;
            try {
                quizz = yield Quizz.findOne({
                    where: {
                        id: quizzId
                    }
                });
            }
            catch (error) {
                console.error("Could not fetch Quizz with this id");
                reject(writer.respondWithCode(500, `Error: ${error}`));
            }
            if (quizz != null) {
                resolve(quizz);
            }
            else {
                reject(writer.respondWithCode(404, `Could not find quizz with id ${quizzId}`));
            }
        });
    });
};
/**
 * Get available quizzes for User
 *
 * returns List
 **/
exports.getQuizzes = function () {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            const database = require('../index').database;
            const Quizz = database.connection["models"]["Quizz"];
            let quizzes = [];
            try {
                quizzes = yield Quizz.findAll();
            }
            catch (error) {
                console.error("Could not fetch Quizz with this id");
                reject(writer.respondWithCode(500, `Error: ${error}`));
            }
            resolve(quizzes);
        });
    });
};
/**
 * Sends an answer to a quizz
 *
 * body Answer Answer to add to this quizz
 * quizzId Integer UUID of the quizz
 * returns Quizz
 **/
exports.sendAnswer = function (body, quizzId) {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Receiving answer for quizz #" + quizzId);
            console.log("%j", body);
            const database = require('../index').database;
            const Quizz = database.connection["models"]["Quizz"];
            let quizz;
            try {
                quizz = yield Quizz.findOne({
                    where: {
                        id: quizzId
                    }
                });
            }
            catch (error) {
                console.error("Could not fetch Quizz with this id");
                reject(writer.respondWithCode(500, `Error: ${error}`));
            }
            console.log("%j", quizz);
            if (quizz != null) {
                let clone = (JSON.parse(JSON.stringify(quizz)));
                ;
                console.log("QUIZZ ANSWERS");
                console.log("%j", clone.answers);
                console.log(typeof clone);
                console.log(typeof clone.answers);
                if (clone.answers == null || Array.isArray(clone.answers) === false) {
                    console.log("init quizz answers");
                    clone.answers = [];
                }
                console.log("%j", clone.answers);
                console.log("%j", body);
                console.log(typeof body);
                clone.answers.push(body);
                console.log("%j", clone.answers);
                clone = checkQuizz(clone);
                try {
                    yield Quizz.update({
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
                catch (modifyError) {
                    console.error(`Could not modify quizz with id ${quizzId}. Reason: ${modifyError}`);
                    reject(writer.respondWithCode(500, `Error: ${modifyError}`));
                }
            }
            else {
                console.error(`Could not find quizz with id ${quizzId}`);
                reject(writer.respondWithCode(404, `Could not find quizz with id ${quizzId}`));
            }
        });
    });
};
function checkQuizz(quizz) {
    if (quizz.answers != null && quizz.answers.length == quizz.questions.length) {
        let everyAnswerCorrect = true;
        for (let index in quizz.questions) {
            let question = quizz.questions[index];
            if (question.correctAnswer != null) {
                question.chosenAnswer = quizz.answers[index];
                if (checkAnswer(question.chosenAnswer, question.correctAnswer)) {
                    question.chosenAnswer.validity = answer_1.Answer.Validity.Correct;
                }
                else {
                    question.chosenAnswer.validity = answer_1.Answer.Validity.Incorrect;
                    everyAnswerCorrect = false;
                }
            }
        }
        if (everyAnswerCorrect) {
            quizz.completion = quizz_1.Quizz.Completion.Correct;
        }
        else {
            quizz.completion = quizz_1.Quizz.Completion.Incorrect;
        }
    }
    return quizz;
}
function checkAnswer(chosenAnswer, correctAnswer) {
    if (chosenAnswer.content === correctAnswer.content) {
        return true;
    }
    return false;
}
