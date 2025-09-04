const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/config');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  // Validação básica adicional
  if (!email || !password || !name) {
    return next(new BadRequestError('Email, password and name are required'));
  }

  // Removido o hash manual - deixe o modelo fazer isso
  User.create({
    email,
    password, // O modelo fará o hash automaticamente
    name,
  })
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.status(201).send(userObj);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid data provided'));
      } else if (err.code === 11000) {
        next(new ConflictError('Email already exists'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  console.log('Login attempt for:', email);

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        console.log('User not found:', email);
        throw new UnauthorizedError('Invalid email or password');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            console.log('Invalid password for:', email);
            throw new UnauthorizedError('Invalid email or password');
          }

          const token = jwt.sign(
            { _id: user._id },
            JWT_SECRET,
            { expiresIn: '7d' },
          );

          res.send({ token });
        });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      res.send(user);
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
};