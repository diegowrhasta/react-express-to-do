const express = require('express')

const router = express.Router()
const connectionPool = require('../database/connection-pool')

/* GET books listing . */
router.get('/', function (req, res, next) {
  const conn = connectionPool.getPool()

  const book = {
    author: 'Charles Dickens',
    title: 'Great Expectations',
    published: '1861-01-01'
  }

  conn.query('INSERT INTO books set ?', book, (err, result) => {
    if (err) {
      throw err
    }

    console.log(result)
  })

  res.send('books here!')
})

module.exports = router
