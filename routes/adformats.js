const Adformat = require('../database/models/adformat');
const User = require('../database/models/user');

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
  User.findOne({
    where: {
      user_token: req.body.user_token || ''
    }
  })
    .then((user) => {
      if(user) {
        Adformat.create(req.body)
          .then((data) => res.json(data))
          .catch((err) => res.json(err));
      }
      else {
        res.status(401).json({auth_error: "Неверный токен"})
      }
    })
    .catch(err => res.json(err));
  }
);

module.exports = router;
