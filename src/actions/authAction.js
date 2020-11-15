import { checkToken, loginUser } from '../services/authService'

export async function loginAction(dispatch, user) {
    try {
        dispatch({ type: 'REQUEST_LOGIN' });
        const res = await loginUser(user)
        if (res.access) {
            await dispatch({ type: 'LOGIN_SUCCESS', user: res });
            // localStorage.setItem("user", JSON.stringify(res));
        } else {
            dispatch({ type: 'LOGIN_ERROR', error: "Sai tài khoản hoặc mật khẩu!" });
        }
    } catch (e) {
        dispatch({ type: 'LOGIN_ERROR', error: "Không thể đăng nhập lúc này!" });
        console.log(e)
    }
}

export async function logoutAction(dispatch) {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
}

export async function checkTokenAction(dispatch) {
    let user = await localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : "";
    if (user !== "") {
        const token = await 'Bearer ' + user.access
        let rs = await checkToken(token)
        if (rs.access) {
            dispatch({ type: "RESTORE_TOKEN" });
        } else {
            dispatch({ type: 'LOGOUT' });
            // localStorage.removeItem('user');
        }
    } else {
        dispatch({ type: 'LOGOUT' });
        // localStorage.removeItem('user');
    }
}