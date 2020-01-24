const express = require('express');
const router = express.Router();
const MongoAdapter = require('../server/mongoAdapter');
const { ObjectID } = require('mongodb');

router.get('/', async (req, res) => {
  const adapter = new MongoAdapter('students');
  const { search, skip, limit } = req.query;

  const data = await adapter.getByQueryText(search, skip, limit);

  res.send(data);
});

router.get('/:id', async (req, res) => {
  const sAdapter = new MongoAdapter('students');
  const student = await sAdapter.getOne(req.params.id);

  if (req.query.loadLoans) {
    const lAdapter = new MongoAdapter('loans');
    student.loans = await lAdapter.getBy({ studentId: ObjectID(req.params.id) });
  }
  
  if (student) res.send(student);
  else res.status(404).end();
});

router.get('/:id/loans', async (req, res) => {
  const adapter = new MongoAdapter('loans');
  const loans = await adapter.getBy({ studentId: ObjectID(req.params.id) });
  
  res.send(loans);
});

router.post('/', async (req, res) => {
  const adapter = new MongoAdapter('students');
  await adapter.create(req.body);

  res.send('Student created with success.');
});

router.put('/:id', async (req, res) => {
  const sAdapter = new MongoAdapter('students');
  const lAdapter = new MongoAdapter('loans');

  await sAdapter.update(req.params.id, req.body);

  await lAdapter.updateMany(
    { studentId: ObjectID(req.params.id) },
    { $set: { studentName: req.body.name } });
  
  res.send(`Student ${req.params.id} updated with success`);
});

router.delete('/:id', async (req, res) => {
  const adapter = new MongoAdapter('students');
  await adapter.delete(req.params.id);
  
  res.send(`Student ${req.params.id} deleted with success`);
});

module.exports = router;