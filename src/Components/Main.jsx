import React from 'react'
import Kitablar from "./Kitablar"
import HeaderSlider from './HeaderSlider'
// import Katalog from "./Katalog.jsx"
import Loader from "./Loader.jsx"
import { useAllContext } from '../../Context/MyContext.jsx'
import NewKatalog from './NewKatalog.jsx'

function Main() {

    const { bookData, katalog } = useAllContext()

    return (
        bookData.length > 0 ? (
            <>
                {katalog && <NewKatalog />}
                <HeaderSlider />
                <Kitablar />
                {/* <Katalog /> */}
            </>
        ) : (
            <div className='loader'>
                <Loader />
            </div>
        )
    )
}

export default Main
