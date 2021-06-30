import { MongoClient } from 'mongodb';

let client;

export const initializeDbConnection = async () => {
    try {
        client = await MongoClient.connect('mongodb://localhost:27017', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.log(error)
    }
}


export const getDbConnection = dbName => {
    const db = client.db(dbName);
    return db;
}