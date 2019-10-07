const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

async function loadCollection() {
  const client = await mongodb.MongoClient.connect('mongodb://localhost:27017', {
    useNewUrlParser: true
  });
  return client.db('web-app-db').collection('users');
}

// Sign up
router.post('/signup', async (req, res) => {
  const users = loadCollection();
  await posts.insertOne({
    name: req.body.name,
    surname: req.body.surname,
    age: req.body.age,
    email: req.body.email,
    phone: req.body.phone
  });
  res.status(201).send();
});

// Sign in
router
