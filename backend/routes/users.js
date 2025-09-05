const express = require('express');
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const { createUser, login, getCurrentUser } = require('../controllers/users');

const router = express.Router();

// Register
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

// Login
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

// Get current user - protected by authentication
router.get('/users/me', auth, getCurrentUser);

module.exports = router;
