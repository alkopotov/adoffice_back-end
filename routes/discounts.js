const Discount = require('../database/models/discount');

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();


router.get('/:id', (req, res) => {  
  Discount.findAll(  {
    where: {
      siteIdSite: req.params.id
    }
  })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
})

module.exports = router;