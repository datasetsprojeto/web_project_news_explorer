const Article = require('../models/article');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(201).send(article))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid data provided'));
      } else {
        next(err);
      }
    });
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Article not found');
      }

      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Not authorized to delete this article');
      }

      return Article.findByIdAndDelete(req.params.articleId)
        .then(() => res.send({ message: 'Article deleted successfully' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid article ID'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};