import './App.css'
import BookLibrary from './BookLibrary'
import Book from './Book'
import Header from './Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App () {
  return (
    <>
      <Router>
        <div className='app'>
          <Header />
          <Routes>
            <Route path='/' element={<BookLibrary />} />
            <Route path='/create' element={<Book />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
