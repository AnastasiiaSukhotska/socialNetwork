import style from './Message.module.css';
export function Message (props) {
    return (
        <div className={style.messageItem}>{props.textContent}</div>
    )
}