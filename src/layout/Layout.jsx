import React from 'react'
import Nav from "./Nav"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
import { useAllContext } from '../../Context/MyContext'
import NewKatalog from '../Components/NewKatalog'

function Layout() {

    const { katalog } = useAllContext()

    return (
        <div>
            <Nav />
            {katalog && <NewKatalog />}
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout
