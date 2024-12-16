const User = require('../database/models/user');
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

router.post('/register', jsonParser, (req, res) => {
  let userIsSuper = false;
  User.findAll().
    then((data) => {
      console.log(data, "длина данных", data.length);
      if (data.length === 0) {
      userIsSuper = true;
      }
      console.log(userIsSuper);
      
      User.create({
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_password: req.body.user_password,
        is_super: userIsSuper,
        user_token: req.body.userAgent + Date.now()
      })
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

module.exports = router;