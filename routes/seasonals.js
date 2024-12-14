const Seasonal = require('../database/models/seasonal');
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');


const jsonParser = bodyParser.json();

router.post('/sites/:id', jsonParser, (req, res) => {
  Seasonal.bulkCreate(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
})

module.exports = router;