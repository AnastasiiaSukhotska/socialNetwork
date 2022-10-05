import { Preloader } from '../../Preloader/Preloader';
import style from './ProfileInformation.module.css';
import userPhoto from '../../../assets/images/user.png';
import { createField, Input, Textarea } from '../../../common/FormControls';
import { reduxForm } from 'redux-form';
import ProfileDataForm from './ProfileDataForm';


export function ProfileInformation(props) {
    if (!props.profile) {
        return (
            <Preloader />
        )
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }

    }

    const onSubmit = (formData) => {
        props.saveProfileData(formData);
    }

    const onEditProfileMode = () => {
        props.editProfileModeToggler(true);
    }
    return (
        <div className={style.profileInformationContainer}>
            <div>
                <div className={style.imageWrapper}>
                    <img src={props.profile.photos.large || userPhoto} />
                    {props.isOwner && <div><label className={style.choseImgLabel} for='chosenImgInput'>Chose photo</label><input id='chosenImgInput' className={style.choseNewImg} type={'file'} onChange={onMainPhotoSelected} /></div>}
                </div>
                {props.profileInformationEditMode ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} /> : < ProfileData profile={props.profile}
                    isOwner={props.isOwner}
                    onEditProfileMode={onEditProfileMode} />}
            </div>
        </div>
    )
}

const ProfileData = ({ profile, isOwner, onEditProfileMode }) => {
    return <div>
        {isOwner && <button onClick={onEditProfileMode} className={'generalButton ' + style.profileBtn}>Edit profile</button>}
        <div className={style.profileInfoItem}><b>Look for a job: </b>{profile.lookingForAJob ? 'yes' : 'no'}</div>
        <div className={style.profileInfoItem}><b>Description: </b>{profile.lookingForAJobDescription}</div>
        <div className={style.profileInfoItem}><b>Full name: </b>{profile.fullName}</div>
        <div className={style.profileInfoItem}><b>About me: </b>{profile.aboutMe}</div>
        <div className={style.profileInfoItem}><b>Contacts: </b>{Object.keys(profile.contacts).map(key => {
            return <Contact className={style.profileInfoItem} key={key} contactTitle={key} contactValue={profile.contacts[key]} />
        })}</div>
    </div>
}




const Contact = ({ contactTitle, contactValue }) => {
    return <div className={style.profileInfoItem}><b>{contactTitle}</b>: {contactValue}</div>
}