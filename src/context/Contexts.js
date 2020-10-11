import React, { useReducer } from 'react'


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
export default function AuthReducer(initialState, action) {
    switch (action.type) {
        case "RESTORE_TOKEN":
            return {
                ...initialState,
                isloading: false
            }
        case "REQUEST_LOGIN":
            return {
                ...initialState,
                isloading: true
            }

        case "LOGIN_SUCCESS":
            return {
                ...initialState,
                user: action.user,
                isloading: false,
                errorMessage: null
            }
        case "LOGOUT":
            // alert('logout')
            return {
                ...initialState,
                isLogout: true,
                user: "",
                // token: ""
            };

        case "LOGIN_ERROR":
            return {
                ...initialState,
                isloading: false,
                errorMessage: action.error
            };
        default:
            return initialState
    }
}


export const AuthProvider = ({ children }) => {
    const [userState, dispatch] = useReducer(AuthReducer, initialState)

    return (
        <AuthContext.Provider value={[userState, dispatch]}>
            {children}
        </AuthContext.Provider>
    )

}
