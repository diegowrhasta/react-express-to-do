import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import './BookLibrary.css'

class BookLibrary extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      books: []
    }

    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount (): void {
    this.refresh()
  }

  refresh () {
    axios(import.meta.env.VITE_REACT_APP_SERVER_URL)
      .then(result => this.setState({ books: result.data }))
      .catch(console.log)
  }

  handleDelete (id) {
    if (!window.confirm('Do you want to delete this book?')) {
      return
    }

    axios
      .delete(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/${id}`)
      .then(() => this.refresh())
      .catch(console.log)
  }

  render () {
    const books = this.state.books.map(book => {
      const date = book.published.toString().substr(0, 4)

      return (
        <tr key={book.id}>
          <td>{book.author}</td>
          <td>{book.title}</td>
          <td>{date}</td>
          <td>
            <Link to={`/edit/${book.id}`}>
              <EditIcon />
            </Link>
          </td>
          <td>
            <Link to={'/'}>
              <DeleteForeverIcon
                onClick={this.handleDelete.bind(this, book.id)}
              />
            </Link>
          </td>
        </tr>
      )
    })

    return (
      <div className='table-container'>
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
