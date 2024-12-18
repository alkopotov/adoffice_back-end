const User = require('../database/models/user');
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

router.post('/register', jsonParser, (req, res) => {
  let userIsSuper = false;
  User.findAll().
    then((data) => {
      if (data.length === 0) {
      userIsSuper = true;
      }
      console.log(userIsSuper);
      
      User.create({
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_password: req.body.user_password,
        is_super: userIsSuper,
        user_token: `${Date.now()}`,
        user_agent: req.body.user_agent,
      })
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

router.post('/check', jsonParser, (req, res) => {
  User.findOne({
    where: {
      user_token: req.body.user_token,
      user_agent: req.body.user_agent
    }
  })
    .then((data) =>  data === null ? res.json({authorized: false}) : res.json({authorized: true}))
    .catch((err) => res.json(err));
});

module.exports = router;