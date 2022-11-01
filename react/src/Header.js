import React from 'react'
import logo from './media/icon-2.png'

const Header = () => {
  return (
    <div className='container'>
      <div className='row header'>
        <div className='row'>
          <img src={ logo } alt='Up-down arrow icon' width='85px' />
          <h1 className='title'>TECHEX</h1>
        </div>
      </div>
    </div>
  )
}

export default Header