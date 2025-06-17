import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./layout/Layout.jsx"
import Main from "./Components/Main.jsx"
import Admin from "./Components/Admin.jsx"
import Details from "./Components/Details.jsx"
import Muellifler from './Components/Muellifler.jsx';
import Endirimler from './Components/Endirimler.jsx';
import { MyContext } from '../Context/MyContext.jsx';
import MuellifKitablar from './Components/Child Components/MuellifKitablar.jsx';
import WishList from './Components/WishList.jsx';
import Sebet from './Components/Sebet.jsx'
import MainPage from './Components/MainPage.jsx'
import Error from './Components/Error.jsx';

function App() {

  return (
    <MyContext>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Layout />} >
            <Route index element={<Main />} />
            <Route path='/details/:id' element={<Details />} />
            <Route path='/muellifler' element={<Muellifler />} />
            <Route path='/endirimler' element={<Endirimler />} />
            <Route path='/muellifler/muellifKitablari/:muellif' element={<MuellifKitablar />} />
            <Route path='/wishlist' element={<WishList />} />
            <Route path='/sebet' element={<Sebet />} />
            <Route path='/mainPage' element={<MainPage />} />
            <Route path='/kateqoriyalar' element={<MainPage />} />
            <Route path='/kateqoriyalar/:kateqoriya' element={<MainPage />} />
          </Route>

          <Route path='*' element={<Error />} />
          <Route path='/admin' element={<Admin />} />

        </Routes>
      </BrowserRouter>
    </MyContext>
  )
}

export default App
