import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./layout/Layout.jsx"
import RegLayout from "./layout/RegLayout.jsx"
import Main from "./Components/Main.jsx"
import Admin from "./Components/Pages/Admin/Admin.jsx"
import Details from "./Components/Pages/Links/Details.jsx"
import Muellifler from './Components/Pages/Links/Muellifler.jsx';
import Endirimler from './Components/Pages/Links/Endirimler.jsx';
import { MyContext } from './Context/MyContext.jsx';
import MuellifKitablar from './Components/Child Components/MuellifKitablar.jsx';
import WishList from './Components/Pages/Links/WishList.jsx';
import Sebet from './Components/Pages/Links/Sebet.jsx'
import MainPage from './Components/Pages/Main Components/MainPage.jsx'
import Error from './Components/Error.jsx';
import Scroll from './Components/Scroll.jsx'
import Checkout from './Components/Pages/Links/Checkout.jsx';
import Login from './Components/Pages/Registration/Login.jsx';
import SignUp from './Components/Pages/Registration/SignUp.jsx';

function App() {

  return (
    <MyContext>
      <BrowserRouter>
        <Scroll />
        <Routes>

          <Route path='/' element={<Layout />} >
            <Route index element={<Main />} />
            <Route path='details/:id' element={<Details />} />
            <Route path='muellifler' element={<Muellifler />} />
            <Route path='endirimler' element={<Endirimler />} />
            <Route path='muellifler/muellifKitablari/:muellif' element={<MuellifKitablar />} />
            <Route path='wishlist' element={<WishList />} />
            <Route path='sebet' element={<Sebet />} />
            <Route path='mainPage' element={<MainPage />} />
            <Route path='kateqoriyalar' element={<MainPage />} />
            <Route path='kateqoriyalar/:kateqoriya' element={<MainPage />} />
            <Route path='Checkout' element={<Checkout />} />
          </Route>

          <Route path='/authentication' element={<RegLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='signUp' element={<SignUp />} />
          </Route>

          <Route path='*' element={<Error />} />
          <Route path='/admin' element={<Admin />} />

        </Routes>
      </BrowserRouter>
    </MyContext>
  )
}

export default App
