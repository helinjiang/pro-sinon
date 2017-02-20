var sinon = require('sinon');
var expect = require('chai').expect;

var Utils = require('../src/utils');

describe('No sinon - just how it works normally', function () {
    it('Print: hello, Sinon', function () {
        expect(Utils.sayHi('Sinon')).to.equal('hello, Sinon');
    });
});

describe('Replace existing method', function () {
    describe('by stub', function () {
        var newHi = function (say) {
            return say + ' from new method';
        };

        it('replaces method with newHi', sinon.test(function () {
            this.stub(Utils, 'sayHi', newHi);
            expect(Utils.sayHi('Sinon')).to.equal('Sinon from new method');
        }));
    });
});