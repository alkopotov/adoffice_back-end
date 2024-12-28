const Seasonal = require('../database/models/seasonal');
const User = require('../database/models/user');
const Site = require('../database/models/site');
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');


const jsonParser = bodyParser.json();

router.post('/sites/:id', jsonParser, (req, res) => {
  Seasonal.bulkCreate(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
})

router.get('/sites/:id', (req, res) => {
  Seasonal.findAll({
    where: {
      siteIdSite: req.params.id
    }
  })
    .then((data) => res.json(data.sort((a, b) => a.month - b.month)))
    .catch((err) => res.json(err));
})

router.put('/:id', jsonParser, (req, res) => {
  User.findOne({
    where: {
      user_token: req.body.user_token || ''
    }
  })
    .then((user) => {
      if (user) {
        if (user.is_super) {
          Seasonal.update(req.body, { where: { id_seasonal: +req.params.id } })
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
                Seasonal.update(req.body, { where: { id_seasonal: +req.params.id } })
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