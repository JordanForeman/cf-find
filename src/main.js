const { getAlias } = require('./get-alias');
const { log } = require('./log');
const { findDistribution } = require('./find-distribution');

function main() {
    const alias = getAlias();
    log(`searching for CloudFront distribution with alias: ${alias}`);
    findDistribution(alias);
}

module.exports = {
    main
};
