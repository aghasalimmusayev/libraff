import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './registration.css'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

function Login() {

    const [parolType, setParolType] = useState(true)
    function changeTypePassword() {
        setParolType(!parolType)
    }

    return (
        <div className='auth_box'>
            <div className="authentication">
                <h2 className='auth_head'>Daxil ol</h2>
                <input type="email" placeholder='Email' />
                <div className="password_inp">
                    <input type={`${parolType ? 'password' : 'text'}`} placeholder='Parol' />
                    {parolType
                        ? <IoMdEyeOff onClick={changeTypePassword} className='eye_icon' />
                        : <IoEye onClick={changeTypePassword} className='eye_icon' />}
                </div>
                <button className='reg_btn'>Daxil ol</button>
                <div className='go_to_signup'>
                    <span>Ve ya </span>
                    <Link to={'/authentication/signUp'}>Hesab yarat</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
