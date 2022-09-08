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
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }
}


export const setAuthUserData = (userId, email, login) => ({ type: SET_USERS_DATA, data: { userId, email, login } });
export const authentication = () => {
    return (dispatch) => {
        authAPI.authMe()
            .then(res => {
                if (res.data.resultCode === 0) {
                    let { id, email, login } = res.data.data;
                    dispatch(setAuthUserData(id, email, login));
                }
            }
            )
    }
}


export default authReducer;