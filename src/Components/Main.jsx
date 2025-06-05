import React from 'react'
import Kitablar from "./Kitablar"
import HeaderSlider from './HeaderSlider'
import Katalog from "./Katalog.jsx"

function Main() {
    return (
        <div>
            <HeaderSlider />
            <Kitablar />
            <Katalog/>
        </div>
    )
}

export default Main
