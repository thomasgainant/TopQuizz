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
    }

    async sync(){
        let res = await this.sequelize.sync();
        this.connection = res;
    }
}