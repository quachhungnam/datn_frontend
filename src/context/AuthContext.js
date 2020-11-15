import React, { useReducer } from 'react'
import AuthReducer from '../reducer/authReducer'

export const AuthContext = React.createContext()

let user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";

export const initialState = {
    user: user || "",
    isloading: false,
    errorMessage: null,
    isLogout: false
};


export const AuthProvider = ({ children }) => {
    const [userState, dispatch] = useReducer(AuthReducer, initialState)

    return (
        <AuthContext.Provider value={[userState, dispatch]}>
            {children}
        </AuthContext.Provider>
    )

}
