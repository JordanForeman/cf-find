const yargs = require('yargs');

function shouldLog() {
    return !yargs.argv.silent;
}

module.exports = {
    shouldLog
};
