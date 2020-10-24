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

export { get_marksofclass_service, get_marksofstudent_service }