import React from 'react'
import axios from 'axios'

import BookTable from './BookTable'

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
    return (
      <>
        <BookTable books={this.state.books} handleDelete={this.handleDelete} />
      </>
    )
  }
}

export default BookLibrary
