
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../common/FormControls';
import { maxLengthCreator, required } from '../../common/validators';
import { DialogItem } from './DialogItem/DialogItem';
import style from './DialogsPage.module.css';
import { Message } from './Message/Message';
let maxLength150 = maxLengthCreator(150);
const NewMessage = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name='newMessage' component={Textarea} validate={[required, maxLength150]}/>
            <button className={'generalButton ' + style.newMessageBtn}>Send</button>
        </form>
    )
}

let NewMessageReduxForm = reduxForm({ form: 'newMessage' })(NewMessage);

export function DialogsPage(props) {
    let addNewMessage = (formData) => {
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