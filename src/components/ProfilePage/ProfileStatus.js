import { useEffect, useState } from "react";
import style from './Profile.module.css';
export function ProfileStatus (props) {
    let [editMode, setEditMode ] = useState(false);
    let [ status, setStatus ] = useState(props.status);
    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);
    let activateEdit = () => {
        setEditMode(true);
    }

    let deactivateEdit = () => {
       setEditMode(false);
        props.updateUserStatus(status);
    }

    let onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }


   
        return (
            <div className={style.profileStatusContainer}>
                {editMode ?
                 <input autoFocus={true} onChange={onStatusChange} onBlur={deactivateEdit} value={status} /> 
                :  <span onClick={activateEdit}>{props.status||'-----'}</span>
                }
            </div>

        )
    }
