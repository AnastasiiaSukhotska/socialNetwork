
const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';

export let addNewMessageActionCreator = () => {
    return {
        type: ADD_MESSAGE,
    }
}
export let updateNewMessageTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        text: text
    }
}

let initState = {
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
};

const dialogsPageReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages,
                {
                    content: state.newMessageText,
                    id: state.messages.length + 1
                }],
                newMessageText: ''
            };
        }
        case UPDATE_NEW_MESSAGE_TEXT: {
            return {
                ...state,
                newMessageText: action.text
            };
        }
        default:
            return state;

    }
}

export default dialogsPageReducer;