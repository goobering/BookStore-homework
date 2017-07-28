var assert = require('assert');
var AngryCustomer = require('../angryCustomer.js');
var Book = require('../book.js');

describe('Customer', function(){
    var angryCustomer;
    var testBook1, testBook2, testBook3;

    beforeEach(function(){
        testBook1 = new Book('testAuthor1', 'testTitle1', 'testGenre1', 10, 100);
        testBook2 = new Book('testAuthor2', 'testTitle2', 'testGenre2', 20, 200);
        testBook3 = new Book('testAuthor3', 'testTitle3', 'testGenre3', 30, 300);

        angryCustomer = new AngryCustomer();
        angryCustomer.inventory.push(testBook1);
        angryCustomer.inventory.push(testBook2);
        angryCustomer.inventory.push(testBook3);
    });

    it('can burn controversial books', function(){
        testBook1.isControversial = true;
        var burnt = angryCustomer.burn(testBook1);
        assert.strictEqual(burnt, true);
        assert.deepEqual(angryCustomer.inventory, [testBook2, testBook3]);
    });

    it('can deface a controversial book', function(){
        testBook1.isControversial = true;
        var originalPageCount = testBook1.pageCount;
        var defaced = angryCustomer.deface(testBook1);

        assert.strictEqual(defaced, true);
        assert.strictEqual(testBook1.pageCount < originalPageCount, true);
    });

    it('returns a suitable string when reading a controversial book', function(){
        testBook1.isControversial = true;
        assert.strictEqual(angryCustomer.read(testBook1), 'This is controversial.');
    });

    it('returns null when reading a non-controversial book', function(){
        assert.strictEqual(angryCustomer.read(testBook1), null);
    })

});