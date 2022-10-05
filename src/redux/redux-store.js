import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux';
import profilePageReducer from './reducers/profilePageReducer';
import dialogsPageReducer from './reducers/dialogsPageReducer';
import usersPageReducer from './reducers/usersPageReducer';
import authReducer from './reducers/authReducer';
import thunkMiddlewear from 'redux-thunk';
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


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddlewear)));
window.store = store;
export default store;