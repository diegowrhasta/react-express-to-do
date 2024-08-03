const express = require('express')

const router = express.Router()
const connectionPool = require('../database/connection-pool')
const BookRepository = require('../database/book-repository')

let repository = new BookRepository(connectionPool)

router.get('/:id', function (req, res) {
  console.log('ID', req.params.id)
  res.sendStatus(200)
})

router.put('/:id', function (req, res) {
  console.log('body', req.body)
  res.sendStatus(200)
})

router.delete('/:id', function (req, res) {
  console.log('ID', req.params.id)
  res.sendStatus(200)
})

// Save a book
router.post('/', function (req, res) {
  repository.save(req.body)

  res.sendStatus(200)
})

/* GET books listing . */
router.get('/', function (req, res) {
  res.send('books here!')
})

module.exports = router
