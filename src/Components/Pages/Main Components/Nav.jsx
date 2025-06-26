import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Logo from "../../../assets/img/logo_libraff.png"
import "./Main CSS/nav.css"
import { useAllContext } from '../../../Context/MyContext'
import { GoHeart } from "react-icons/go";
import { IoBagHandleOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { useAuthContext } from '../../../Context/RegContext'

function Nav() {

    const { userState, setUserState } = useAuthContext()
    const { setSearchText, wishLits, openKat, sebet, kitabTap, searchText } = useAllContext()
    const [navHandle, setNavhandle] = useState(false)
    const navigate = useNavigate()
    const [authBox, setAuthBox] = useState(false)
    const modalRef = useRef()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user")) || null
        if (user) {
            setUserState(user)
        }
    }, [setUserState])
    function handleMenu() {
        setNavhandle(!navHandle)
    }
    function closeLinks() {
        setNavhandle(false)
    }
    function searchBook(e) {
        if (e.key === 'Enter') {
            navigate('/mainPage')
            kitabTap()
        }
    }
    function axtar() {
        navigate('/mainPage')
        kitabTap()
    }
    function authHandle(e) {
        e.stopPropagation()
        setAuthBox(!authBox)
    }

    useEffect(() => {
        function closeModal(e) {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setAuthBox(false)
            }
        }
        if (authBox) document.addEventListener('mousedown', closeModal)
        return () => {
            document.removeEventListener('mousedown', closeModal)
        }
    }, [authBox])

    function logOut() {
        setUserState(null)
        localStorage.removeItem("user")
        setAuthBox(false)
    }

    return (
        <div className='nav_bg'>
            <nav>
                <div className="nav_content">
                    <Link to='/' className='logo'><img src={Logo} alt="" /></Link>
                    <button className='katalog_btn' onClick={openKat}>Kataloq</button>
                    <div className={`links ${navHandle ? 'open' : ''}`}>
                        <div className='cart_fav'>
                            <Link className='wish_box' to="/wishlist" onClick={closeLinks}>Secilmisler
                                <GoHeart className='whislist' />
                                {wishLits.length > 0 && <span className='wish_count'>{wishLits.length}</span>}
                            </Link>
                            <Link to='/Sebet' onClick={closeLinks}>Sebet
                                <IoBagHandleOutline style={{ fontSize: "25px" }} />
                            </Link>
                        </div>
                        <Link to={'/muellifler'} onClick={closeLinks}>Muellifler</Link>
                        <Link to={'/endirimler'} onClick={closeLinks}>Endirimler</Link>
                        <Link to={'/kateqoriyalar'} onClick={closeLinks}>Kateqoriyalar</Link>
                    </div>
                    <div className="search_inp">
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={searchBook}
                            placeholder='Kitabinizi tapin...' />
                        <div className="search_icon">
                            <IoSearch onClick={axtar} style={{ fontSize: "18px", cursor: "pointer" }} />
                        </div>
                    </div>
                    <div className="auth_path" ref={modalRef}>
                        <button className='auth_btn' onClick={authHandle}>
                            <FaRegUserCircle style={{ color: "red", fontSize: "18px" }} />
                            <span>{userState ? userState.ad : 'Hesabim'}</span>
                        </button>
                        {authBox && <div className="auth_modal" >
                            {userState ?
                                <div className='login_box'>
                                    <h4>{userState.ad} {userState.soyad}</h4>
                                    <Link to={'/profile'} onClick={() => setAuthBox(false)}>Profile</Link>
                                    <button onClick={logOut}>LogOut</button>
                                </div>
                                :
                                <div className='auth_links'>
                                    <Link to={'/authentication/login'} onClick={() => setAuthBox(false)}>Daxil ol</Link>
                                    <Link to={'/authentication/signUp'} onClick={() => setAuthBox(false)}>Qeydiyyatdan kec</Link>
                                </div>
                            }
                        </div>}
                    </div>
                    <div className='right_links'>
                        <Link className='wish_box' to="/wishlist">
                            <GoHeart className='whislist' />
                            {wishLits.length > 0 && <span className='wish_count'>{wishLits.length}</span>}
                        </Link>
                        <Link to='/sebet' className='sebet_icon_box'>
                            <IoBagHandleOutline className='sebet' style={{ fontSize: "25px" }} />
                            {sebet.length > 0 && <span className='sebet_count'>{sebet.length}</span>}
                        </Link>
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
