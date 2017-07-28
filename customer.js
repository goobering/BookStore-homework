var _ = require('lodash');

var Customer = function(){
    this.balance = 0;
    this.inventory = [];
};

Customer.prototype = {
    canBuy: function(book){
        return this.balance >= book.price;
    },
    canSell: function(book){
        return _.includes(this.inventory, book);
    },
    buy: function(bookStore, book){
        if(bookStore.canSell(book) && this.canBuy(book)){
            bookStore.sell(book, this);
            this.inventory.push(book);
            this.balance -= book.price;
            return true;
        } else {
            return false;
        };
    },
    sell: function(bookStore, book){
        if(bookStore.canBuy(book) && this.canSell(book)){
            bookStore.buy(book, this);
            _.remove(this.inventory, book);
            this.balance += book.price;
            return true;
        } else {
            return false;
        };
    },
    getInventoryValue: function(){
        return _.sumBy(this.inventory, 'price');
    },
    getValueOfGenre: function(genre){
        return _.sumBy(_.filter(this.inventory, {genre: genre}), 'price');
    },
    getValueOfLongestBook: function(){
        return _.maxBy(this.inventory, 'pageCount').price;
    },
    sortInventoryByValue: function(isAscending){
        if(isAscending){
            this.inventory = _.sortBy(this.inventory, 'price');
        } else {
            this.inventory = _.sortBy(this.inventory, 'price').reverse();
        }
    },
    compareWith: function(customer){
        return this.getInventoryValue() - customer.getInventoryValue();
    }
};

module.exports = Customer;