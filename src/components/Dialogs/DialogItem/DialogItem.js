import { NavLink } from "react-router-dom";
import style from './DialogItem.module.css';

export function DialogItem(props) {
    let path = '/dialogs/' + props.id;
    return (
        <div className={style.dialogItem}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}