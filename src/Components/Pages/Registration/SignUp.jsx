import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './registration.css'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

function SignUp() {

    const [parolType, setParolType] = useState(true)
    const [tekrarParolType, setTekrarParolType] = useState(true)
    function changeTypePassword() {
        setParolType(!parolType)
    }
    function changeTypePasswordAgain() {
        setTekrarParolType(!tekrarParolType)
    }

    return (
        <div className='reg_box'>
            <div className="registration">
                <h2 className='auth_head'>Qeydiyyat</h2>
                <input type="text" placeholder='Ad' />
                <input type="text" placeholder='Soyad' />
                <input type="number" placeholder='Telefon' />
                <input type="email" placeholder='Email' />
                <div className="password_inp">
                    <input type={`${parolType ? 'password' : 'text'}`} placeholder='Parol' />
                    {parolType
                        ? <IoMdEyeOff onClick={changeTypePassword} className='eye_icon' />
                        : <IoEye onClick={changeTypePassword} className='eye_icon' />}
                </div>
                <div className="password_inp">
                    <input type={`${tekrarParolType ? 'password' : 'text'}`} placeholder='Tekrar parol' />
                    {tekrarParolType
                        ? <IoMdEyeOff onClick={changeTypePasswordAgain} className='eye_icon' />
                        : <IoEye onClick={changeTypePasswordAgain} className='eye_icon' />}


                </div>
                <button className='reg_btn'>Qeydiyyatdan kec</button>
                <div className='go_to_login'>
                    <span>Hesabiniz artiq var?</span>
                    <Link to={'/login'}>Daxil olun</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp
