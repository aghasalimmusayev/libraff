import React from 'react'
import HeaderSlider from './Pages/Main Components/HeaderSlider.jsx'
import Loader from "./Pages/Main Components/Loader.jsx"
import { useAllContext } from '../Context/MyContext.jsx'
import MainPage from "./Pages/Main Components/MainPage.jsx"
function Main() {

    const { bookData } = useAllContext()

    return (
        bookData?.length > 0 ? (
            <>
                <HeaderSlider />
                <MainPage />
            </>
        ) : (
            <div className='loader'>
                <Loader />
            </div>
        )
    )
}

export default Main
