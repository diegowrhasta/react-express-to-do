import React from 'react'
import axios from 'axios'

class BookLibrary extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      books: []
    }
  }

  componentDidMount (): void {
    axios(import.meta.env.VITE_REACT_APP_SERVER_URL)
      .then(result => this.setState({ books: result.data }))
      .catch(console.log)
  }

  render () {
    const books = this.state.books.map((book) => (
      <tr key={book.id}>
        <td>{book.author}</td>
        <td>{book.title}</td>
        <td>{book.published}</td>
      </tr>
    ))

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Author</th>
              <th>Title</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>{books}</tbody>
        </table>
      </div>
    )
  }
}

export default BookLibrary
