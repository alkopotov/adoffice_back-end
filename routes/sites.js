const Site = require('../database/models/site');
const Category = require('../database/models/category');
const Seasonal = require('../database/models/seasonal');
const Adunit = require('../database/models/adunit');
const Discount = require('../database/models/discount');
const Adformat = require('../database/models/adformat');
const Image = require('../database/models/image');
const User = require('../database/models/user');


// const { request } = require('express');
const express = require('express');

const bodyParser = require('body-parser');


const urlencodedParser = bodyParser.urlencoded({ extended: false });

const jsonParser = bodyParser.json();


const router = express.Router();

/** Получение данных для карточек главной страницы */
router.get('/main', async (req, res) => {

  const sites = await Site.findAll();
  const adunits = await Adunit.findAll();

  let totalCover = sites.reduce((total, site) => {
    return total + site.site_cover_monthly;
  }, 0);

  let totalViews = adunits.reduce((total, adunit) => {
    return total + adunit.adunit_views_daily;
  }, 0);
  
  res.json({
    sites_number: sites.length,
    total_monthly_cover: totalCover,
    adunits_number: adunits.length,
    total_daily_views: totalViews
  });


});

/** Получение всех данных всех сайтов */
router.get('/all', (req, res) => {
  Site.findAll({
    include: [Category, Seasonal, Adunit, Discount]
  })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

/** Получение сезонных коэффициентов и скидок для медиаплана */
router.post('/mediaplan', jsonParser, (req, res) => {
  Site.findAll({
    include: [Seasonal, Discount]
  })
    .then((data) => res.json(data.filter((site) => req.body.siteIds.includes(site.id_site))))
    .catch((err) => res.json(err));
})

/** Проверка уникальности имени сайта */
router.get('/names', (req, res) => {
  Site.count({
    where: {
      site_name: req.query.site_name
    }
  })
    .then((data) => res.json(data === 0))
    .catch((err) => res.json(err));
})



/** Проверка уникальности домена сайта */
router.get('/domains', (req, res) => {
  Site.count({
    where: {
      site_domain: req.query.site_domain
    }
  })
    .then((data) => res.json(data === 0))
    .catch((err) => res.json(err));
})

/** Удаление сайта по id c проверкой токена */
router.delete('/delete/:id', jsonParser, (req, res) => {
  User.findOne({
    where: {
      user_token: req.body.user_token || ''
    }
  })
    .then((user) => {
      if (user) {
        if (user.is_super) {
          Site.destroy({ where: { id_site: +req.params.id } })
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
        } 
        else {
          Site.destroy({ where: { id_site: +req.params.id, userIdUser: user.id_user } })
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
        }
      } else {
        res.status(401).json({ auth_error: 'Неверный токен' });
      }
    })
    .catch((err) => res.json(err));
});

/** Получение данных сайта по id */
router.get('/:id', (req, res) => {
  Site.findByPk(
    req.params.id,
    { include: [Category, Seasonal, {model: Adunit, iclude: Adformat}, Discount, Image] }
  )
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

/** Добавление нового сайта с проверкой токена */
router.post('/', jsonParser, (req, res) => {
  User.findOne({
    where: {
      user_token: req.body.user_token || ''
    }
  })
    .then((user) => {
      if (user) {
        Site.create({
          ...req.body,
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


module.exports = router;