const API_URL = 'http://127.0.0.1:8000'
// http://127.0.0.1:8000/api/token/
async function get_account_infor() {
    try {
        let result = await fetch(`${API_URL}/api/users/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
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
const login = async (user) => {
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
        // if (resultJson.accessToken) {
        //     localStorage.setItem("user", JSON.stringify(resultJson.accessToken));
        // }
        return resultJson;
    } catch (error) {
        return error;
    }
}

const logout = async () => {
    localStorage.removeItem("user")
}

export { get_account_infor, login, logout }
