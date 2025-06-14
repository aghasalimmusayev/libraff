import React from 'react'
import HeaderSlider from './HeaderSlider'
import Loader from "./Loader.jsx"
import { useAllContext } from '../../Context/MyContext.jsx'
import Category from "./Category.jsx"
function Main() {

    const { bookData } = useAllContext()

    return (
        bookData.length > 0 ? (
            <>
                <HeaderSlider />
                <Category />
            </>
        ) : (
            <div className='loader'>
                <Loader />
            </div>
        )
    )
}

export default Main
