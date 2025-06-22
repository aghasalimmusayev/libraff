import React from 'react'
import { Outlet } from 'react-router-dom'

function RegLayout() {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default RegLayout
