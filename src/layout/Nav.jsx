import React, { useState } from 'react'
import { Link } from "react-router-dom"
import Logo from "../assets/img/logo_libraff.png"
import "../CSS/nav.css"
import { useAllContext } from '../../Context/MyContext'
import { GoHeart } from "react-icons/go";
import { IoBagHandleOutline } from "react-icons/io5";

function Nav() {

    const { setSearchText, wishLits } = useAllContext()
    const [navHandle, setNavhandle] = useState(false)

    function handleMenu() {
        setNavhandle(!navHandle)
    }

    return (
        <div className='nav_bg'>
            <nav>
                <div className="nav_content">
                    <Link to='/' className='logo'><img src={Logo} alt="" /></Link>
                    <div className={`links ${navHandle ? 'open' : ''}`}>
                        <Link to={'/muellifler'}>Muellifler</Link>
                        <Link to={'/endirimler'}>Endirimler</Link>
                    </div>
                    <div className="search_inp">
                        <input type="text" onChange={(e) => setSearchText(e.target.value)} placeholder='Kitabinizi tapin...' />
                    </div>
                    <div className='right_links'>
                        <Link className='wish_box' to="/wishlist">
                            <GoHeart className='whislist' />
                            {wishLits.length > 0 && <span className='wish_count'>{wishLits.length}</span>}
                        </Link>
                        <IoBagHandleOutline style={{ fontSize: "25px" }} />
                    </div>
                    <div className={`menu_toggle ${navHandle ? "click" : ""}`} onClick={handleMenu}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav
