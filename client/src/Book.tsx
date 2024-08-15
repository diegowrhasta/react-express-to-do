import React from 'react'
import axios from 'axios'
import { Navigate, useParams } from 'react-router-dom'

import './Book.css'
import FlashMessage from './FlashMessage'

function withRouter (Component) {
  return function (props) {
    const params = useParams()

    return <Component {...props} params={params}></Component>
  }
}

class Book extends React.Component {
  validation = {
    author: {
      rule: /^\S.{0,48}\S$/,
      message: 'Author field must have 2-50 characters'
    },
    title: {
      rule: /^\S.{0,68}\S$/,
      message: 'Title field must have 2-70 characters'
    },
    published: {
      rule: /^\d{4}$/,
      message: 'Published field must be a 4-digit year'
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      id: props.params.id,
      author: '',
      title: '',
      published: '',
      warningCount: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount (): void {
    if (!this.state.id) {
      return
    }

    axios
      .get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/${this.state.id}`)
      .then(result => {
        const { author, title, published } = result.data[0]
        this.setState({
          author: author,
          title: title,
          published: published.substr(0, 4)
        })
      })
      .catch(() => {
        this.warning('Unable to load book')
      })
  }

  handleChange (event) {
    const name = event.target.name
    const value = event.target.value

    this.setState({ [name]: value })
  }

  warning (message) {
    this.setState({ message: message, warningCount: ++this.state.warningCount })
  }

  validate () {
    for (const field in this.validation) {
      const { rule, message } = this.validation[field]
      const value = this.state[field]

      if (!value.match(rule)) {
        this.warning(message)
        return false
      }
    }

    return true
  }

  handleSubmit (event) {
    event.preventDefault()
    if (!this.validate()) {
      return
    }

    let { id, title, author, published } = this.state

    published += '-01-01'

    const book = { title: title, author: author, published: published }

    let updateFn = axios.post
    let url = import.meta.env.VITE_REACT_APP_SERVER_URL

    if (id) {
      updateFn = axios.put
      url += `/${id}`
    }

    updateFn(url, book)
      .then(() => {
        this.setState({ created: true })
      })
      .catch(() => this.warning('Unable to save book'))
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
            <FlashMessage
              key={this.state.warningCount}
              message={this.state.message}
              duration='3000'
            />
          </form>
        </div>
      </>
    )
  }
}

export default withRouter(Book)
