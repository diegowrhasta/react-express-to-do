const express = require('express')

const router = express.Router()
const connectionPool = require('../database/connection-pool')
const BookRepository = require('../database/book-repository')

let repository = new BookRepository(connectionPool)

router.get('/:id', function (req, res) {
  const id = req.params.id

  repository.get(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.toString() })
      return
    }

    res.status(200).json(result)
  })
})

router.put('/:id', function (req, res) {
  const id = req.params.id

  repository.update(id, req.body, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.toString() })
      return
    }

    res.sendStatus(200)
  })
})

router.delete('/:id', function (req, res) {
  const id = req.params.id

  repository.delete(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.toString() })
      return
    }

    res.sendStatus(200)
  })
})

// Save a book
router.post('/', function (req, res) {
  repository.save(req.body, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.toString() })
      return
    }

    res.sendStatus(200)
  })
})

/* GET books listing . */
router.get('/', function (req, res) {
  repository.getAll((err, result) => {
    if (err) {
      res.status(500).json({ error: err.toString() })
      return
    }

    res.status(200).json(result)
  })
})

module.exports = router
