
import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { createField, Textarea } from '../../common/FormControls';
import { maxLengthCreator, required } from '../../common/validators';
import { DialogItem } from './DialogItem/DialogItem';
import { Message } from './Message/Message';
import { DialogsType, MessagesType } from '../../redux/reducers/dialogsPageReducer';
const style = require('./DialogsPage.module.css');
type PropsType = {
    dialogs: Array<DialogsType>
    message: Array<MessagesType>
    addNewMessage: (message: string) => void
}

type NewMessageFormType = {
    newMessage: string
}

type NewMessafeFormOwnPropsType = {}


type NewMessageFormKeys = Extract <keyof NewMessageFormType, string>

let maxLength150 = maxLengthCreator(150);
const NewMessage = (props: InjectedFormProps<NewMessageFormType, NewMessafeFormOwnPropsType> & NewMessafeFormOwnPropsType) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<NewMessageFormKeys>("Your message...", Textarea, [required, maxLength150], "newMessage")}
            <button className={'generalButton ' + style.newMessageBtn}>Send</button>
        </form>
    )
}

let NewMessageReduxForm = reduxForm<NewMessageFormType, NewMessafeFormOwnPropsType>({ form: 'newMessage' })(NewMessage);

export const DialogsPage: React.FC<PropsType> = (props) => {
    let addNewMessage = (formData: { newMessage: string }) => {
        props.addNewMessage(formData.newMessage);
    }

    return (
        <div className={style.dialogsContainer}>
            <div className={style.dialogsList}>
                {props.dialogs.map((dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />))}
            </div>
            <div className={style.messages}>
                {props.message.map((message) => <Message textContent={message.content} key={message.id} />)}
                <NewMessageReduxForm onSubmit={addNewMessage} />
            </div>
        </div>
    )
}