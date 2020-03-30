const sinon = require('sinon');
const { expect } = require('chai');
const proxyquire = require('proxyquire');
const Chance = require('chance');

const chance = new Chance();

describe('Execute the thing', () => {
    afterEach(sinon.restore);

    it('should process args and execute the process', () => {
        const alias = chance.string();
        const getAlias = sinon.stub().returns(alias);
        const log = sinon.stub();
        const findDistribution = sinon.stub();

        const { main } = proxyquire('../../src/main', {
            './get-alias': { getAlias },
            './log': { log },
            './find-distribution': { findDistribution }
        });

        main();

        expect(getAlias.callCount, 'should call getAlias [1] time(s)')
            .to.equal(1);
        expect(log.callCount, 'should call log [1] time(s)')
            .to.equal(1);
        expect(log.firstCall.args).to.deep.equal([`searching for CloudFront distribution with alias: ${alias}`]);
        expect(findDistribution.callCount, 'should call findDistribution [1] time(s)')
            .to.equal(1);
        expect(findDistribution.firstCall.args).to.deep.equal([alias]);
    });
});
