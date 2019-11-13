const yargs = require('yargs');

function getAlias() {
  return yargs.argv._[0];
}

module.exports = {
  getAlias,
};
