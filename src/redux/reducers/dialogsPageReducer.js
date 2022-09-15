
const ADD_MESSAGE = 'ADD_MESSAGE';


export let addNewMessageActionCreator = (newMessageText) => {
    return {
        type: ADD_MESSAGE,
        newMessageText
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
    ]
};

const dialogsPageReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages,
                {
                    content: action.newMessageText,
                    id: state.messages.length + 1
                }],
            };
        }
      
        default:
            return state;

    }
}

export default dialogsPageReducer;