import React from 'react'
import Kitablar from "./Kitablar"
import HeaderSlider from './HeaderSlider'
import Loader from "./Loader.jsx"
import { useAllContext } from '../../Context/MyContext.jsx'

function Main() {

    const { bookData } = useAllContext()

    return (
        bookData.length > 0 ? (
            <>
                <HeaderSlider />
                <Kitablar />
            </>
        ) : (
            <div className='loader'>
                <Loader />
            </div>
        )
    )
}

export default Main
