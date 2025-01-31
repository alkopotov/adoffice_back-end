const Image = require('../database/models/image');
const User = require('../database/models/user');
const Site = require('../database/models/site');

const express = require('express');


const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const router = express.Router();

/**  Проверка уникальности адреса изображения */
router.get('/check-url', (req, res) => {
  Image.count({
    where: {
      image_url: req.query.image_url
    }
  })
    .then((data) => res.json(data === 0))
    .catch((err) => res.json(err));
});

//** Добавление изображения с проверкой токена */
router.post('/add', jsonParser, (req, res) => {
  User.findOne({
    where: {
      user_token: req.body.user_token || ''
    }
  })
    .then((user) => {
      if (user) {
        if (user.is_super) {
          Image.create(req.body)
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
                Image.create(req.body)
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

}
);


//** Удаление изображения с проверкой токена */
router.post('/delete', jsonParser, (req, res) => {
  User.findOne({
    where: {
      user_token: req.body.user_token || ''
    }
  })
    .then((user) => {
      if (user) {
        if (user.is_super) {
          Image.destroy({ where: { id_image: req.body.id_image } })
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
                Image.destroy({ where: { id_image: req.body.id_image } })
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


//** Обновление изображения с проверкой токена */
router.patch('/update', jsonParser, (req, res) => {
  User.findOne({
    where: {
      user_token: req.body.user_token || ''
    }
  })
    .then((user) => {
      if (user) {
        if (user.is_super) {
          Image.update(req.body, { where: { id_image: req.body.id_image } })
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
                Image.update(req.body, { where: { id_image: req.body.id_image } })
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
