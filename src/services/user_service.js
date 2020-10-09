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
    } catch (err) {
        console.error(`Error is: ${err}`);
        return err;
    }
}
async function login(user) {
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


export { get_account_infor }
export { login }