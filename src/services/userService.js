import { authHeader } from './authHeader'
const API_URL = 'http://127.0.0.1:8000'
// http://127.0.0.1:8000/api/token/

async function getUserService(id) {
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
async function getStudentService(id) {
    try {
        let result = await fetch(`${API_URL}/api/students/${id}/`, {
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
async function getTeacherService(id) {
    try {
        let result = await fetch(`${API_URL}/api/teachers/${id}/`, {
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
async function updateUserService(data) {
    try {
        let result = await fetch(`${API_URL}/api/users/${data.id}/`, {
            method: 'PATCH',
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

export { getUserService, updateUserService, getStudentService, getTeacherService }