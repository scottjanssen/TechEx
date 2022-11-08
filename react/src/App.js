import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigate} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import MainPage from './MainPage'

const App = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={ <MainPage /> } />
          <Route path='*' element={ <Navigate to={"/"}/> } />
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </>
  )
}

export default App