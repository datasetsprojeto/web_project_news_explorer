const express = require('express');
const { celebrate, Joi } = require('celebrate');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');
const auth = require('../middlewares/auth');

const router = express.Router();

// All article routes require authentication
router.use(auth);

// Get all articles for the current user
router.get('/articles', getArticles);

// Create a new article
router.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().uri(),
    image: Joi.string().required().uri(),
  }),
}), createArticle);

// Delete an article by ID
router.delete('/articles/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }),
}), deleteArticle);

module.exports = router;
