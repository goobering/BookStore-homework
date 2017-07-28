var assert = require('assert');
var Book = require('../book.js');

describe('Book', function(){
    var book;

    beforeEach(function(){
        book = new Book('testAuthor1', 'testTitle1', 'testGenre1', 10, 100);
    });

    it('has an Author at creation', function(){
        assert.strictEqual(book.author, 'testAuthor1');
    })

    it('has an Title at creation', function(){
        assert.strictEqual(book.title, 'testTitle1');
    })

    it('has an Genre at creation', function(){
        assert.strictEqual(book.genre, 'testGenre1');
    })

    it('has a Price at creation', function(){
        assert.strictEqual(book.price, 10);
    })

    it('can print out its properties as a string', function(){
        assert.strictEqual(book.stringify(), JSON.stringify(book));
    })
});