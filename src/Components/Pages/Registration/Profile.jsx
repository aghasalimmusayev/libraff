import React from 'react'
import { useAuthContext } from '../../../Context/RegContext'
import { Navigate } from 'react-router-dom'
import './profile.css'

function Profile() {

    const { userState } = useAuthContext()

    return (
        <div className="my_profile">
            <div className="container">
                <div className="profile_header">
                    <div className="profile_avatar">
                        <div className="avatar_circle">
                            <span>{userState.ad.charAt(0)}{userState.soyad.charAt(0)}</span>
                        </div>
                        <button className="avatar_upload">Şəkil yüklə</button>
                    </div>
                    <div className="profile_info">
                        <h1>{userState.ad} {userState.soyad}</h1>
                        <p className="user_role">{userState.role}</p>
                        <p className="join_date">Qeydiyyat tarixi: {userState.created}</p>
                        <span className={`status ${userState.active ? 'active' : 'inactive'}`}>
                            {userState.active ? 'Aktiv' : 'Qeyri-aktiv'}
                        </span>
                    </div>
                </div>
                <div className="profile_content">
                    <div className="info_card">
                        <div className="card_header">
                            <h3>Şəxsi məlumatlar</h3>
                        </div>
                        <div className="card_body">
                            <div className="info_row">
                                <label>Ad:</label>
                                <span>{userState.ad}</span>
                            </div>
                            <div className="info_row">
                                <label>Soyad:</label>
                                <span>{userState.soyad}</span>
                            </div>
                            <div className="info_row">
                                <label>Email:</label>
                                <span>{userState.email}</span>
                            </div>
                            <div className="info_row">
                                <label>Telefon:</label>
                                <span>{userState.tel}</span>
                            </div>
                            <div className="info_row">
                                <label>Cinsiyyət:</label>
                                <span>{userState.gender === 'male' ? 'Kişi' : 'Qadın'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="info_card">
                        <div className="card_header">
                            <h3>Hesab parametrləri</h3>
                        </div>
                        <div className="card_body">
                            <div className="info_row">
                                <label>İstifadəçi ID:</label>
                                <span>{userState.id}</span>
                            </div>
                            <div className="info_row">
                                <label>Rol:</label>
                                <span className="role">{userState.role}</span>
                            </div>
                            <div className="info_row">
                                <label>Hesab statusu:</label>
                                <span className={`status ${userState.active ? 'active' : 'inactive'}`}>
                                    {userState.active ? 'Aktiv' : 'Qeyri-aktiv'}
                                </span>
                            </div>
                            <div className="info_row">
                                <label>Qeydiyyat tarixi:</label>
                                <span>{userState.created}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function PrivateRoute({ children }) {
    const { userState } = useAuthContext()
    return (
        <>
            {
                userState ? children : <Navigate to={'/authentication/login'} />
            }
        </>
    )
}

export default Profile