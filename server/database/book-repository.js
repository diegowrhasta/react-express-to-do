class BookRepository {
  constructor (connectionPool) {
    this.connectionPool = connectionPool
  }

  get pool () {
    return this.connectionPool.getPool()
  }

  save (book, callback) {
    this.pool.query('INSERT INTO books set ?', book, callback)
  }

  get (id, callback) {
    this.pool.query('SELECT * from books where id = ?', id, callback)
  }

  getAll (callback) {
    this.pool.query('SELECT * from books', callback)
  }

  update (id, book, callback) {
    this.pool.query('UPDATE books set ? where id = ?', [book, id], callback)
  }

  delete (id, callback) {
    this.pool.query('DELETE FROM books where id = ?', id, callback)
  }
}

module.exports = BookRepository
