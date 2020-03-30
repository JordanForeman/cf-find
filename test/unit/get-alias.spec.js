const yargs = require('yargs');
const sinon = require('sinon');
const { expect } = require('chai');
const { getAlias } = require('../../src/get-alias');

describe('Get the provided alias from yargs', () => {
    afterEach(sinon.restore);

    it('should return the provided alias', () => {
        const alias = Symbol('expected alias');

        sinon.stub(yargs, 'argv').value({
            _: [alias]
        });

        const result = getAlias();

        expect(result).to.equal(alias);
    });
});
