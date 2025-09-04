const express = require('express');
const articlesRouter = require('./articles');
const usersRouter = require('./users');

const router = express.Router();

router.use(usersRouter);
router.use(articlesRouter);

module.exports = router;