import { Navigate } from 'react-router';
import { DialogItem } from './DialogItem/DialogItem';
import style from './DialogsPage.module.css';
import { Message } from './Message/Message';
export function DialogsPage(props) {
    let updateNewMessageText = (e) => {
        let text = e.target.value;
        props.updateNewMessageText(text);
    }
    let addNewMessage = () => {
        props.addNewMessage();
    }

    return (
        <div className={style.dialogsContainer}>
            <div className={style.dialogsList}>
                {props.dialogs.map((dialog =>  <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>))}
            </div>
            <div className={style.messages}>
                {props.message.map((message) => <Message textContent={message.content}  key={message.id}/>)}
                <textarea onChange={updateNewMessageText} value={props.newMessageText}></textarea>
                <button onClick={addNewMessage}>Send</button>
            </div>
        </div>
    )
}