import { InferActionsTypes } from './../redux-store';
const ADD_MESSAGE = 'ADD_MESSAGE';

export const actions = {
    addNewMessageActionCreator: (newMessageText: string)  => ({type: ADD_MESSAGE, newMessageText})
}

let initState = {
    dialogs: [
        { id: 1, name: 'Dasha' },
        { id: 2, name: 'Masha' },
        { id: 3, name: 'Sasha' }
    ] as Array<DialogsType>, 
    messages: [
        { id: 1, content: 'Hi!' },
        { id: 2, content: 'How was your day?' },
        { id: 3, content: 'I`m okay!' },
    ] as Array<MessagesType>,
};

const dialogsPageReducer = (state = initState, action: ActionsType) : InitialState => {
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
type InitialState = typeof initState;
type ActionsType = InferActionsTypes<typeof actions>
export type DialogsType = {
    id: number
    name: string
}

export type MessagesType = {
    id: number
    content: string
}