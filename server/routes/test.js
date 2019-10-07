const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get
router.get('/', async (req, res) => {
  const info = await loadCollection();
  res.send(await info.find({}).toArray());
})

async function loadCollection() {
  const client = await mongodb.MongoClient.connect('mongodb://localhost:27017', {
    useNewUrlParser: true
  });
  return client.db('web-app-db').collection('test');
}

module.exports = router;
