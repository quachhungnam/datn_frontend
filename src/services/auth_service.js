import { authHeader } from './auth_header'
const API_URL = 'http://127.0.0.1:8000'
// http://127.0.0.1:8000/api/token/
async function checktoken_service(token) {
    try {
        let result = await fetch(`${API_URL}/api/checktoken/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
                'Content-Type': 'application/json',
            },
        });
        let resultJson = await result.json();
        return resultJson;
    } catch (error) {
        console.log(`Error is: ${error}`);
        return error;
    }
}

const login_service = async (user) => {
    try {
        let result = await fetch(`${API_URL}/api/token/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password,
            }),
        });
        let resultJson = await result.json();
        return resultJson;
    } catch (error) {
        return error;
    }
}

const changepass_srv = async (password) => {
    try {
        let result = await fetch(`${API_URL}/api/change-password/`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                Authorization: authHeader.Authorization,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(password),
        });
        let resultJson = await result.json();
        return resultJson;
    } catch (error) {
        return error;
    }
}




const logout_service = async () => {
    localStorage.removeItem("user")
}

export {
    login_service,
    logout_service, checktoken_service,
    changepass_srv
}
