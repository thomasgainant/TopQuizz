import { v4 as uuidv4 } from 'uuid';

import { Quizz } from "./api/data/quizz";

const { Sequelize, DataTypes, Model } = require('sequelize');

export class Database{
    public sequelize:any;
    public connection:any;

    constructor(){
        this.sequelize = new Sequelize(
            require('./config.json').database,
            require('./config.json').databaseLogin,
            require('./config.json').databasePassword,
            {
                host: require('./config.json').databaseHost,
                dialect: "postgres"
            }
        );

        class User extends Model {};
        User.init({
            id: {
                primaryKey: true,
                type: DataTypes.UUID
            },
            email: {
                type: DataTypes.STRING(2048)
            },
            password: {
                type: DataTypes.STRING(2048)
            },
            token: {
                type: DataTypes.STRING(2048)
            },
            tokenExpiration: {
                type: DataTypes.STRING(2048)
            }
          }, {
            // Other model options go here
            sequelize: this.sequelize, // We need to pass the connection instance
            modelName: 'User' // We need to choose the model name
        });

        class Quizz extends Model {};
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
                get: function():{}[] {
                    //@ts-ignore
                    return JSON.parse(this.getDataValue('questions'));
                }, 
                set: function(val:{}[]):{}[] {
                    //@ts-ignore
                    return this.setDataValue('questions', JSON.stringify(val));
                }
            },
            answers: {
                type: DataTypes.STRING(2048),
                get: function():{} {
                    //@ts-ignore
                    return JSON.parse(this.getDataValue('answers'));
                }, 
                set: function(val:{}):{} {
                    //@ts-ignore
                    return this.setDataValue('answers', JSON.stringify(val));
                }
            },
            completion: {
                type: DataTypes.INTEGER
            }
          }, {
            // Other model options go here
            sequelize: this.sequelize, // We need to pass the connection instance
            modelName: 'Quizz' // We need to choose the model name
        });
    }

    async sync(){
        let res = await this.sequelize.sync();
        this.connection = res;
    }

    async init(){
        const database:Database = require('./index').database;
        const User = database.connection["models"]["User"];

        let user;
        try{
            user = await User.findOne({
                where: {
                    email: "topquizz@topquizz.eu"
                }
            });
        }
        catch(error:any){
            console.log("Could not fetch default User");
        }

        if(user == null){
            console.log("Could not find default User, injecting default data in database.");

            try{
                user = await User.create({
                    id: uuidv4(),
                    email: "topquizz@topquizz.eu",
                    password: "topquizz"
                });
            }
            catch(createDefaultUserError:any){
                console.error("Could not create default user topquizz@topquizz.eu. Reason: "+createDefaultUserError);
            }

            let defaultQuizzes:Quizz[] =
            [
                {
                    id: uuidv4(),
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
                        image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Elephant-ear-sponge.jpg",
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
                        image: "https://upload.wikimedia.org/wikipedia/en/0/08/Monty-Python-1975-poster.png",
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
                    id: uuidv4(),
                    title: "Geography",
                    questions: [
                        {
                        content: "How many inhabitants are there in Berlin?",
                        image: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Aerial_view_of_Berlin_%2832881394137%29.jpg",
                        correctAnswer: {
                            content: "3 700 000"
                        },
                        possibleAnswers: [
                            {
                            content: "3 700 000"
                            },
                            {
                            content: "8 600 000"
                            }
                        ]
                        },
                        {
                        content: "How many squared kilometers are the United States of America covering?",
                        image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/USA_orthographic.svg",
                        correctAnswer: {
                            content: "9 800 000"
                        },
                        possibleAnswers: [
                            {
                            content: "9 800 000"
                            },
                            {
                            content: "15 600 000"
                            }
                        ]
                        },
                        {
                        content: "What does the European Uninio motto \"In Varietate Concordia\" mean?",
                        image: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg",
                        correctAnswer: {
                            content: "United in Diversity"
                        },
                        possibleAnswers: [
                            {
                            content: "United in Diversity"
                            },
                            {
                            content: "In Peace there is Trust"
                            }
                        ]
                        },
                        {
                        content: "In which country is the city of Lagos situated?",
                        image: "https://upload.wikimedia.org/wikipedia/commons/6/63/2014_Victoria_Island_Lagos_Nigeria_15006436297.jpg",
                        correctAnswer: {
                            content: "Nigeria"
                        },
                        possibleAnswers: [
                            {
                            content: "Nigeria"
                            },
                            {
                            content: "Thailand"
                            }
                        ]
                        },
                        {
                        content: "Can the sun set on the french empire?",
                        image: "https://upload.wikimedia.org/wikipedia/en/8/85/OSS_117%2C_Le_Caire_nid_d%27espions_poster.jpg",
                        correctAnswer: {
                            content: "Bien sûr que non, mon ami"
                        },
                        possibleAnswers: [
                            {
                            content: "Bien sûr que non, mon ami"
                            },
                            {
                            content: "Yes"
                            }
                        ]
                        }
                    ]
                },
                {
                    id: uuidv4(),
                    title: "History",
                    questions: [
                        {
                        content: "How many battles did Frederic II the Great won?",
                        image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Friedrich_ii_campenhausen.jpg",
                        correctAnswer: {
                            content: "Half of them"
                        },
                        possibleAnswers: [
                            {
                            content: "Half of them"
                            },
                            {
                            content: "All of them"
                            }
                        ]
                        },
                        {
                        content: "When was Babylon founded?",
                        image: "https://upload.wikimedia.org/wikipedia/commons/8/80/Queen_of_the_Night_%28Babylon%29.jpg",
                        correctAnswer: {
                            content: "23rd century BC"
                        },
                        possibleAnswers: [
                            {
                            content: "23rd century BC"
                            },
                            {
                            content: "Year 180 BC"
                            }
                        ]
                        },
                        {
                        content: "When was William Wallace born?",
                        image: "https://upload.wikimedia.org/wikipedia/commons/4/48/William_wallace.jpg",
                        correctAnswer: {
                            content: "1270"
                        },
                        possibleAnswers: [
                            {
                            content: "1270"
                            },
                            {
                            content: "1340"
                            }
                        ]
                        },
                        {
                        content: "In which village was born Joan of Arc?",
                        image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Joan_of_Arc_miniature_graded.jpg",
                        correctAnswer: {
                            content: "Domrémy"
                        },
                        possibleAnswers: [
                            {
                            content: "Domrémy"
                            },
                            {
                            content: "Montreuil"
                            }
                        ]
                        },
                        {
                        content: "How did Joseph Stalin die?",
                        image: "https://upload.wikimedia.org/wikipedia/commons/4/43/Stalin_Full_Image.jpg",
                        correctAnswer: {
                            content: "A stroke"
                        },
                        possibleAnswers: [
                            {
                            content: "A stroke"
                            },
                            {
                            content: "A bomb attack"
                            }
                        ]
                        }
                    ]
                },
                {
                    id: uuidv4(),
                    title: "Gastronomy",
                    questions: [
                        {
                        content: "With what are filled russians pierogis?",
                        image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Pierogi_z_cebulk%C4%85.jpg",
                        correctAnswer: {
                            content: "Mushrooms and potatoes"
                        },
                        possibleAnswers: [
                            {
                            content: "Mushrooms and potatoes"
                            },
                            {
                            content: "Vegetables and ham"
                            }
                        ]
                        },
                        {
                        content: "With what are filled polish pierogis?",
                        image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Pierogi_z_cebulk%C4%85.jpg",
                        correctAnswer: {
                            content: "Cheese and potatoes"
                        },
                        possibleAnswers: [
                            {
                            content: "Cheese and potatoes"
                            },
                            {
                            content: "Mushrooms and potatoes"
                            }
                        ]
                        },
                        {
                        content: "How many chateaux are labelled as Bordeaux wine?",
                        correctAnswer: {
                            content: "8 500"
                        },
                        possibleAnswers: [
                            {
                            content: "8 500"
                            },
                            {
                            content: "250"
                            }
                        ]
                        }
                    ]
                }
            ];

            const Quizz = database.connection["models"]["Quizz"];

            for(let quizz of defaultQuizzes){
                try{
                    await Quizz.create(quizz);
                }
                catch(createDefaultQuizzError:any){
                    console.error("Could not create default quizz "+quizz.title+". Reason: "+createDefaultQuizzError);
                }
            }
        }
    }
}