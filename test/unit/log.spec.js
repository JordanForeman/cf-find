const yargs = require('yargs');
const sinon = require('sinon');
const { expect } = require('chai');
const Chance = require('chance');
const { log } = require('../../src/log');

const chance = new Chance();

describe('Logging interceptor', () => {
    afterEach(sinon.restore);

    it('should suppress logs if --silent is set', () => {
        sinon.stub(yargs, 'argv').value({
            silent: true
        });
        sinon.stub(console, 'log');

        log(chance.string());

        expect(console.log.callCount, 'should call console.log [0] time(s)').to.equal(0);
    });

    it('should not suppress logs if --silent is not set', () => {
        sinon.stub(yargs, 'argv').value({});
        sinon.stub(console, 'log');

        const message = chance.string();

        log(message);

        expect(console.log.callCount, 'should call console.log [1] time(s)').to.equal(1);
        expect(console.log.args[0]).to.deep.equal([message]);
    });
});
