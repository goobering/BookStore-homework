var assert = require('assert');
var BookStore = require('../bookStore.js');
var Book = require('../book.js');
var Customer = require('../customer.js');

describe('BookStore', function(){
    var bookStore;
    var testBook1, testBook2, testBook3;
    var testCustomer1;

    beforeEach(function(){
        bookStore = new BookStore('testName1', 'testCity1');
        testBook1 = new Book('testAuthor1', 'testTitle1', 'testGenre1', 10, 100);
        testBook2 = new Book('testAuthor2', 'testTitle2', 'testGenre2', 20, 200);
        testBook3 = new Book('testAuthor3', 'testTitle3', 'testGenre3', 30, 300);

        bookStore.addBook(testBook1);
        bookStore.addBook(testBook2);
        bookStore.addBook(testBook3);

        testCustomer1 = new Customer();
        testCustomer1.balance = 200;
    });

    it('has a name at creation', function(){
        assert.strictEqual(bookStore.name, 'testName1');
    });

    it('has a city at creation', function(){
        assert.strictEqual(bookStore.city, 'testCity1');
    });

    it('has an inventory', function(){
        assert.deepEqual(bookStore.inventory, [testBook1, testBook2, testBook3]);
    });

    it('has an balance at creation', function(){
        assert.deepEqual(bookStore.balance, 0);
    });

    it('can add a Book', function(){
        bookStore.addBook(testBook1);
        assert.deepEqual(bookStore.inventory, [testBook1, testBook2, testBook3, testBook1]);
    });

    it('can list its inventory', function(){
        assert.deepEqual(bookStore.listInventory(), JSON.stringify(bookStore.inventory));
    });

    it('can return a boolean indicating whether it stocks a book', function(){
        var unstockedBook = new Book('no author', 'no title', 'no genre', -1);
        assert.strictEqual(bookStore.canSell(testBook1), true);
        assert.strictEqual(bookStore.canSell(unstockedBook), false);
    })

    it('can return a boolean indicating whether it can afford a book', function(){
        assert.strictEqual(bookStore.canBuy(testBook1), false);
        bookStore.balance = 200;
        assert.strictEqual(bookStore.canBuy(testBook1), true);
    })

    it('can sell a book and adjust its balance', function(){
        var sold = bookStore.sell(testBook1, testCustomer1);
        assert.strictEqual(sold, true);
        assert.strictEqual(bookStore.balance, 10);
        assert.deepEqual(bookStore.inventory, [testBook2, testBook3]);
    });

    it('can report its balance and inventory value', function(){
        assert.strictEqual(bookStore.report(), 'balance: 0, inventory value: 60');
    });

    it('can produce a list of Books of a given genre', function(){
        assert.deepEqual(bookStore.getByGenre('testGenre1'), [testBook1]);
    });
});