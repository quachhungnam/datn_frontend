import React from 'react'
export default function MarkReducer(initialState, action) {
    switch (action.type) {

        case "GET_MARK_TYPE":
            return {
                ...initialState,
                marktype: action.marktype
            }
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