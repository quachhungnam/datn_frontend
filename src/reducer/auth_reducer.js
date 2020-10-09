import React from 'react'
import { AuthContexts } from '../actions/auth'
import { login } from '../services/auth_service'
const [dispatch] = React.useContext(AuthContexts)



const action_login2 = async (user) => {
    try {
        const res = await login(user);
        if (res.access) {
            localStorage.setItem("user", JSON.stringify(res));
            dispatch({ type: "LOG_IN", token: res.access });
        } else {
            alert("Sai tai khoan hoac mat khau");
        }
    } catch (e) {
        console.log(e);
    }
};

export { action_login2 }