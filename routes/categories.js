const Category = require('../database/models/category');

const express = require('express');

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const router = express.Router();

router.get('/all', (req, res) => {
  Category.findAll()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.post('/', jsonParser, (req, res) => {
  Category.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.put('/:id', jsonParser, (req, res) => { 
  Category.update(req.body, {where: {id_category: +req.params.id}})
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});


module.exports = router;