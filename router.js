const express = require('express')
const router = express.Router();
const books = require('./listController')


router.get('/books',books.index)
router.get('/books/searchtitle/:title', books.searchTitle)
router.get('/books/searchauthor/:author', books.searchAuthor)
router.get('/books/:id', books.show)
router.post('/books/create', books.create)
router.post('/books/markAsRead/:id', books.markAsRead)
router.delete('/books/:id', books.delete)
router.put('/books/:id', books.update)



module.exports = router;