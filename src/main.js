const express = require('express');
const app = express();
const port = 3000;
const counterRoutes = require('./routes');

app.use('/counter', counterRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});