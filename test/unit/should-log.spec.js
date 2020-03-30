const yargs = require('yargs');
const sinon = require('sinon');
const { expect } = require('chai');
const { shouldLog } = require('../../src/should-log');

describe('Determine whether or not to log', () => {
    afterEach(sinon.restore);

    it('should return false when --silent is set', () => {
        sinon.stub(yargs, 'argv').value({
            silent: true
        });

        const result = shouldLog();

        expect(result).to.equal(false);
    });

    it('should return true when --silent is not set', () => {
        sinon.stub(yargs, 'argv').value({});

        const result = shouldLog();

        expect(result).to.equal(true);
    });
});
