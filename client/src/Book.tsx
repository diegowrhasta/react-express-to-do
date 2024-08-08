import './Book.css'

function Book () {
  return (
    <>
      <div className='container'>
        <form>
          <label htmlFor='author'>Author:</label>
          <input type='text' name='author' id='author' />
          <label htmlFor='title'>Title:</label>
          <input type='text' name='title' id='title' />
          <label htmlFor='published'>Published:</label>
          <input type='text' name='published' id='published' />
          <input type='submit' value='Save' />
        </form>
      </div>
    </>
  )
}

export default Book
