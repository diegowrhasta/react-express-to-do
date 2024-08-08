import React from 'react'
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import './BookLibrary.css'

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
    const books = this.state.books.map(book => {
      const date = book.published.toString().substr(0, 4)
      
      return (
        <tr key={book.id}>
          <td>{book.author}</td>
          <td>{book.title}</td>
          <td>{date}</td>
          <td>
            <EditIcon />
          </td>
          <td>
            <DeleteForeverIcon />
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
