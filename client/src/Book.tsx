import React from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

import './Book.css'

class Book extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      author: '',
      title: '',
      published: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    const name = event.target.name
    const value = event.target.value

    this.setState({ [name]: value })
  }

  handleSubmit (event) {
    let { published } = this.state

    published += '-01-01'

    const book = { ...this.state, published }

    axios
      .post(import.meta.env.VITE_REACT_APP_SERVER_URL, book)
      .then(() => {
        this.setState({ created: true })
      })
      .catch(console.log)

    event.preventDefault()
  }

  render () {
    if (this.state.created) {
      return <Navigate to='/' />
    }

    return (
      <>
        <div className='container'>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='author'>Author:</label>
            <input
              value={this.state.author}
              onChange={this.handleChange}
              type='text'
              name='author'
              id='author'
            />
            <label htmlFor='title'>Title:</label>
            <input
              value={this.state.title}
              onChange={this.handleChange}
              type='text'
              name='title'
              id='title'
            />
            <label htmlFor='published'>Published:</label>
            <input
              value={this.state.published}
              onChange={this.handleChange}
              type='text'
              name='published'
              id='published'
            />
            <input type='submit' value='Save' />
          </form>
        </div>
      </>
    )
  }
}

export default Book
