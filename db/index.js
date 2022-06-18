
const { MongoClient, ServerApiVersion } = require('mongodb');

const Db = module.exports = function()
{
    this.uri = `mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@${process.env.dbName}.5dvkf.mongodb.net/?retryWrites=true&w=majority`;
    this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    this.db;
}

Db.prototype.initialise = async function( app )
{
    try {
        await this.client.connect();
        this.db = this.client.db( 'cbe' );
        this.db.collection( "users" ).createIndex( { username: 1}, { unique: true } );
        
        console.log( 'mongodb client connected' );
        app.emit( 'ready' );
    } catch (error) {
        console.log( error );
        client.close();
    }
}

Db.i = new Db;
