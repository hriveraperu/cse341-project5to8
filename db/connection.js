const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;

dotenv.config();

let _db;

const initDb = (callback) => {
    if (_db) {
        console.log('Db Initialized');
        return callback(null, _db);
    }
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    if (!_db) {
        throw Error('Db not Initialized');
    }
    return _db;
};

module.exports = {
    initDb,
    getDb,
};
