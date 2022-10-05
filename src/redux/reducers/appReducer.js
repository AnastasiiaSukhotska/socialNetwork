
import { authentication } from "./authReducer";

const INSTALIIZED_SUCCESSED = 'INSTALIIZED_SUCCESSED';



let initialState = {
    instalized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INSTALIIZED_SUCCESSED:
            return {
                ...state,
                instalized: true
            }
        default:
            return state;
    }
}


export const instalizedSuccessed = () => ({ type: INSTALIIZED_SUCCESSED });
export const instalizeApp = () => {
    return (dispatch) => {
        let promise = dispatch(authentication());
        Promise.all([promise])
        .then(() => {
            dispatch(instalizedSuccessed())
            
        })
    }
}

export default appReducer;