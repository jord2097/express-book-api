const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    name: String,
    author: String,
    genre: String,
    bookRead: Boolean,
    isbn: String,
    blurb: String
    
})

module.exports.Book = mongoose.model('books', bookSchema, 'books' )