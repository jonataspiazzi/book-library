const { ObjectID } = require('mongodb');
const { clearId } = require('./clearId');
const mongoAdapterMock = require('./mongoAdapterMock');
const { normalizer }  = require('../models/normalizer');
const { applyLimitControl } = require('../config');
const { getCollection } = require('./mongodb');

function MongoAdapter(collectionName) {
  this.getOne = async (id) => {
    const collection = await getCollection(collectionName);
    
    const data = await collection.findOne(ObjectID(id));

    if (!data) return null;

    clearId(data);

    return data;
  }

  this.getBy = async (query) => {
    const collection = await getCollection(collectionName);
    
    const data = await collection.find(query).limit(applyLimitControl()).toArray();
    data.forEach(c => clearId(c));

    return data;
  }

  this.getByQueryText = async (text, skip, limit) => {
    const collection = await getCollection(collectionName);

    let filter = undefined;

    if (text) {
      const $regex = normalizer(text).replace(/\./g, '.+');
      filter = { querytext: { $regex }};
    }
    
    let cursor = collection.find(filter);

    const count = await cursor.count();
    
    cursor = cursor.sort({ querytext: 1 });

    const nskip = Number(skip) || 0;
    const nlimit = applyLimitControl(limit);

    if (nskip) cursor = cursor.skip(nskip);
    if (nlimit) cursor = cursor.limit(nlimit);

    const data = await cursor.toArray();
    data.forEach(c => clearId(c));

    return { skip: nskip, limit: nlimit, count, data };
  }

  this.getAll = async () => {
    return this.getBy();
  }

  this.create = async (obj) => {
    const collection = await getCollection(collectionName);

    const data = clearId({ ... obj }, true, true);

    await collection.insertOne(data);
  }

  this.update = async (id, obj) => {
    const collection = await getCollection(collectionName);

    const query = { _id: ObjectID(id) };
    const newValues = { $set: clearId({ ...obj }, true, true) };
  
    await collection.updateOne(query, newValues);
  }

  this.updateMany = async (query, newValues) => {
    const collection = await getCollection(collectionName);
  
    await collection.updateMany(query, newValues);
  }

  this.delete = async (id) => {
    const collection = await getCollection(collectionName);
  
    await collection.deleteOne({ _id: ObjectID(id) });
  }
}

module.exports = mongoAdapterMock(MongoAdapter);