const Discount = require('../database/models/discount');
const User = require('../database/models/user');
const Site = require('../database/models/site');

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


router.post('/', jsonParser, (req, res) => {
  User.findOne({
    where: {
      user_token: req.body.user_token || ''
    }
  }).
    then((user) => {
      if (user) {
        if(user.is_super){
          Discount.create(req.body)
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
        }
        else {
          Site.findOne({
            where: {
              id_site: req.body.siteIdSite,
              userIdUser: user.id_user
            }
          }).
            then((site) => {
              if (site) {
                Discount.create(req.body)
                  .then((data) => res.json(data))
                  .catch((err) => res.json(err));
              }
              else res.status(401).json({ auth_error: 'Неверный токен' });
            })
            .catch((err) => res.json(err));
        }
      }
      else res.status(401).json({ auth_error: 'Неверный токен' });
    })
    .catch((err) => res.json(err));
})
module.exports = router;