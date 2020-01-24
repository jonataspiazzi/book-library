const mongodb = require('mongodb');
const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');
const sanitizeBook = require('./book').sanitizeBook;
const sanitizeStudent = require('./student').sanitizeStudent;
const MONGO_CONN_STR_2 = 'mongodb+srv://usr-mb-book-library:sK1-QF1xBC8p@cluster0-ztl1n.mongodb.net/mb-book-library-dev?retryWrites=true&w=majority';
const MONGO_DB_NAME_2 = 'mb-book-library-dev';
const MONGO_CONN_STR = 'mongodb+srv://usr-mb-book-library:sK1-QF1xBC8p@cluster0-ztl1n.mongodb.net/mb-book-library?retryWrites=true&w=majority';
const MONGO_DB_NAME = 'mb-book-library';

const run = async () => {
  console.log('before open conection');

  const conn = await mongodb.connect(MONGO_CONN_STR, { useNewUrlParser: true });
  const db = await conn.db(MONGO_DB_NAME);

  console.log('conection was open');

  const data = await db.collection('students').find().toArray();

  console.log('data: ', data);

  console.log('end');
};

const run2 = async () => {
  const conn = await mongodb.connect(MONGO_CONN_STR, { useNewUrlParser: true });
  const db = await conn.db(MONGO_DB_NAME);
  const collection = db.collection('students');

  displayObject('root', collection, 2);
};

const displayObject = (name, obj, maxDepth) => {
  const type = typeof obj;

  if (maxDepth < 0) return;

  switch(type) {
    case 'function':
      console.log(`${name} = [function]`);
      break;
    case 'object':
      for(let prop in obj) {
        deep(`${name}.${prop}`, obj[prop], maxDepth - 1);
      }
      break;
    default:
      console.log(`${name} = [${type}] ${obj}`);
      break;
  }
}

const run3 = async () => {
  console.log('test' + ObjectID(ObjectID()));
}

const listCollections = async () => {
  const conn = await mongodb.connect(MONGO_CONN_STR, { useNewUrlParser: true });
  const db = await conn.db(MONGO_DB_NAME);
  const collections = await db.listCollections().toArray();
  
  console.log(collections.map(m => m.name));
}

const copyDB = async () => {
  console.log(`Opening [${MONGO_DB_NAME}]...`);
  const connO = await mongodb.connect(MONGO_CONN_STR, { useNewUrlParser: true });
  const dbO = await connO.db(MONGO_DB_NAME);

  console.log(`Opening [${MONGO_DB_NAME_2}]...`);
  const connD = await mongodb.connect(MONGO_CONN_STR_2, { useNewUrlParser: true });
  const dbD = await connD.db(MONGO_DB_NAME_2);

  console.log('Listing collections');
  const collectionNames = (await dbO.listCollections().toArray()).map(m => m.name);

  for (let collectionName of collectionNames) {
    const collectionO = dbO.collection(collectionName);
    const collectionD = dbD.collection(collectionName);

    console.log(`In collection [${collectionName}] finding data...`);

    const items = await collectionO.find().toArray();

    console.log(`In collection [${collectionName}] coping ${items.length} items...`);

    await collectionD.insertMany(items);
  }

  console.log('Finished.');
}

const run4 = async () => {
  const conn = await mongodb.connect(MONGO_CONN_STR, { useNewUrlParser: true });
  const db = await conn.db(MONGO_DB_NAME);
  const collection = db.collection('books');
  const data = await collection.find({ title: { $regex: 'a' }}).toArray();

  for (let i = 0; i < data.length; i++) {
    const before = data[i - 1] || {};
    const current = data[i];

    console.log(`${i - 1}[${before._id}] < ${i}[${current._id}] : `, before._id > current._id);
  }
}

const sanitizeCollection = async (collectionName, sanitizer) => {
  const conn = await mongodb.connect(MONGO_CONN_STR, { useNewUrlParser: true });
  const db = await conn.db(MONGO_DB_NAME);
  
  const collection = db.collection(collectionName);
  const data = await collection.find().toArray();

  for (let item of data) {
    const query = { _id: ObjectID(item._id) };
    const newValues = { $set: sanitizer({ ...item }) };
    
    await collection.updateOne(query, newValues);
  }
}

const updateMock = async (collectionName) => {
  console.log('updating mock', collectionName);

  const conn = await mongodb.connect(MONGO_CONN_STR, { useNewUrlParser: true });
  const db = await conn.db(MONGO_DB_NAME);
  const collection = db.collection(collectionName);

  const data = await collection.find().toArray();

  console.log(`coping ${data.length} documents to mock.`);

  const dataText = JSON.stringify(data, null, 2);

  fs.writeFileSync(`../mock/${collectionName}.json`, dataText);

  console.log('finished to copy');
}

const removeBlocked = async (id) => {
  const conn = await mongodb.connect(MONGO_CONN_STR, { useNewUrlParser: true });
  const db = await conn.db(MONGO_DB_NAME);
  const collection = db.collection('students');

  const student = await collection.findOne({ _id: ObjectID(id) });

  student.blocked = false;
  student.blockedUntil = null;
  student.blockedMessage = null;

  await collection.updateOne({ _id: ObjectID(id) }, { $set: student });

  console.log('Unblocked.');
}

const changeLoanDate = async (days) => {
  const conn = await mongodb.connect(MONGO_CONN_STR, { useNewUrlParser: true });
  const db = await conn.db(MONGO_DB_NAME);
  const collection = db.collection('loans');

  const loans = await collection.find().toArray();

  for (let loan of loans) {
    loan.loanDate.setDate(loan.loanDate.getDate() - days);
    loan.dueDate.setDate(loan.dueDate.getDate() - days);

    console.log(`Updating ${loan.studentName} - ${loan.bookTitle}...`);
    await collection.updateOne({ _id: loan.id }, { $set: loan });
  }

  console.log(`Returned ${loans.length} loans.`);
}


//sanitizeCollection('books', sanitizeBook);
//sanitizeCollection('students', sanitizeStudent);
//updateMock('books');
//updateMock('students');
//removeBlocked('5d02970d1c9d440000c9164d');

changeLoanDate(20);