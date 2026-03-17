Logging Project – Console + File Logs
This project demonstrates simple logging for an Express-based counter API. Logs are emitted to the console for real-time visibility and are written to a root-level log file (combined.log) in the project root (or to a logs/ folder if you prefer).

Features
Logs every incoming endpoint call
Tracks counter state with read, increase, and reset operations
Logs are written to:
Console (stdout)
Root-level log file: ./combined.log
Optionally: ./logs/combined.log (if you prefer a dedicated logs directory)
Project Structure (root)
app.js (or main.js)
Creates the Express app and mounts routes
routes.js
Defines endpoints:
GET /counter/read
GET /counter/increase
GET /counter/reset
Logs each request and counter state via logger
logger.js
Centralized logger with methods:
info(message)
error(message)
warn(message)
Writes to console and root-level combined.log
Optional: If you prefer a dedicated logs directory instead of a root file, switch to logs/combined.log.

Requirements:

NodeJS: 18
Express: 4.18.2
Winston: 3.11.0

Getting Started
Install dependencies

npm install
Start the server

node app.js
or node main.js (depending on your entry file)
Test endpoints

curl http://localhost:3000/counter/read
curl http://localhost:3000/counter/increase
curl http://localhost:3000/counter/reset
Check logs

Console output shows real-time logs
Root-level log file: ./combined.log (and optionally ./logs/combined.log)
Code Snippets
root logger (logger.js)
js
// logger.js
const fs = require('fs');
const path = require('path');
const logPath = path.join(__dirname, 'combined.log'); // root-level log file

function writeLog(type, message) {
  const t = new Date().toISOString();
  const line = `${t} [${type}] ${message}\n`;
  // Console
  console.log(line.trim());
  // Root-level file
  fs.appendFileSync(logPath, line);
}

module.exports = {
  log: (type, msg) => writeLog(type, msg),
  info: (msg) => writeLog('INFO', msg),
  error: (msg) => writeLog('ERROR', msg),
  warn: (msg) => writeLog('WARN', msg),
};
routes.js
js
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
  logger.info(`zeroed ${count}`);
  res.json({ count });
});

module.exports = router;
app.js
js
const express = require('express');
const app = express();
const port = 3000;

const counterRoutes = require('./routes');
app.use('/counter', counterRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
Troubleshooting
Logs not appearing in file but in console:
Ensure Node process has write permission to the project root.
Confirm the logPath is correct and not overwritten by another config.
Logs not created at all:
Verify the server is running from the same project directory where logger.js resides.
Check for syntax errors or path mismatches in require('./logger').
Customization
To switch to a dedicated logs/ directory:

Change logPath to path.join(__dirname, 'logs', 'combined.log')
Create the logs directory if it doesn’t exist.
To use Winston or another logger, replace logger.js with a Winston-based implementation and adjust routes.js accordingly.

FAQ
What port does the server run on?

Default: 3000 (adjust in app.js if needed)
Where are the logs stored?

Currently: ./

