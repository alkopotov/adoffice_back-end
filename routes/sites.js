const Site = require('../database/models/site');
const Category = require('../database/models/category');
const Seasonal = require('../database/models/seasonal');
const Adunit = require('../database/models/adunit');

const { request } = require('express');
const express = require('express');

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const jsonParser = bodyParser.json();


const router = express.Router();

router.get('/all', (req, res) => {
  Site.findAll({
    include: [Category, Seasonal, Adunit]
  })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.post('/', jsonParser, (req, res) => {
  console.log(JSON.stringify(req.body));
  Site.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});


module.exports = router