import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigate} from 'react-router-dom'

import Header from './Header'
import MainPage from './MainPage'

const App = () => {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={ <MainPage /> } />
          <Route path='*' element={ <Navigate to={"/"}/> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App