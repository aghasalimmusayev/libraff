import React from 'react'
import Kitablar from "./Kitablar"
import HeaderSlider from './HeaderSlider'
import Katalog from "./Katalog.jsx"
import Loader from "./Loader.jsx"
// import NewKatalog from './NewKatalog.jsx'
import { useAllContext } from '../../Context/MyContext.jsx'

function Main() {

    const { bookData } = useAllContext()

    return (
        bookData ? (
            <>
                {/* <NewKatalog /> */}
                <HeaderSlider />
                <Kitablar />
                <Katalog />
            </>
        ) : (
            <div style={{ textAlign: "center", margin: "50px 0" }}>
                <Loader />
            </div>
        )
    )
}

export default Main
