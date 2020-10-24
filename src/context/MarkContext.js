import React, { useReducer } from 'react'
import MarkReducer from '../reducer/mark_reducer'

export const MarkContext = React.createContext()

let user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";

export const initialState = {
    // user: user || "",
    classes: "10a2",
    subject: "Toans",
    marktype: "1",
    yearschool: "",
    errorMessage: null,
};



export const MarkProvider = ({ children }) => {
    const [markState, dispatchMark] = useReducer(MarkReducer, initialState)
    return (
        <MarkContext.Provider value={[markState, dispatchMark]}>
            {children}
        </MarkContext.Provider>
    )

}
