const express = require('express')
const mysql = require('mysql2')

const router = express.Router()

const db = require('../config/db')

/* GET books listing . */
router.get('/', function (req, res, next) {
  const conn = mysql.createConnection(db)

  conn.connect(err => {
    if (err) {
      throw err
    }

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
  })

  res.send('books here!')
})

module.exports = router
