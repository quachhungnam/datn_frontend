import { API_URL } from './urlService'
async function get_marksofclass_service(lecture_id) {
    try {
        let result = await fetch(`${API_URL}/api/marks/lecture/${lecture_id}/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                // Authorization: token,
                'Content-Type': 'application/json',
            },
        });
        let resultJson = await result.json();
        // console.log(resultJson)
        return resultJson;
    } catch (error) {
        console.log(`Error is: ${error}`);
        return error;
    }
}
async function get_marksofstudent_service(lecture_id, student_id) {
    try {
        let result = await fetch(`${API_URL}/api/marks/lecture/${lecture_id}/student/${student_id}/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                // Authorization: token,
                'Content-Type': 'application/json',
            },
        });
        let resultJson = await result.json();
        // console.log(resultJson)
        return resultJson;
    } catch (error) {
        console.log(`Error is: ${error}`);
        return error;
    }
}
async function getMarksLecture(lecture_id) {
    try {
        let result = await fetch(`${API_URL}/api/marks/lecture/${lecture_id}/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                // Authorization: token,
                'Content-Type': 'application/json',
            },
        });
        let resultJson = await result.json();
        // console.log(resultJson)
        return resultJson;
    } catch (error) {
        console.log(`Error is: ${error}`);
        return error;
    }
}
// cap nhat diem giua ky, cuoi ky, va
async function update_marks(data) {
    try {
        let result = await fetch(`${API_URL}/api/marks/${data.id}/`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                // Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        let resultJson = await result.json();
        // console.log(resultJson)
        return resultJson;
    } catch (error) {
        console.log(`Error is: ${error}`);
        return error;
    }
}

async function getRecordStudent(studentId) {
    try {
        let result = await fetch(`${API_URL}/api/learningoutcome/student/${studentId}/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                // Authorization: token,
                'Content-Type': 'application/json',
            },
        });
        let resultJson = await result.json();
        return resultJson;
    } catch (error) {
        return error;
    }
}

async function getMarksStudent(studentId) {
    try {
        let result = await fetch(`${API_URL}/api/marks/student/${studentId}/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                // Authorization: token,
                'Content-Type': 'application/json',
            },
        });
        let resultJson = await result.json();
        return resultJson;
    } catch (error) {
        return error;
    }
}
async function getMarksByYear(studentId, yearId) {
    try {
        let result = await fetch(`${API_URL}/api/marks/student/${studentId}/schoolyear/${yearId}/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                // Authorization: token,
                'Content-Type': 'application/json',
            },
        });
        let resultJson = await result.json();
        return resultJson;
    } catch (error) {
        return error;
    }
}
async function getMarksClass(classId, yearId) {
    try {
        let result = await fetch(`${API_URL}/api/marks/classes/${classId}/schoolyear/${yearId}/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                // Authorization: token,
                'Content-Type': 'application/json',
            },
        });
        let resultJson = await result.json();
        return resultJson;
    } catch (error) {
        return error;
    }
}
async function addMarksReg(data) {
    try {
        let result = await fetch(`${API_URL}/api/marksregularys/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                // Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        let resultJson = await result.json();
        return resultJson;
    } catch (error) {
        return error;
    }
}
async function updateMarksReg( data) {
    try {
        let result = await fetch(`${API_URL}/api/marksregularys/${data.id}/`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                // Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        let resultJson = await result.json();
        return resultJson;
    } catch (error) {
        return error;
    }
}

async function deleteMarksReg(id) {
    try {
        let result = await fetch(`${API_URL}/api/marksregularys/${id}/`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                // Authorization: token,
                'Content-Type': 'application/json',
            },
        });
        let resultJson = await result.json();
        return resultJson;
    } catch (error) {
        return error;
    }
}




export {
    get_marksofclass_service,
    get_marksofstudent_service,
    update_marks,
    getRecordStudent,
    getMarksLecture,
    getMarksStudent,
    getMarksByYear,
    getMarksClass,
    addMarksReg,
    deleteMarksReg,
    updateMarksReg
}