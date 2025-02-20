const Adformat = require('../database/models/adformat');
const Adunit = require('../database/models/adunit');
const User = require('../database/models/user');
const Site = require('../database/models/site');

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

router.get('/all', (req, res) => {
  Adunit.findAll({
    include: [Adformat, Site]
  })
    .then((data) => res.json(data.map((adunit) => {
      return {
        id_adunit: adunit.id_adunit,
        adunit_position: adunit.adunit_position,
        adunit_is_mobile: adunit.adunit_is_mobile,
        adunit_cpm: adunit.adunit_cpm,
        adunit_ctr: adunit.adunit_ctr,
        adunit_picture: adunit.adunit_picture,
        adunit_demo_url: adunit.adunit_demo_url,
        adunit_views_daily: adunit.adunit_views_daily,
        adunit_cover_daily: adunit.adunit_cover_daily,
        adunit_cover_weekly: adunit.adunit_cover_weekly,
        adunit_cover_monthly: adunit.adunit_cover_monthly,
        siteIdSite: adunit.siteIdSite,
        adformat: adunit.adformat,
        site_domain: adunit.site.dataValues.site_domain,
        site_name: adunit.site.dataValues.site_name
      }
    })))
    .catch((err) => res.json(err));
});

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

router.post('/delete', jsonParser, (req, res) => {
  User.findOne({
    where: {
      user_token: req.body.user_token || ''
    }
  })
    .then((user) => {
      if (user) {
        if (user.is_super) {
          Adunit.destroy({ where: { id_adunit: req.body.id_adunit } })
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
                Adunit.destroy({ where: { id_adunit: req.body.id_adunit } })
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


router.patch('/update', jsonParser, (req, res) => {
  User.findOne({
    where: {
      user_token: req.body.user_token || ''
    }
  })
    .then((user) => {
      if (user) {
        if (user.is_super) {
          Adunit.update(req.body, { where: { id_adunit: req.body.id_adunit } })
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
                Adunit.update(req.body, { where: { id_adunit: req.body.id_adunit } })
                  .then((data) => res.json(data))
                  .catch((err) => res.json(err));
              }
              else res.status(401).json({ auth_error: 'Неверный токен' });
            })
            .catch((err) => res.json(err));
        }
      } else res.status(401).json({ auth_error: 'Неверный токен' });
    })
    .catch((err) => res.json(err));
})

module.exports = router;

