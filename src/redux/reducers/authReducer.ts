import { InferActionsTypes, BaseThunkType } from './../redux-store';
import { FormAction, stopSubmit } from "redux-form";
import { authAPI, ResultCodesEnum, ResultCodesWithCaptchaEnum } from "../../api/api";

const SET_USERS_DATA = 'SET_USERS_DATA';
const GET_CAPTCHA_SUCCESS = 'GET_CAPTCHA_SUCCESS';



let initialState = {
    userId: null as null | number,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}


const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
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



export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string|null, isAuth: boolean) => ({ type: SET_USERS_DATA, payload: { userId, email, login, isAuth } }),
    getCaptchaSuccess: (captchaUrl: string) => ({ type: GET_CAPTCHA_SUCCESS, payload: { captchaUrl } })
}


export const authentication = (): ThunkType => {
    return async (dispatch) => {
        let res = await authAPI.authMe();
        if (res.resultCode === ResultCodesEnum.Success) {
            let { id, email, login } = res.data;
            dispatch(actions.setAuthUserData(id, email, login, true));
        }
    }
}

export const getCaptcha = (): ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.getCaptcha();
        let captchaUrl = data.url;
        dispatch(actions.getCaptchaSuccess(captchaUrl))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null = null): ThunkType => {
    return async (dispatch) => {
        let res = await authAPI.login(email, password, rememberMe, captcha)
        if (res.resultCode === ResultCodesEnum.Success) {
            dispatch(authentication());
        } else {
            if (res.resultCode === ResultCodesWithCaptchaEnum.captchaNeeded) {
                dispatch(getCaptcha());
            }
            let message = res.messages.length > 0 ? res.messages[0] : 'Some error';
            dispatch(stopSubmit('login', { _error: message }));
        }

    }
}

export const logout = (): ThunkType => {
    return async (dispatch) => {
        let res = await authAPI.logout()

        if (res.data.resultCode === 0) {
            dispatch(actions.setAuthUserData(null, null, null, false))
        }

    }
}




export default authReducer;
type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type SetAuthUserDataPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean 
}
type ThunkType = BaseThunkType<ActionsType | FormAction>