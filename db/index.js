
const mongodb = require('mongodb');

const Database = global.Database = function () {
    this.mongodb = mongodb;
    this.uri = process.env.NODE_ENV === 'production' ? `mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@${process.env.dbName}.lhukfkf.mongodb.net/?retryWrites=true&w=majority` : `mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@${process.env.dbName}.5dvkf.mongodb.net/?retryWrites=true&w=majority`;


    this.client = new mongodb.MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: mongodb.ServerApiVersion.v1 });
    this.db;
}

Database.prototype.initialise = async function (app) {
    try {
        await this.client.connect();
        this.db = this.client.db('cbe');
        this.db.collection("users").createIndex({ username: 1 }, { unique: true });
        this.db.collection("attendances").createIndex({ workerId: 1, date: 1 }, { unique: true });

        console.log('mongodb client connected');
        app.emit('ready');
    } catch (error) {
        console.log(error);
        this.client.close();
    }
}

Database.i = new Database;
