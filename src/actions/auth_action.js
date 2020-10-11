import { login } from '../services/auth_service'

export async function login_action(dispatch, user) {
    try {
        dispatch({ type: 'REQUEST_LOGIN' });
        const res = await login(user)
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
    dispatch({ type: "RESTORE_TOKEN" });
}