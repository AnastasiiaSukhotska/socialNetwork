import { ChangeEvent, useEffect, useState } from "react";
import style from './Profile.module.css';

type PropsType = {
    status: string
    updateUserStatus: (editedStatus: string) => void
}
export const ProfileStatus =  (props: PropsType) => {
    let [editMode, setEditMode ] = useState(false);
    let [ editableStatus, setEditableStatus ] = useState(props.status);
    useEffect(() => {
        setEditableStatus(props.status);
    }, [props.status]);
    let activateEdit = () => {
        setEditMode(true);
    }

    let deactivateEdit = () => {
       setEditMode(false);
        props.updateUserStatus(editableStatus);
    }

    let onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEditableStatus(e.currentTarget.value);
    }


   
        return (
            <div className={style.profileStatusContainer}>
                {editMode ?
                 <input autoFocus={true} onChange={onStatusChange} onBlur={deactivateEdit} value={editableStatus} /> 
                :  <span onClick={activateEdit}>{props.status||'-----'}</span>
                }
            </div>

        )
    }
