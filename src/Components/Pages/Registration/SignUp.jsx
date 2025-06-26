import React, { useState } from 'react'
import './registration.css'
import { Link, useNavigate } from 'react-router-dom'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { nanoid } from 'nanoid';
import CrudNotify, { showRegSuccess, showRegFailed } from '../../Child Components/CrudNotify';
import { registerUser } from '../../../service/RegService'; useNavigate

function SignUp() {

    const navigaetToLogin = useNavigate()
    const [parolType, setParolType] = useState(true)
    const [tekrarParolType, setTekrarParolType] = useState(true)
    const [tekrarParol, setTekrarParol] = useState('')
    const [user, setUser] = useState({
        id: nanoid(),
        ad: "",
        soyad: "",
        telefon: "",
        email: "",
        parol: "",
        gender: ""
    })
    function changeTypePassword() {
        setParolType(!parolType)
    }
    function changeTypePasswordAgain() {
        setTekrarParolType(!tekrarParolType)
    }
    function getVelues(e) {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    }

    async function signSubmit(e) {
        e.preventDefault()
        if (user.parol === tekrarParol) {
            try {
                const userData = {
                    ...user,
                    created: new Date().toDateString(),
                    role: "user",
                    active: true
                }
                const result = await registerUser(userData);
                if (result.success) {
                    console.log("Qeydiyyat uğurlu:", result);
                    showRegSuccess()
                    setUser({
                        id: nanoid(),
                        ad: "",
                        soyad: "",
                        telefon: "",
                        email: "",
                        parol: "",
                        gender: ""
                    })
                    setTekrarParol('')
                    navigaetToLogin('/authentication/login')
                }
                else {
                    showRegFailed(result.message)
                }
            } catch (error) {
                console.error("Qeydiyyat xətası:", error);
            }
        }
        else showRegFailed("Tekrar parol dogru deyil!")
    };

    return (
        <div className='reg_box'>
            <form onSubmit={signSubmit} className="registration">
                <h2 className='auth_head'>Qeydiyyat</h2>
                <input name='ad' type="text" placeholder='Ad' onChange={getVelues} value={user.ad} required />
                <input name='soyad' type="text" placeholder='Soyad' onChange={getVelues} value={user.soyad} required />
                <input name='telefon' type="number" placeholder='Telefon' onChange={getVelues} value={user.telefon} required />
                <input name='email' type="email" placeholder='Email' onChange={getVelues} value={user.email} required />
                <div className="password_inp">
                    <input
                        name='parol'
                        type={`${parolType ? 'password' : 'text'}`}
                        placeholder='Parol'
                        onChange={getVelues}
                        value={user.parol}
                        required />
                    {parolType
                        ? <IoMdEyeOff onClick={changeTypePassword} className='eye_icon' />
                        : <IoEye onClick={changeTypePassword} className='eye_icon' />}
                </div>
                <div className="password_inp">
                    <input
                        name='tekrarParol'
                        type={`${tekrarParolType ? 'password' : 'text'}`}
                        placeholder='Tekrar parol'
                        onChange={(e) => { setTekrarParol(e.target.value) }}
                        value={tekrarParol}
                        required />
                    {tekrarParolType
                        ? <IoMdEyeOff onClick={changeTypePasswordAgain} className='eye_icon' />
                        : <IoEye onClick={changeTypePasswordAgain} className='eye_icon' />}
                </div>
                <div className="gender">
                    <div className="male">
                        <label htmlFor="male">Male</label>
                        <input name='gender' id='male' type="radio" value="male" onChange={getVelues} required />
                    </div>
                    <div className="female">
                        <label htmlFor="female">Female</label>
                        <input name='gender' id='female' type="radio" value="female" onChange={getVelues} required />
                    </div>
                </div>
                <button className='reg_btn' type='submit'>Qeydiyyatdan kec</button>
                <div className='go_to_login'>
                    <div>
                        <span>Hesabiniz artiq var?</span>
                        <Link to={'/authentication/login'}>Daxil olun</Link>
                    </div>
                    <Link to={'/'}>Qeydiyyatsiz davam edin</Link>
                </div>
            </form>
            <CrudNotify />
        </div>
    )
}

export default SignUp
