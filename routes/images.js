const Image = require('../database/models/image');
const express = require('express');


const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const router = express.Router();

// Проверка уникальности адреса изображения
router.get('/check-url', (req, res) => {
  Image.count({
    where: {
      image_url: req.query.image_url
    }
  })
    .then((data) => res.json(data === 0))
    .catch((err) => res.json(err));
});

module.exports = router;
