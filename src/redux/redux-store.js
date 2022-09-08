import {applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import profilePageReducer from './reducers/profilePageReducer';
import dialogsPageReducer from './reducers/dialogsPageReducer';
import usersPageReducer from './reducers/usersPageReducer';
import authReducer from './reducers/authReducer';
import thunkMiddlewear from 'redux-thunk';
let reducers = combineReducers ({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersPageReducer,
    auth: authReducer
});
let store = createStore(reducers, applyMiddleware(thunkMiddlewear));
window.store = store;
export default store;