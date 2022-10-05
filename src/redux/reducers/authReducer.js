import { stopSubmit } from "redux-form";
import { authAPI } from "../../api/api";

const SET_USERS_DATA = 'SET_USERS_DATA';
const GET_CAPTCHA_SUCCESS = 'GET_CAPTCHA_SUCCESS';



let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS_DATA:
        case GET_CAPTCHA_SUCCESS:   
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}


export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USERS_DATA, payload: { userId, email, login, isAuth } });
export const getCaptchaSuccess = (captchaUrl) => ({type: GET_CAPTCHA_SUCCESS, payload: {captchaUrl}});
export const authentication = () => {
    return async (dispatch) => {
        let res = await authAPI.authMe();
        if (res.data.resultCode === 0) {
            let { id, email, login } = res.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    }
}

export const getCaptcha = () => {
    return async (dispatch) => {
        let res = await authAPI.getCaptcha();
        let captchaUrl = res.data.url;
        dispatch(getCaptchaSuccess(captchaUrl)) 
    }
}

export const login = (email, password, rememberMe, captcha=null) => {
    return async (dispatch) => {
        let res = await authAPI.login(email, password, rememberMe, captcha)
        if (res.data.resultCode === 0) {
            dispatch(authentication());
        } else {
            if (res.data.resultCode === 10) {
                dispatch(getCaptcha());
            }
            let message = res.data.messages.length > 0 ? res.data.messages[0] : 'Some error';
            dispatch(stopSubmit('login', { _error: message }));
        }

    }
}

export const logout = () => {
    return async (dispatch) => {
        let res = await authAPI.logout()

        if (res.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }

    }
}




export default authReducer;