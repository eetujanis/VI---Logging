// counter.js
const express = require('express');
const router = express.Router();

// In-memory state for the counter (module-scoped)
let count = 0;

router.get('/read', (req, res) => {
  res.json({ count });
});

router.get('/increase', (req, res) => {
  count += 1;
  res.json({ count });
});

router.get('/reset', (req, res) => {
  count = 0;
  res.json({ count });
});

module.exports = router;