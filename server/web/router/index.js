'use strict';

const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

router.get('/api/v1/formulas', api.formulas.all);

module.exports = router;
