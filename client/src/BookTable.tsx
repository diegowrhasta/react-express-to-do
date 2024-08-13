import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import './BookTable.css'

function BookTable (props) {
  const books = props.books.map(book => {
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
              onClick={props.handleDelete.bind(null, book.id)}
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

export default BookTable
