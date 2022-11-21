import { AppStateType, InferActionsTypes, BaseThunkType } from './../redux-store';
import { authentication } from "./authReducer";
import { Action } from 'redux';


const INSTALIIZED_SUCCESSED = 'INSTALIIZED_SUCCESSED';

let initialState: InitialStateType = {
    instalized: false
}

export const actions = {
    instalizedSuccessed: () => ({ type: INSTALIIZED_SUCCESSED } as const)
}

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
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





export const instalizeApp = ()  => {
    return (dispatch: any) => {
        let promise = dispatch(authentication());
        Promise.all([promise])
        .then(() => {
            dispatch(actions.instalizedSuccessed())
            
        })
    }
}

type InitialStateType = { instalized: boolean }
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | Action>
export default appReducer;