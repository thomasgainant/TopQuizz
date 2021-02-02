"use strict";
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
exports.Database = void 0;
const uuid_1 = require("uuid");
const { Sequelize, DataTypes, Model } = require('sequelize');
class Database {
    constructor() {
        this.sequelize = new Sequelize(require('./config.json').database, require('./config.json').databaseLogin, require('./config.json').databasePassword, {
            host: require('./config.json').databaseHost,
            dialect: "postgres"
        });
        class User extends Model {
        }
        ;
        User.init({
            id: {
                primaryKey: true,
                type: DataTypes.UUID
            },
            email: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            },
            token: {
                type: DataTypes.STRING
            },
            tokenExpiration: {
                type: DataTypes.INTEGER
            }
        }, {
            // Other model options go here
            sequelize: this.sequelize,
            modelName: 'User' // We need to choose the model name
        });
        class Quizz extends Model {
        }
        ;
        Quizz.init({
            id: {
                primaryKey: true,
                type: DataTypes.UUID
            },
            title: {
                type: DataTypes.STRING
            },
            questions: {
                type: DataTypes.STRING(2048),
                get: function () {
                    //@ts-ignore
                    return JSON.parse(this.getDataValue('questions'));
                },
                set: function (val) {
                    //@ts-ignore
                    return this.setDataValue('questions', JSON.stringify(val));
                }
            },
            answers: {
                type: DataTypes.STRING(2048),
                get: function () {
                    //@ts-ignore
                    return JSON.parse(this.getDataValue('answers'));
                },
                set: function (val) {
                    //@ts-ignore
                    return this.setDataValue('answers', JSON.stringify(val));
                }
            },
            completion: {
                type: DataTypes.INTEGER
            }
        }, {
            // Other model options go here
            sequelize: this.sequelize,
            modelName: 'Quizz' // We need to choose the model name
        });
    }
    sync() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.sequelize.sync();
            this.connection = res;
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const database = require('./index').database;
            const User = database.connection["models"]["User"];
            let user;
            try {
                user = yield User.findOne({
                    where: {
                        email: "topquizz@topquizz.eu"
                    }
                });
            }
            catch (error) {
                console.log("Could not fetch default User");
            }
            if (user == null) {
                console.log("Could not find default User, injecting default data in database.");
                try {
                    user = yield User.create({
                        id: uuid_1.v4(),
                        email: "topquizz@topquizz.eu",
                        password: "topquizz"
                    });
                }
                catch (createDefaultUserError) {
                    console.error("Could not create default user topquizz@topquizz.eu. Reason: " + createDefaultUserError);
                }
                let defaultQuizzes = [
                    {
                        id: uuid_1.v4(),
                        title: "Zoology",
                        questions: [
                            {
                                content: "How long does the gestation period of an african elephant last?",
                                image: 'https://upload.wikimedia.org/wikipedia/commons/6/63/African_elephant_warning_raised_trunk.jpg',
                                correctAnswer: {
                                    content: "22 months"
                                },
                                possibleAnswers: [
                                    {
                                        content: "22 months"
                                    },
                                    {
                                        content: "32 months"
                                    }
                                ]
                            },
                            {
                                content: "Are cats carnivore or omnivore in nature?",
                                image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Domestic_Cat_Demonstrating_Dilated_Slit_Pupils.jpg',
                                correctAnswer: {
                                    content: "Carnivore"
                                },
                                possibleAnswers: [
                                    {
                                        content: "Carnivore"
                                    },
                                    {
                                        content: "Omnivore"
                                    }
                                ]
                            },
                            {
                                content: "How many animal species have been listed on planet Earth?",
                                correctAnswer: {
                                    content: "1 250 000"
                                },
                                possibleAnswers: [
                                    {
                                        content: "1 250 000"
                                    },
                                    {
                                        content: "3 200 000"
                                    }
                                ]
                            },
                            {
                                content: "What is the class of the common squid?",
                                image: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Sepioteuthis_sepioidea_%28Caribbean_Reef_Squid%29.jpg',
                                correctAnswer: {
                                    content: "Cephalopoda"
                                },
                                possibleAnswers: [
                                    {
                                        content: "Cephalopoda"
                                    },
                                    {
                                        content: "Arthropoda"
                                    }
                                ]
                            },
                            {
                                content: "Can a five ounce african swallow carry a one pound coconut?",
                                correctAnswer: {
                                    content: "Yes"
                                },
                                possibleAnswers: [
                                    {
                                        content: "Yes"
                                    },
                                    {
                                        content: "No"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: uuid_1.v4(),
                        title: "Geography",
                        questions: [
                            {
                                content: "How long does the gestation period of an elephant last?",
                                correctAnswer: {
                                    content: "22 months"
                                },
                                possibleAnswers: [
                                    {
                                        content: "22 months"
                                    },
                                    {
                                        content: "32 months"
                                    }
                                ]
                            },
                            {
                                content: "How long does the gestation period of an elephant last?",
                                correctAnswer: {
                                    content: "22 months"
                                },
                                possibleAnswers: [
                                    {
                                        content: "22 months"
                                    },
                                    {
                                        content: "32 months"
                                    }
                                ]
                            },
                            {
                                content: "How long does the gestation period of an elephant last?",
                                correctAnswer: {
                                    content: "22 months"
                                },
                                possibleAnswers: [
                                    {
                                        content: "22 months"
                                    },
                                    {
                                        content: "32 months"
                                    }
                                ]
                            },
                            {
                                content: "How long does the gestation period of an elephant last?",
                                correctAnswer: {
                                    content: "22 months"
                                },
                                possibleAnswers: [
                                    {
                                        content: "22 months"
                                    },
                                    {
                                        content: "32 months"
                                    }
                                ]
                            },
                            {
                                content: "How long does the gestation period of an elephant last?",
                                correctAnswer: {
                                    content: "22 months"
                                },
                                possibleAnswers: [
                                    {
                                        content: "22 months"
                                    },
                                    {
                                        content: "32 months"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: uuid_1.v4(),
                        title: "History",
                        questions: [
                            {
                                content: "How long does the gestation period of an elephant last?",
                                correctAnswer: {
                                    content: "22 months"
                                },
                                possibleAnswers: [
                                    {
                                        content: "22 months"
                                    },
                                    {
                                        content: "32 months"
                                    }
                                ]
                            },
                            {
                                content: "How long does the gestation period of an elephant last?",
                                correctAnswer: {
                                    content: "22 months"
                                },
                                possibleAnswers: [
                                    {
                                        content: "22 months"
                                    },
                                    {
                                        content: "32 months"
                                    }
                                ]
                            },
                            {
                                content: "How long does the gestation period of an elephant last?",
                                correctAnswer: {
                                    content: "22 months"
                                },
                                possibleAnswers: [
                                    {
                                        content: "22 months"
                                    },
                                    {
                                        content: "32 months"
                                    }
                                ]
                            },
                            {
                                content: "How long does the gestation period of an elephant last?",
                                correctAnswer: {
                                    content: "22 months"
                                },
                                possibleAnswers: [
                                    {
                                        content: "22 months"
                                    },
                                    {
                                        content: "32 months"
                                    }
                                ]
                            },
                            {
                                content: "How long does the gestation period of an elephant last?",
                                correctAnswer: {
                                    content: "22 months"
                                },
                                possibleAnswers: [
                                    {
                                        content: "22 months"
                                    },
                                    {
                                        content: "32 months"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: uuid_1.v4(),
                        title: "Gastronomy",
                        questions: [
                            {
                                content: "How long does the gestation period of an elephant last?",
                                correctAnswer: {
                                    content: "22 months"
                                },
                                possibleAnswers: [
                                    {
                                        content: "22 months"
                                    },
                                    {
                                        content: "32 months"
                                    }
                                ]
                            },
                            {
                                content: "How long does the gestation period of an elephant last?",
                                correctAnswer: {
                                    content: "22 months"
                                },
                                possibleAnswers: [
                                    {
                                        content: "22 months"
                                    },
                                    {
                                        content: "32 months"
                                    }
                                ]
                            },
                            {
                                content: "How long does the gestation period of an elephant last?",
                                correctAnswer: {
                                    content: "22 months"
                                },
                                possibleAnswers: [
                                    {
                                        content: "22 months"
                                    },
                                    {
                                        content: "32 months"
                                    }
                                ]
                            },
                            {
                                content: "How long does the gestation period of an elephant last?",
                                correctAnswer: {
                                    content: "22 months"
                                },
                                possibleAnswers: [
                                    {
                                        content: "22 months"
                                    },
                                    {
                                        content: "32 months"
                                    }
                                ]
                            }
                        ]
                    }
                ];
                const Quizz = database.connection["models"]["Quizz"];
                for (let quizz of defaultQuizzes) {
                    try {
                        yield Quizz.create(quizz);
                    }
                    catch (createDefaultQuizzError) {
                        console.error("Could not create default quizz " + quizz.title + ". Reason: " + createDefaultQuizzError);
                    }
                }
            }
        });
    }
}
exports.Database = Database;
