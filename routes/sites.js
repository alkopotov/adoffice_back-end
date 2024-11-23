const Site = require('../database/models/site');
const Category = require('../database/models/category');
const Seasonal = require('../database/models/seasonal');
const Adunit = require('../database/models/adunit');

const { request } = require('express');
const express = require('express');

const router = express.Router();

router.get('/all', (req, res) => {
  Site.findAll({
    include: [Category, Seasonal, Adunit]
  })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});


module.exports = router