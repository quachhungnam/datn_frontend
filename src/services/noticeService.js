
import { API_URL } from './urlService'
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
    } catch (ex) {
        console.log(`Error is: ${ex}`);
        return { error: ex }
    }
}
export { getNotice }