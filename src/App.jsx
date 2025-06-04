import { useState } from 'react'
import './App.css'
import Libraf from "./Components/Libraff.jsx"
import Kitablar from './Components/Kitablar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./layout/Layout.jsx"
import Main from "./Components/Main.jsx"
import Admin from "./Components/Admin.jsx"
function App() {


  return (

    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Layout />} >
          <Route index element={<Main />} />
          <Route path='Katalog' element={<Libraf />} />
        </Route>

        <Route path='/admin' element={<Admin />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
