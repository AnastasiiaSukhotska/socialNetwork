import {applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import profilePageReducer from './reducers/profilePageReducer';
import dialogsPageReducer from './reducers/dialogsPageReducer';
import usersPageReducer from './reducers/usersPageReducer';
import authReducer from './reducers/authReducer';
import thunkMiddlewear from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
let reducers = combineReducers ({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersPageReducer,
    auth: authReducer,
    form: formReducer
});
let store = createStore(reducers, applyMiddleware(thunkMiddlewear));
window.store = store;
export default store;