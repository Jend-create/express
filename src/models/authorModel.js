const mongoose = require ('mongoose');

const authorModel = new mongoose.Model({
    nameOfAuthor: {type: String, minlength: 5, maxlength: 16},
    titleOfBook: {type: String},
    numberOfPages: {type: Number },
    bookISBN: {type: String, minlength:8, maxlength: 30},
    bookLikes: {type: Number}
})

const Author = mongoose.model('author', authorschema)

module.exports = Author