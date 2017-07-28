var _ = require('lodash');

var BookStore = function(name, city){
    this.name = name;
    this.city = city;
    this.balance = 0;
    this.inventory = [];
}

BookStore.prototype = {
    addBook: function(book){
        this.inventory.push(book);
    },
    listInventory: function(){
        return JSON.stringify(this.inventory);
    },
    canSell: function(book){
        return _.includes(this.inventory, book);
    },
    canBuy: function(book){
        return this.balance >= book.price;
    },
    sell: function(book, customer){
        if(this.canSell(book) && customer.canBuy(book)){
            _.remove(this.inventory, book);
            this.balance += book.price;
            return true;
        } else {
            return false;
        };
    },
    buy: function(book, customer){
        if(this.canBuy(book) && customer.canSell(book)){
            this.inventory.push(book);
            this.balance -= book.price;
            return true;
        } else {
            return false;
        };
    },
    report: function(){
        return "balance: " + this.balance + ", inventory value: " + _.sumBy(this.inventory, 'price');
    },
    getByGenre: function(genre){
        return _.filter(this.inventory, {genre: genre});
    }
}

module.exports = BookStore;