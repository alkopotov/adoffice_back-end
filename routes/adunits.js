const Adformat = require('../database/models/adformat');
const Adunit = require('../database/models/adunit');
const User = require('../database/models/user');
const Site = require('../database/models/site');

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

router.get('/sites/:id', (req, res) => {
  Adunit.findAll({
    where: {
      siteIdSite: req.params.id
    },
    include: [Adformat]
  })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
})

router.post('/add', jsonParser, (req, res) => {
  User.findOne({
    where: {
      user_token: req.body.user_token || ''
    }
  })
    .then((user) => {
      if (user) {
        if (user.is_super) {
          Adunit.create(req.body)
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
        }
        else {
          Site.findOne({
            where: {
              id_site: req.body.siteIdSite,
              userIdUser: user.id_user
            }
          })
            .then((site) => {
              if (site) {
                Adunit.create(req.body)
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

