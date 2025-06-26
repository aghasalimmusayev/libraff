import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function RegContext({ children }) {

    const [userState, setUserState] = useState(null)

    return (
        <AuthContext.Provider value={{
            userState,
            setUserState
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext)
}
