export default function AuthReducer(initialState, action) {
    switch (action.type) {
        case "RESTORE_TOKEN":
            return {
                ...initialState,
                isloading: false
            }
        case "REQUEST_LOGIN":
            return {
                ...initialState,
                isloading: true
            }

        case "LOGIN_SUCCESS":
            localStorage.setItem("user", JSON.stringify(action.user));
            return {
                ...initialState,
                user: action.user,
                isloading: false,
                errorMessage: null
            }
        case "LOGOUT":
            localStorage.removeItem('user');
            return {
                ...initialState,
                isLogout: true,
                user: "",
            };

        case "LOGIN_ERROR":
            localStorage.removeItem('user');
            return {
                ...initialState,
                isloading: false,
                errorMessage: action.error
            };
        default:
            return initialState
    }
}