var Book = function(author, title, genre, price, pageCount){
    this.author = author;
    this.title = title;
    this.genre = genre;
    this.price = price;
    this.pageCount = pageCount;
    this.isControversial = false;
};

Book.prototype = {
    stringify: function(){
        return JSON.stringify(this);
    }
};

module.exports = Book;