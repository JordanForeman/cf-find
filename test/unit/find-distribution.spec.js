const sinon = require('sinon');
const AWS = require('aws-sdk');
const { expect } = require('chai');
const proxyquire = require('proxyquire');
const Chance = require('chance');

const chance = new Chance();

function givenDistribution(alias = chance.string()) {
    return {
        Aliases: {
            Items: chance.shuffle([
                ...chance.n(chance.string, chance.d6()),
                alias
            ])
        },
        Id: chance.guid()
    };
}

describe('Get distributions and filter by provided alias', () => {
    let cloudFrontClientStub,
        listDistributions,
        promise,
        findDistribution,
        alias,
        log,
        shouldLog;

    afterEach(sinon.restore);

    beforeEach(() => {
        alias = chance.string();
        cloudFrontClientStub = sinon.stub();
        promise = sinon.stub();
        listDistributions = sinon.stub().returns({ promise });
        log = sinon.stub();
        shouldLog = sinon.stub();
        sinon.stub(console, 'trace');
        sinon.stub(console, 'log');

        class CloudFront {
            constructor(...args) {
                cloudFrontClientStub(...args);

                return { listDistributions };
            }
        }

        sinon.stub(AWS, 'CloudFront').value(CloudFront);

        findDistribution = proxyquire('../../src/find-distribution', {
            'aws-sdk': { CloudFront },
            './should-log': { shouldLog },
            './log': { log }
        }).findDistribution;
    });

    describe('Distribution found', () => {
        let expectedDistribution,
            expectedDistributions;

        beforeEach(() => {
            expectedDistribution = givenDistribution(alias);
            expectedDistributions = chance.shuffle([
                ...chance.n(givenDistribution, chance.d6()),
                expectedDistribution
            ]);
            promise.resolves({
                DistributionList: {
                    Items: expectedDistributions
                }
            });
        });

        describe('logging enabled', () => {
            beforeEach((done) => {
                shouldLog.returns(true);

                findDistribution(alias).then(done);
            });

            it('should log stuff', () => {
                expect(log.callCount).to.equal(2);
                expect(log.args[0]).to.deep.equal([`found [${expectedDistributions.length}] distributions`]);
                expect(log.args[1]).to.deep.equal([`Distribution Id: ${expectedDistribution.Id}`]);
            });
        });

        describe('logging disabled', () => {
            beforeEach((done) => {
                shouldLog.returns(false);

                findDistribution(alias).then(done);
            });

            it('should log stuff', () => {
                expect(console.log.callCount).to.equal(1);
                expect(console.log.args[0]).to.deep.equal([expectedDistribution.Id]);
            });
        });
    });

    describe('Distribution not found', () => {
        let result;

        beforeEach((done) => {
            promise.resolves({
                DistributionList: {
                    Items: chance.n(givenDistribution, chance.d6())
                }
            });

            findDistribution(alias).catch((e) => {
                result = e;
                done();
            });
        });

        it('should have thrown an error', () => {
            expect(result instanceof Error).to.equal(true);
            expect(result.message).to.equal(`No distribution found with alias: ${alias}`);
        });
    });
});
