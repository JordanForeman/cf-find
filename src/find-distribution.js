const AWS = require('aws-sdk');
const { log } = require('./log');
const { shouldLog } = require('./should-log');

const CloudFront = new AWS.CloudFront();

function findDistribution(alias) {
  return CloudFront
    .listDistributions()
    .promise()
    .then((data) => {
      const distributions = data.DistributionList.Items;
      log(`found [${distributions.length}] distributions`);

      const distribution = distributions.find((dist) => dist.Aliases
                    && dist.Aliases.Items.length
                    && dist.Aliases.Items.includes(alias));

      if (!distribution) {
        throw new Error(`No distribution found with alias: ${alias}`);
      }

      if (!shouldLog()) {
        console.log(distribution.Id);
      }

      log(`Distribution Id: ${distribution.Id}`);
    });
}

module.exports = {
  findDistribution,
};
