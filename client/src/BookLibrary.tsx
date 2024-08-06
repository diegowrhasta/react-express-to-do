import React from 'react'
import axios from 'axios'

class BookLibrary extends React.Component {
  componentDidMount (): void {
    axios(import.meta.env.VITE_REACT_APP_SERVER_URL)
      .then(console.log)
      .catch(console.log)
  }

  render () {
    return <div>Library</div>
  }
}

export default BookLibrary
