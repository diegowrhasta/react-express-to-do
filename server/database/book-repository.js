class BookRepository {
  constructor (connectionPool) {
    this.connectionPool = connectionPool
  }

  save (book) {
    this.connectionPool.getPool().query(
      'INSERT INTO books set ?',
      book,
      (err, result) => {
        if (err) {
          throw err
        }
      }
    )
  }

  get (id) {}

  getAll () {}

  update (id, book) {}

  delete (id) {}
}

module.exports = BookRepository
