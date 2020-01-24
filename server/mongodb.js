const { MongoClient } = require('mongodb');
const { MONGO_CONN_STR, MONGO_DB_NAME } = process.env;

const connectPromise = new Promise((resolve, reject) => {
  const mongoClient = new MongoClient(MONGO_CONN_STR, { 
    poolSize: 6,
    useNewUrlParser: true });

  mongoClient.connect((err, connect) => {
    if (err) reject(err);
    resolve(connect);
  });
});

async function getCollection(collectionName) {
  const connect = await connectPromise;
  const db = connect.db(MONGO_DB_NAME);
  return db.collection(collectionName);
}

module.exports = { getCollection };

