import { authAPI } from "../../api/api";

const SET_USERS_DATA = 'SET_USERS_DATA';



let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}


export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USERS_DATA, payload: { userId, email, login, isAuth } });
export const authentication = () => {
    return (dispatch) => {
        authAPI.authMe()
            .then(res => {
                if (res.data.resultCode === 0) {
                    let { id, email, login } = res.data.data;
                    dispatch(setAuthUserData(id, email, login, true));
                }
            }
            )
    }
}

export const login = (email, password, rememberMe) => {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe) 
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(authentication());
                }
            })
    }
}

export const logout = () => {
    return (dispatch) => {
        authAPI.logout() 
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null,false))
                }
            })
    }
}




export default authReducer;