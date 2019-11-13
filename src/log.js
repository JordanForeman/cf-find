const { shouldLog } = require('./should-log');

function log(message) {
  if (shouldLog()) {
    console.log(message);
  }
}

module.exports = {
  log,
};
