import React from 'react'
import Nav from "../Components/Pages/Main Components/Nav"
import Footer from "../Components/Pages/Main Components/Footer"
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
