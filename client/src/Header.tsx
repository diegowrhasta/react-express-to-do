import React from 'react'
import './Header.css'

function Header () {
  return (
    <div className='header'>
      <ul>
        <li>
          <a className='logo' href='/'>
            Book Library
          </a>
        </li>
      </ul>

      <ul className='navbar'>
        <li>
          <a href='/'>Create</a>
        </li>
        <li>
          <a href='/'>View</a>
        </li>
      </ul>
    </div>
  )
}

export default Header
