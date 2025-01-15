const Site = require('../database/models/site');
const Category = require('../database/models/category');
const Seasonal = require('../database/models/seasonal');
const Adunit = require('../database/models/adunit');
const Discount = require('../database/models/discount');
const Adformat = require('../database/models/adformat');


// const { request } = require('express');
const express = require('express');

const bodyParser = require('body-parser');
const User = require('../database/models/user');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const jsonParser = bodyParser.json();


const router = express.Router();

/** Получение данных всех сайтов */
router.get('/all', (req, res) => {
  Site.findAll({
    include: [Category, Seasonal, Adunit, Discount]
  })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.get('/names', jsonParser, (req, res) => {
  console.log('Такие данные', req.query.site_name);
  
  Site.count({
    where: {
      site_name: req.query.site_name
    }
  })
    .then((data) => res.json(data === 0))
    .catch((err) => res.json(err));
})

router.get('/urls', (req, res) => {
  Site.count({
    where: {
      site_name: req.body.site_url
    }
  })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
})

/** Получение данных сайта по id */
router.get('/:id', (req, res) => {
  Site.findByPk(
    req.params.id,
    { include: [Category, Seasonal, { model: Adunit, iclude: Adformat }, Discount] }
  )
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

/** Добавление нового сайта с проверкой токена */
router.post('/', jsonParser, (req, res) => {
  console.log(JSON.stringify(req.body));

  User.findOne({
    where: {
      user_token: req.body.user_token || ''
    }
  })
    .then((user) => {
      if (user) {
        Site.create({
          site_name: req.body.site_name,
          site_url: req.body.site_url,
          site_vat: req.body.site_vat,
          site_cover_daily: req.body.site_cover_daily,
          site_cover_weekly: req.body.site_cover_weekly,
          site_cover_monthly: req.body.site_cover_monthly,
          categoryIdCategory: req.body.categoryIdCategory,
          userIdUser: user.id_user
        })
          .then((data) => res.json(data))
          .catch((err) => res.json(err));
      } else {
        res.status(401).json({ auth_error: 'Неверный токен' });
      }
    })
    .catch((err) => res.json(err));
});

/** Получение данных всех сайтов для конкретного админа */
router.post('/admin', jsonParser, (req, res) => {
  User.findOne({
    where: {
      user_token: req.body.user_token || ''
    }
  })
    .then((user) => {
      if (user) {
        if (user.is_super) {
          Site.findAll(
            {
              include: [Category]
            }
          )
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
        } else {
          Site.findAll(
            {
              where: {
                userIdUser: user.id_user
              },
              include: [Category]
            }
          )
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
        }
      } else {
        res.status(401).json({ auth_error: 'Неверный токен' });
      }
    })
    .catch((err) => res.json(err));
});

/** Обновление данных сайта с проверкой токена */
router.patch('/:id', jsonParser, (req, res) => {
  console.log('такие данные', JSON.stringify(req.body));
  
  User.findOne({
    where: {
      user_token: req.body.user_token || ''
    }
  })
    .then((user) => {
      if (user) {
        if (user.is_super) {
          Site.update(req.body, { where: { id_site: +req.params.id } })
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
        } else {
          Site.update(req.body, { where: { id_site: +req.params.id, userIdUser: user.id_user } })
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
        }
      } else {
        res.status(401).json({ auth_error: 'Неверный токен' });
      }
    })
    .catch((err) => res.json(err));
  }
);


module.exports = router