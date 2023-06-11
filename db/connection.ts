import dotenv from 'dotenv';
import { Document, MongoClient, Db, Collection } from 'mongodb';

dotenv.config();

let _db: Db;

const initDb = (callback: any) => {
    if (_db) {
        console.log('Db Initialized');
        return callback(null, _db);
    }

    const mongoURI = process.env.MONGODB_URI;
    if(!mongoURI) {
        throw Error('MongoDB URI Not found in environment variables');
    }

    MongoClient.connect(mongoURI)
        .then((client: any) => {
            _db = client.db();
            callback(null, _db);
        })
        .catch((err: any) => {
            console.error('MongoDb connection Error:', err);
            callback(err);
        });
};

const getDb = () => {
    if (!_db) {
        throw Error('Db not Initialized');
    }
    return _db;
};

const getCollection = <T extends Document>(name: string): Collection<T> => {
    const db = getDb();
    return db.collection<T>(name);
  };

export { initDb, getDb };