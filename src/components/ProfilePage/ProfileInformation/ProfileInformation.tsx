import { Preloader } from '../../Preloader/Preloader';
import style from './ProfileInformation.module.css';
import ProfileDataForm, { ProfileDataFormValuesType } from './ProfileDataForm';
import { ContactsType, ProfileType } from '../../../redux/reducers/profilePageReducer';
import { ChangeEvent, FC } from 'react';

const userPhoto = require ('../../../assets/images/user.png');

type ProfileInformationPropsType = {
    profile: ProfileType | null
    savePhoto: (photo: File) => void
    saveProfileData: (profile: ProfileType) => void
    editProfileModeToggler: (mode: boolean) => void
    isOwner: boolean
    profileInformationEditMode: boolean
}

export const ProfileInformation: FC<ProfileInformationPropsType> = (props) => {
    if (!props.profile) {
        return (
            <Preloader />
        )
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData: ProfileType) => {
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
                    {props.isOwner && <div><label className={style.choseImgLabel} htmlFor='chosenImgInput'>Chose photo</label><input id='chosenImgInput' className={style.choseNewImg} type={'file'} onChange={onMainPhotoSelected} /></div>}
                </div>
                {props.profileInformationEditMode ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} /> : < ProfileData profile={props.profile}
                    isOwner={props.isOwner}
                    onEditProfileMode={onEditProfileMode} />}
            </div>
        </div>
    )
}

type PropsProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    onEditProfileMode: () => void
}

const ProfileData: FC<PropsProfileDataType> = ({ profile, isOwner, onEditProfileMode }) => {
    return <div>
        {isOwner && <button onClick={onEditProfileMode} className={'generalButton ' + style.profileBtn}>Edit profile</button>}
        <div className={style.profileInfoItem}><b>Look for a job: </b>{profile.lookingForAJob ? 'yes' : 'no'}</div>
        <div className={style.profileInfoItem}><b>Description: </b>{profile.lookingForAJobDescription}</div>
        <div className={style.profileInfoItem}><b>Full name: </b>{profile.fullName}</div>
        <div className={style.profileInfoItem}><b>About me: </b>{profile.aboutMe}</div>
        <div className={style.profileInfoItem}><b>Contacts: </b>{Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
        })}</div>
    </div>
}


type PropsContactsType = {
    contactTitle: string
    contactValue: string
}

const Contact: FC<PropsContactsType> = ({ contactTitle, contactValue }) => {
    return <div className={style.profileInfoItem}><b>{contactTitle}</b>: {contactValue}</div>
}