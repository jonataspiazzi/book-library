const { Router } = require('express');
const router = Router();
const { getCollection } = require('../server/mongodb');
const { objectReflection } = require('../server/objectReflection');

/*
router.get('/', async (req, res) => {
  const collection = await getCollection('books');

  return res.send(objectReflection(collection, 1, true));
});
*/

module.exports = router;