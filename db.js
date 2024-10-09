const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster1.zmorlas.mongodb.net/plantDB?retryWrites=true&w=majority`
  )
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback()
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

// Inserting data into a collection after connection is established
const insertPlant = () => {
  const db = getDb(); // Get the connected database instance
  db.collection('plants').insertOne({ name: 'Fern', type: 'Indoor' }) // Inserting a document
    .then(result => {
      console.log('Plant inserted:', result);
    })
    .catch(err => {
      console.error('Error inserting plant:', err);
    });
};

// Start the connection and insert a plant after connection is established
mongoConnect(() => {
  insertPlant(); // Insert the plant after successfully connecting to the database
});

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;