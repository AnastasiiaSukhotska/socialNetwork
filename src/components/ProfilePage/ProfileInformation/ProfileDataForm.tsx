import { createField, Input, Textarea } from '../../../common/FormControls';
import { InjectedFormProps, reduxForm } from 'redux-form';
import style from './ProfileInformation.module.css';
import { ProfileType } from '../../../redux/reducers/profilePageReducer';
import React from 'react';

export type ProfileDataFormValuesType = {
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    aboutMe: string
}

type ProfileDataFormOwnPropsType = {
    profile: ProfileType
}


type ProfileDataFormKeys = Extract <keyof ProfileType, string>

const ProfileDataForm = ({ profile, initialValues, handleSubmit, ...props }: InjectedFormProps<ProfileType, ProfileDataFormOwnPropsType> & ProfileDataFormOwnPropsType) => {
    return <div className={style.profileFormDataContainer}>
        <form className={style.profileFormData} onSubmit={handleSubmit}>
            {props.error && <div>{props.error}</div>}
            <div><b>Look for a job: </b>{createField<ProfileDataFormKeys>('', Input, [], "lookingForAJob", { type: 'checkbox', className: [style.profileFormInput] })}</div>
            <div><b>Description: </b>{createField<ProfileDataFormKeys>('Describe...', Textarea, [], "lookingForAJobDescription", {className: [style.profileFormInput] })}</div>
            <div><b>Full name: </b>{createField<ProfileDataFormKeys>('Your full name', Input, [], "fullName", {className: [style.profileFormInput] })}</div>
            <div><b>About me: </b>{createField<ProfileDataFormKeys>('About me', Input, [], "aboutMe", {className: [style.profileFormInput] })}</div>
            <div className={style.profileFormSubtitle}><b>Contacts: </b>{Object.keys(profile.contacts).map(key => {
                return <div>
                    <b>{key}</b> : {createField(key, Input, [], "contacts." + key, {className: [style.profileFormInput] })}
                </div>
            })}</div>
            <button className={'generalButton ' + style.profileBtn}>Submit</button>
        </form>
    </div>
}

export default reduxForm<ProfileType, ProfileDataFormOwnPropsType>({ form: 'profileData', enableReinitialize: true, destroyOnUnmount: false })(ProfileDataForm);