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
/**
 * Gets a quizz with updated data, including results
 *
 * quizzId Integer UUID of the quizz
 * returns Quizz
 **/
exports.getQuizz = function (quizzId) {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    });
};
