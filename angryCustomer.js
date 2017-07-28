var Customer = require('./customer.js');
var _ = require('lodash');

var AngryCustomer = function(){
    Customer.call(this);
}

AngryCustomer.prototype = Object.create(Customer.prototype);
AngryCustomer.prototype.constructor = AngryCustomer;

AngryCustomer.prototype.burn = function(book){
    if(book.isControversial){
        _.remove(this.inventory, book);
        return true;
    } else {
        return false;
    };
};

AngryCustomer.prototype.deface = function(book){
    if(book.isControversial){
        book.pageCount -= Math.floor(Math.random() * (book.pageCount - 2) + 1);
        return true;
    } else {
        return false;
    };
};

AngryCustomer.prototype.read = function(book){
    if(book.isControversial){
        return "This is controversial.";
    } else {
        return null;
    };
};

module.exports = AngryCustomer;