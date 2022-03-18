const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let database;
async function connectToDatabase() {
    const client = await MongoClient.connect('mongodb://localhost:27017'); //returns promise. connecting to mongodb server
    database = client.db('online-shop') //establishing connection to database.
}


function getDb() {
    if(!database) {
        throw new Error('You\'re not connected');
    }

    return database;
}


module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb
} 