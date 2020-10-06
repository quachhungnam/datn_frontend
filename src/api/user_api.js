const host = 'http://127.0.0.1:8000'
async function get_account_infor() {
    try {
        let result = await fetch(`${host}/api/users/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        let resultJson = await result.json();
        return resultJson;
    } catch (err) {
        console.error(`Error is: ${err}`);
        return err;
    }
}


export { get_account_infor }