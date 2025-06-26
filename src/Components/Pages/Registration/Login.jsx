import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './registration.css'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { loginUser } from '../../../service/RegService';
import CrudNotify, { showError, showLogSuccess } from '../../Child Components/CrudNotify';
import { useAuthContext } from '../../../Context/RegContext'

function Login() {

    const { setUserState } = useAuthContext()
    const [parolType, setParolType] = useState(true)
    function changeTypePassword() {
        setParolType(!parolType)
    }
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        parol: ""
    })
    function getValueUser(e) {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    }
    function loginSubmit() {
        if (user.parol === '' || user.email === '') {
            showError("fill all fiedls")
            return
        }
        loginUser(user)
            .then(item => {
                showLogSuccess()
                localStorage.setItem("user", JSON.stringify(item))
                setUser({
                    email: '',
                    parol: ''
                })
                setUserState(item)
                if (item.role === 'SuperAdmin') {
                    navigate('/Admin')
                } else navigate('/')
            })
            .catch(err => {
                showError('Email ve ya parolunuz dogru deyil');
                console.error('Login error:', err);
            })
    }
    return (
        <div className='auth_box'>
            <CrudNotify />
            <form className="authentication" onSubmit={(e) => {
                e.preventDefault();
                loginSubmit();
            }}>
                <h2 className='auth_head'>Daxil ol</h2>
                <input
                    name='email'
                    type="email"
                    placeholder='Email'
                    value={user.email}
                    onChange={getValueUser} />
                <div className="password_inp">
                    <input
                        name='parol'
                        type={`${parolType ? 'password' : 'text'}`}
                        placeholder='Parol'
                        value={user.parol}
                        onChange={getValueUser} />
                    {parolType
                        ? <IoMdEyeOff onClick={changeTypePassword} className='eye_icon' />
                        : <IoEye onClick={changeTypePassword} className='eye_icon' />}
                </div>
                <button type='submit' className='reg_btn'>Daxil ol</button>
                <div className='go_to_signup'>
                    <Link to={'/authentication/signUp'}>Hesab yarat</Link>
                    <Link to={'/'}>Qeydiyyatsiz davam edin</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
