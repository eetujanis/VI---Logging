// logger.js
const fs = require('fs');
const path = require('path');

// Log file in root/logs
const logDir = path.join(__dirname, '..', 'logs');
fs.mkdirSync(logDir, { recursive: true });
const logPath = path.join(logDir, 'combined.log');

function writeLog(type, message) {
  const t = new Date().toISOString();
  const line = `${t} [${type}] ${message}\n`;
  // Console output
  console.log(line.trim());
  // Append to root-level log file
  fs.appendFileSync(logPath, line);
}

module.exports = {
  log: (type, msg) => writeLog(type, msg),
  info: (msg) => writeLog('INFO', msg),
  error: (msg) => writeLog('ERROR', msg),
  warn: (msg) => writeLog('WARN', msg),
};