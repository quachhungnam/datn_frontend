
import { authHeader } from './authHeader'
const API_URL = 'http://127.0.0.1:8000'
async function get_classesService(id) {
    try {
        let result = await fetch(`${API_URL}/api/classes/${id}/`, {
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
async function get_teacher_class(teacherId, yearId) {
    try {
        let result = await fetch(`${API_URL}/api/activitiesclass/teacher/${teacherId}/schoolyear/${yearId}/`, {
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

export {
    get_classesService,
    get_teacher_class
} 