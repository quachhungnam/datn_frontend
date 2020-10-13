const API_URL = 'http://127.0.0.1:8000'
// http://127.0.0.1:8000/api/token/
async function getuser_service(token) {
    try {
        let result = await fetch(`${API_URL}/api/checktoken/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
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