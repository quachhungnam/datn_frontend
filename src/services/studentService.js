const API_URL = 'http://127.0.0.1:8000'

async function get_list_student_service(class_id) {
    try {
        let result = await fetch(`${API_URL}/api/lectures/classes/${class_id}/`, {
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
async function getStudentLecture(classId, yearId) {
    try {
        let result = await fetch(`${API_URL}/api/students/classes/${classId}/schoolyear/${yearId}/`, {
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
async function uploadFile(files) {
    try {
        let result = await fetch(`${API_URL}/api/uploadfile/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                // Authorization: token,
                // 'Content-Type': 'application/json',
            },
            body: files
        });
        let resultJson = await result.json();
        // console.log(resultJson)
        return resultJson;
    } catch (error) {
        console.log(`Error is: ${error}`);
        return error;
    }
}

export {
    get_list_student_service,

    uploadFile,
    getStudentLecture,
}