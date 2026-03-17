const express = require('express');
const router = express.Router();
const logger = require('./logger');

let count = 0;

router.use((req, res, next) => {
  logger.info(`ENDPOINT ${req.method} ${req.path}`);
  next();
});

router.get('/read', (req, res) => {
  logger.info(`read ${count}`);
  res.json({ count });
});

router.get('/increase', (req, res) => {
  count += 1;
  logger.info(`increase ${count}`);
  res.json({ count });
});

router.get('/reset', (req, res) => {
  count = 0;
  logger.info(`reset ${count}`);
  res.json({ count });
});

module.exports = router;