import { MongoClient } from 'mongodb';

let client;

export const initializeDbConnection = async () => {
    try {
        const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.og4lf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
        client = await MongoClient.connect(uri, {
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