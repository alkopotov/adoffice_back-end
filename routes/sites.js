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

router.get('/all', (req, res) => {
  Site.findAll({
    include: [Category, Seasonal, Adunit, Discount]
  })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.get('/:id', (req, res) => {
  Site.findByPk(
    req.params.id,
    {include: [Category, Seasonal, {model: Adunit, iclude: Adformat}, Discount]}
  )
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

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


module.exports = router