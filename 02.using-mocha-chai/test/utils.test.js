var sinon = require('sinon');
var expect = require('chai').expect;

var Utils = require('../src/utils');

describe('No sinon - just how it works normally', function () {
    it('No sinon', function () {
        expect(Utils.sayHi('Sinon')).to.equal('hello, Sinon');
    });
});

describe('Replace existing method', function () {
    var newHi = function (say) {
        return say + ' from new method';
    };

    it('replaces method with newHi', sinon.test(function () {
        this.stub(Utils, 'sayHi', newHi);

        expect(Utils.sayHi('Sinon')).to.equal('Sinon from new method');
    }));
});

describe('Replace method returns', function () {
    // Stubbing
    it('change to return Mocha', sinon.test(function () {
        this.stub(Utils, 'sayHi').returns('Mocha');

        expect(Utils.sayHi('Sinon')).to.equal('Mocha');
    }));

    // Stubbing since behaviors are replaced
    it('change to return Chai', sinon.test(function () {
        this.stub(Utils, 'sayHi').returns('Chai');

        expect(Utils.sayHi()).to.equal('Chai');
    }));
});
