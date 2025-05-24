import { useState } from 'react'
import './App.css'
import Libraf from "./Components/Libraff.jsx"

function App() {

  const [kat, setKat] = useState(false)

  function toggleKatalog() {
    setKat(!kat)
  }

  return (
    <>
      <button onClick={toggleKatalog}>Katalog</button>
      {kat && <Libraf />}
    </>
  )
}

export default App
