const API_URL = 'http://127.0.0.1:8000'

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

async function get_record_student(studentId) {
    try {
        let result = await fetch(`${API_URL}/api/academicrecord/student/${studentId}/`, {
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

async function get_marks_student(studentId, yearId) {
    try {
        let result = await fetch(`${API_URL}/api/marks/student/${studentId}/school_year/${yearId}/`, {
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


export {
    get_marksofclass_service,
    get_marksofstudent_service,
    update_marks,
    get_record_student,
    getMarksLecture,
    get_marks_student
}