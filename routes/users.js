const User = require('../database/models/user');
const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

router.post('/register', jsonParser, (req, res) => {
  User.findAll().
    then((data) => {
      User.create({
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_password: req.body.user_password,
        is_super: data.length === 0,
        user_token: uuid.v4(),
        user_agent: req.body.user_agent,
      })
        .then((data) => res.json({ user_token: data.user_token }))
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
    .then((data) => res.json({ authorized: data !== null }))
    .catch((err) => res.json(err));
});

router.post('/login', jsonParser, (req, res) => {
  let userToken = uuid.v4();
  User.update(
    {
      user_token: userToken,
      user_agent: req.body.user_agent
    },
    {
      where: {
        user_email: req.body.user_email,
        user_password: req.body.user_password
      }
    }
  )
    .then((data) => data[0] ? res.json({ user_token: userToken }) : res.json({ auth_error: 'Неверный логин или пароль' }))
    .catch((err) => res.json(err));
});

module.exports = router;