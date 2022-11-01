import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './Header'
import MainPage from './MainPage'

const App = () => {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={ <MainPage /> } />
          <Route exact path='/about/' element={ <MainPage /> } />
          <Route exact path='/login/' element={ <MainPage /> } />
          <Route path='*' element={ <MainPage /> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App