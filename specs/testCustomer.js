var assert = require('assert');
var Customer = require('../customer.js');
var BookStore = require('../bookStore.js');
var Book = require('../book.js');

describe('Customer', function(){
    var customer, testCustomer1;
    var testBook1, testBook2, testBook3;
    var testBookStore1;

    beforeEach(function(){
        testBook1 = new Book('testAuthor1', 'testTitle1', 'testGenre1', 10, 100);
        testBook2 = new Book('testAuthor2', 'testTitle2', 'testGenre2', 20, 200);
        testBook3 = new Book('testAuthor3', 'testTitle3', 'testGenre3', 30, 300);

        customer = new Customer();
        customer.balance = 200;
        customer.inventory.push(testBook1);
        customer.inventory.push(testBook2);
        customer.inventory.push(testBook3);

        testCustomer1 = new Customer();
        testCustomer1.balance = 100;
        testCustomer1.inventory.push(testBook1);
        testCustomer1.inventory.push(testBook1);
        testCustomer1.inventory.push(testBook1);

        testBookStore1 = new BookStore('testName1', 'testCity1');

        testBookStore1.addBook(testBook1);
        testBookStore1.addBook(testBook2);
        testBookStore1.addBook(testBook3);
    });

    it('has an inventory', function(){
        assert.deepEqual(customer.inventory, [testBook1, testBook2, testBook3]);
    });

    it('has a balance', function(){
        assert.strictEqual(customer.balance, 200);
    });

    it('can buy a Book', function(){
        customer.buy(testBookStore1, testBook1);
        
        assert.deepEqual(customer.inventory, [testBook1, testBook2, testBook3, testBook1]);
        assert.strictEqual(customer.balance, 190);
    });

    it('can sell a book', function(){
        testBookStore1.balance = 200;

        var sold = customer.sell(testBookStore1, testBook1);

        assert.strictEqual(sold, true);
        assert.strictEqual(customer.balance, 210);
        assert.deepEqual(customer.inventory, [testBook2, testBook3]);
    });

    it('can return the total value of their collection', function(){
        assert.strictEqual(customer.getInventoryValue(), 60);
    });

    it('can view the total value of all books of a given Genre', function(){
        assert.strictEqual(customer.getValueOfGenre('testGenre1'), 10);
    });

    it('can view their longest book', function(){
        assert.strictEqual(customer.getValueOfLongestBook(), 30);
    });

    it('can sort their books by value (ascending)', function(){
        customer.sortInventoryByValue(true);
        assert.deepEqual(customer.inventory, [testBook1, testBook2, testBook3]);
    });

    it('can sort their books by value (descending)', function(){
        customer.sortInventoryByValue(false);
        assert.deepEqual(customer.inventory, [testBook3, testBook2, testBook1]);
    });

    it('should be able to compare the value of their collection with another BookWorm', function(){
        assert.strictEqual(customer.compareWith(testCustomer1), 30);
    })
});