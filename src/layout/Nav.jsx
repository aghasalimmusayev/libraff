import React, { useState } from 'react'
import { Link } from "react-router-dom"
import Logo from "../assets/img/logo_libraff.png"
import "../CSS/nav.css"

function Nav() {

    return (
        <div className='nav_bg'>
            <nav>
                <div className="container">
                    <div className="nav_content">
                        <Link to='/' className='logo'><img src={Logo} alt="" /></Link>
                        <div className="links">
                            <Link to={'/muellifler'}>Muellifler</Link>
                            <Link to={'/endirimler'}>Endirimler</Link>
                        </div>
                        <div className="search_inp">
                            <input type="text"  placeholder='Kitabinizi tapin...'/>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav
