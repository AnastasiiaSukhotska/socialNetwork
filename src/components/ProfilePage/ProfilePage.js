
import MyPostsContainer from './MyPosts/MyPostsContainer';
import style from './Profile.module.css';
import { ProfileInformation } from './ProfileInformation/ProfileInformation';
import { ProfileStatus } from './ProfileStatus';


export function ProfilePage(props) {
    return (
        <div className={style.content}>
            <ProfileStatus status={props.status} getUserStatus={props.getUserStatus} updateUserStatus={props.updateUserStatus} />
            <ProfileInformation
                saveProfileData={props.saveProfileData}
                profileInformationEditMode={props.profileInformationEditMode}
                profile={props.profile}
                isOwner={props.isOwner}
                savePhoto={props.savePhoto}
                editProfileModeToggler={props.editProfileModeToggler} />
            <MyPostsContainer store={props.store} />
        </div>
    )
}