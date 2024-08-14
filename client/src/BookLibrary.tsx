import React from 'react'
import axios from 'axios'

import BookTable from './BookTable'

import './BookLibrary.css'

class BookLibrary extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      books: [],
      loading: false
    }

    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount (): void {
    this.refresh()
  }

  refresh () {
    this.setState({ loading: true })

    axios(import.meta.env.VITE_REACT_APP_SERVER_URL)
      .then(result => this.setState({ books: result.data, loading: false }))
      .catch(error => {
        this.setState({ loading: false })
        console.log(error)
      })
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
    const content = this.state.loading ? (
      <div className='loading'>Loading...</div>
    ) : (
      <BookTable books={this.state.books} handleDelete={this.handleDelete} />
    )

    return content
  }
}

export default BookLibrary
