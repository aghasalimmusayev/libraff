import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./layout/Layout.jsx"
import Main from "./Components/Main.jsx"
import Admin from "./Components/Admin.jsx"
import Details from "./Components/Details.jsx"

function App() {

  return (

    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Layout />} >
          <Route index element={<Main />} />
          <Route path='/details/:id' element={<Details />} />
        </Route>

        <Route path='/admin' element={<Admin />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
