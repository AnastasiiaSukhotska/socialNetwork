import dialogsPageReducer from "./reducers/dialogsPageReducer";
import profilePageReducer from "./reducers/profilePageReducer";


export let store = {
    _state: {
        profilesPage: {
            posts: [
                { message: 'Hello', id: 1 },
                { message: 'My first post', id: 2 }
            ],
            newPostText: 'hello'
        },
        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Dasha' },
                { id: 2, name: 'Masha' },
                { id: 3, name: 'Sasha' }
            ],
            messages: [
                { id: 1, content: 'Hi!' },
                { id: 2, content: 'How was your day?' },
                { id: 3, content: 'I`m okay!' },
            ],
            newMessageText: ''
        }
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log('Hi');
    },
    dispatch(action) {
        dialogsPageReducer(this._state.dialogsPage, action);
        profilePageReducer(this._state.profilesPage, action);
        this._callSubscriber(this._state);
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    }
}



