const API_URL = 'http://127.0.0.1:8000'
// http://127.0.0.1:8000/api/token/
async function getuser_service(token, id) {
    try {
        let result = await fetch(`${API_URL}/api/users/${id}/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
                'Content-Type': 'application/json',
            },
        });
        let resultJson = await result.json();
        console.log(resultJson)
        return resultJson;
    } catch (error) {
        console.log(`Error is: ${error}`);
        return error;
    }
}

export { getuser_service }