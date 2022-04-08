const createError = require('http-errors')
const { ObjectId } = require('mongodb')
const { Book } = require('./models/books')

exports.index = async function (req, res){
    Book.find()
    .then ((books) => res.send(books))
}

exports.show = function(req, res, next){
    Book.findOne({_id: ObjectId(req.params.id)})
    .then((bookitem) => {
        if(!bookitem){
            return (next(createError("No book with that id")));            
        }
        res.send(bookitem);
    })
}

exports.update = function(req, res, next){
    /* if(!req.body.title){
        return(next(createError(400, "title is required")));
    } */

    Book.findOne({_id: ObjectId(req.params.id)})
    .then( (book) => {
        if(!book) {
            return (next(createError(404,"no such id")))
        }
        if(req.body.title) {book.title = req.body.title}
        if(req.body.author) {book.author = req.body.author}
        if(req.body.genre) {book.genre = req.body.genre}
        if(req.body.bookRead) {book.bookRead = req.body.bookRead}
        if(req.body.isbn) {book.isbn = req.body.isbn}
        if(req.body.blurb) {book.blurb = req.body.blurb}

        book.save() 
            .then( () => res.send ({result: true}))
    })
} // supports partial update without deleting fields

exports.delete = function(req, res, next){
    Book.deleteOne({_id: ObjectId(req.params.id)})
    .then( (result) => {
        if (result.deletedCount){
            res.send({result:true})            
        } else {
            return (next(createError(404,"no book with that id")))
        }
    })
}

exports.create = function(req, res, next){
    if(!req.body.title){
        return (next(createError(400, "title is required")))        
    }

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        bookRead: req.body.bookRead,
        isbn: req.body.isbn,
        blurb: req.body.blurb
    })

    book.save()
        .then( () => res.send({result: true}))
}

exports.searchTitle = function(req, res, next){
    console.log(req.params.title)
    Book.findOne({title: req.params.title})     
    .then((bookitem) => {
        if(!bookitem){
            return (next(createError("No book with that title"))); 
        }
        res.send(bookitem)
    })
}

exports.searchAuthor = function(req,res,next){
    Book.find({author: req.params.author})
    .then((bookitem) => {
        if(!bookitem){
            return (next(createError("No book with that author")))
        }
        res.send(bookitem)
    })
} // finds all books from a given author

exports.markAsRead = function(req, res, next){
    Book.findOne({_id: ObjectId(req.params.id)})
    .then((book) => {
        if(!book){
            return (next(createError("No book with that id"))); 
        }

        book.bookRead = true

        book.save()
            .then( () => res.send ({result: true}))
    })
} // quickly set bookRead as true

