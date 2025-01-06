const User = require('../database/models/user');
const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const bcrypt = require('bcrypt');

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

router.post('/register', jsonParser, (req, res) => {
  User.count().
    then((data) => {
      User.create({
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_password: req.body.user_password,
        is_super: data === 0,
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
  console.log(bcrypt.hashSync(req.body.user_password + req.body.user_email, 10));
  User.findOne({
    where: {
      user_email: req.body.user_email,
    }
  }).
    then((data) => {
    if (bcrypt.compareSync(req.body.user_password, data.user_password)) {
      User.update(
        {
          user_token: userToken,
          user_agent: req.body.user_agent
        },
        {
          where: {
            user_email: req.body.user_email,
          }
        }
      ).
        then((data) => res.json({ user_token: userToken })).
        catch((err) => res.json(err));
    } else {
      res.json({ auth_error: 'Неверный логин или пароль' });
    }
  }).
    catch((err) => res.json(err));
});

module.exports = router;