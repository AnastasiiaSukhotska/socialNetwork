import { FC } from 'react';
import style from './Message.module.css';

type PropsType = {
    textContent: string
}

export const Message: FC<PropsType> = (props) => {
    return (
        <div className={style.messageItem}>{props.textContent}</div>
    )
}