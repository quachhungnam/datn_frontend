
import React, { useReducer } from 'react'
export const AuthContexts = React.createContext(null);
export const AuthProvider = ({ children }) => {
    // khởi tạo
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case "RESTORE_TOKEN":
                    return {
                        ...prevState,
                        accessToken: action.token,
                        isLoading: false,
                    };
                case "LOG_IN":
                    alert('from auth')
                    return {
                        ...prevState,
                        isSignout: false,
                        accessToken: action.token,
                    };
                case "LOG_OUT":
                    return {
                        ...prevState,
                        isSignout: true,
                        accessToken: null,
                    };
                default:
                    break;
            }
        },
        {
            isLoading: true,
            isSignout: false,
            accessToken: null,
        }
    );
    return (
        <AuthContexts.Provider value={[state, dispatch]}>
            {children}
        </AuthContexts.Provider>
    );
};