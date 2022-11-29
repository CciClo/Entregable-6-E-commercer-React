import { useState } from 'react'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Purchases from './pages/Purchases'
import ProductId from './pages/ProductId'
import NavBar from './components/NavBar'
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  const isLoading = useSelector(state => state.isLoading);

  return (
    <HashRouter>
      <NavBar/>
      {isLoading &&
        <LoadingScreen/>
      }
      <Routes>
        <Route path='/' element={ <Home />} />
        <Route path='/login' element={ <Login /> } />
        <Route element={<ProtectedRoutes />} >
          <Route path='/purchases' element={ <Purchases />} />
          <Route path='/product/:id' element={ <ProductId /> } />          
        </Route>
      </Routes>
      <footer>
        <h4>Developers</h4>
        <h6>Oscar Tandioy & Jesus Escalona</h6>
        <a href="">
          <i  class="bi bi-github"></i>
        </a>
      </footer>
    </HashRouter>
  )
}

export default App