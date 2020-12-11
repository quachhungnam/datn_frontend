
import { authHeader } from './authHeader'
import { API_URL } from './urlService'
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
    } catch (ex) {
        console.log(`Error is: ${ex}`);
        return { error: ex };
    }
}
async function get_teacher_class(teacherId, yearId) {
    try {
        let result = await fetch(`${API_URL}/api/adminclass/teacher/${teacherId}/schoolyear/${yearId}/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: authHeader.Authorization,
                'Content-Type': 'application/json',
            },

        });
        let resultJson = await result.json();
        return resultJson;
    } catch (ex) {
        console.log(`Error is: ${ex}`);
        return { error: ex };
    }
}

export {
    get_classesService,
    get_teacher_class
} 