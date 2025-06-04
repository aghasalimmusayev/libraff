import React from 'react'
import Nav from "./Nav"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
function Layout() {
    return (
        <div>
            <Nav />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout
