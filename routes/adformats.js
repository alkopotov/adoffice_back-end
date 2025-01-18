const Adformat = require('../database/models/adformat');

const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

router.get('/all', (req, res) => {
  Adformat.findAll()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.post('/', jsonParser, (req, res) => {
  Adformat.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

module.exports = router;
