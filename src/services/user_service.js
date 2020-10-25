import { authHeader } from './auth_header'
const API_URL = 'http://127.0.0.1:8000'
// http://127.0.0.1:8000/api/token/

async function getuser_service(token, id) {
    try {
        let result = await fetch(`${API_URL}/api/users/${id}/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: authHeader.Authorization,
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
async function update_user(data) {
    try {
        let result = await fetch(`${API_URL}/api/users/${data.id}/`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                Authorization: authHeader.Authorization,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        let resultJson = await result.json();
        return resultJson;
    } catch (error) {
        console.log(`Error is: ${error}`);
        return error;
    }
}

export { getuser_service, update_user }