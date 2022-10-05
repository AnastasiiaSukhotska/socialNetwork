import { createField, Input, Textarea } from '../../../common/FormControls';
import { reduxForm } from 'redux-form';
import style from './ProfileInformation.module.css';

const ProfileDataForm = ({ profile, initialValues, handleSubmit, ...props }) => {
    return <div className={style.profileFormDataContainer}>
        <form className={style.profileFormData} onSubmit={handleSubmit}>
            {props.error && <div>{props.error}</div>}
            <div><b>Look for a job: </b>{createField('', Input, [], "lookingForAJob", { type: 'checkbox', className: [style.profileFormInput] })}</div>
            <div><b>Description: </b>{createField('Describe...', Textarea, [], "lookingForAJobDescription", {className: [style.profileFormInput] })}</div>
            <div><b>Full name: </b>{createField('Your full name', Input, [], "fullName", {className: [style.profileFormInput] })}</div>
            <div><b>About me: </b>{createField('About me', Input, [], "aboutMe", {className: [style.profileFormInput] })}</div>
            <div className={style.profileFormSubtitle}><b>Contacts: </b>{Object.keys(profile.contacts).map(key => {
                return <div>
                    <b>{key}</b> : {createField(key, Input, [], "contacts." + key, {className: [style.profileFormInput] })}
                </div>
            })}</div>
            <button className={'generalButton ' + style.profileBtn}>Submit</button>
        </form>
    </div>
}

export default reduxForm({ form: 'profileData', enableReinitialize: true, destroyOnUnmount: false })(ProfileDataForm);