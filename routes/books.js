const express = require('express');
const router = express.Router();
const { ObjectID } = require('mongodb');
const MongoAdapter = require('../server/mongoAdapter');
const { sanitizeBook } = require('../models/book');

router.get('/', async (req, res) => {
  const adapter = new MongoAdapter('books');
  const { search, skip, limit } = req.query;

  const data = await adapter.getByQueryText(search, skip, limit);

  res.send(data);
});

router.get('/:id', async (req, res) => {
  const bAdapter = new MongoAdapter('books');
  const book = await bAdapter.getOne(req.params.id);

  if (req.query.loadLoans) {
    const lAdapter = new MongoAdapter('loans');
    book.loans = await lAdapter.getBy({ bookId: ObjectID(req.params.id) });
  }

  if (book) res.send(book);
  else res.status(404).end();
});

router.get('/:id/loans', async (req, res) => {
  const adapter = new MongoAdapter('loans');
  const loans = await adapter.getBy({ bookId: ObjectID(req.params.id) });

  res.send(loans);
});
  
router.post('/', async (req, res) => {
  const adapter = new MongoAdapter('books');
  await adapter.create(sanitizeBook(req.body));

  res.send('Book created with success.');
});
  
router.put('/:id', async (req, res) => {
  const bAdapter = new MongoAdapter('books');
  const lAdapter = new MongoAdapter('loans');

  await bAdapter.update(req.params.id, sanitizeBook(req.body));
  await lAdapter.updateMany(
    { bookId: ObjectID(req.params.id) },
    { $set: { bookName: req.body.title } });
  
  res.send(`Book ${req.params.id} updated with success`);
});
  
router.delete('/:id', async (req, res) => {
  const adapter = new MongoAdapter('books');
  await adapter.delete(req.params.id);
  
  res.send(`Book ${req.params.id} deleted with success`);
});

module.exports = router;