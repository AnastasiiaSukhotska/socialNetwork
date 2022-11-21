import { FC } from "react";
import { NavLink } from "react-router-dom";
import style from './DialogItem.module.css';

type PropsType = {
    name: string
    id: number
}

export const DialogItem: FC<PropsType> = (props) => {
    let path = '/dialogs/' + props.id;
    return (
        <div className={style.dialogItem}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}