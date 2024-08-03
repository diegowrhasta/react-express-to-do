class BookRepository {
  constructor (connectionPool) {
    this.connectionPool = connectionPool
  }

  save (book, callback) {
    this.connectionPool
      .getPool()
      .query('INSERT INTO books set ?', book, callback)
  }

  get (id) {}

  getAll () {}

  update (id, book) {}

  delete (id) {}
}

module.exports = BookRepository
