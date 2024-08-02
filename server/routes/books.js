const express = require('express')

const router = express.Router()
const connectionPool = require('../database/connection-pool')

router.post('/', function (req, res) {
  const conn = connectionPool.getPool()

  conn.query('INSERT INTO books set ?', req.body, (err, result) => {
    if (err) {
      throw err
    }

    console.log(result)
  })
})

/* GET books listing . */
router.get('/', function (req, res) {
  res.send('books here!')
})

module.exports = router
