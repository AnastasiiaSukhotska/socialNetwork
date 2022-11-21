import {Action, applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux';
import profilePageReducer from './reducers/profilePageReducer';
import dialogsPageReducer from './reducers/dialogsPageReducer';
import usersPageReducer from './reducers/usersPageReducer';
import authReducer from './reducers/authReducer';
import thunkMiddlewear, { ThunkAction } from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from './reducers/appReducer';

let reducers = combineReducers ({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersPageReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>;

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
export type InferActionsTypes<T> = T extends {[key: string]: (...arg: any[]) => infer U} ? U : never 
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddlewear)));
//@ts-ignore
window.store = store;
export default store;