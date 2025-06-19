import React from 'react'
import Nav from "./Nav"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
import { useAllContext } from '../Context/MyContext'
import Katalog from '../Components/Pages/Main Components/Katalog'

function Layout() {

    const { katalog } = useAllContext()

    return (
        <div>
            <Nav />
            {katalog && <Katalog />}
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout
