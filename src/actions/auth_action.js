import { checktoken_api, login_api } from '../api/auth_api'

export async function login_action(dispatch, user) {
    try {
        dispatch({ type: 'REQUEST_LOGIN' });
        const res = await login_api(user)
        if (res.access) {
            dispatch({ type: 'LOGIN_SUCCESS', user: res });
            localStorage.setItem("user", JSON.stringify(res));
        } else {
            dispatch({ type: 'LOGIN_ERROR', error: "Sai tài khoản hoặc mật khẩu!" });
        }
    } catch (e) {
        dispatch({ type: 'LOGIN_ERROR', error: "Không thể đăng nhập lúc này!" });
        console.log(e)
    }

}

export async function logout_action(dispatch) {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
}

export async function checktoken_action(dispatch) {
    let user = await localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : "";
    if (user !== "") {
        const token = await 'Bearer ' + user.access
        let rs = await checktoken_api(token)
        if (rs.access) {
            dispatch({ type: "RESTORE_TOKEN" });
        } else {
            dispatch({ type: 'LOGOUT' });
            localStorage.removeItem('user');
        }
    } else {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('user');
    }
}