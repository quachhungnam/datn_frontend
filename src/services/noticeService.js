
const API_URL = "http://127.0.0.1:8000";
async function getNotice() {
    try {
        let result = await fetch(`${API_URL}/api/notices/`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
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
export {getNotice}