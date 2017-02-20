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

describe('Spy on existing method', function () {
    it('should check argument', sinon.test(function () {
        sinon.spy(Utils, 'sayHi');

        // first call
        Utils.sayHi('First');

        expect(Utils.sayHi.called).to.be.true;
        expect(Utils.sayHi.calledOnce).to.be.true;
        expect(Utils.sayHi.calledTwice).to.be.false;
        expect(Utils.sayHi.callCount).to.equal(1);

        // second call
        Utils.sayHi('Second');

        expect(Utils.sayHi.called).to.be.true;
        expect(Utils.sayHi.calledOnce).to.be.false;
        expect(Utils.sayHi.calledTwice).to.be.true;
        expect(Utils.sayHi.callCount).to.equal(2);

        expect(Utils.sayHi.getCall(0).args[0]).to.equal('First');
        expect(Utils.sayHi.getCall(1).args[0]).to.equal('Second');

        // Remove spy
        Utils.sayHi.restore();
    }));
});