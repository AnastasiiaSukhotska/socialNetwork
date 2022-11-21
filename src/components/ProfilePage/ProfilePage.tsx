import { FC } from 'react';
import { PostType, ProfileType } from '../../redux/reducers/profilePageReducer';
import { MyPosts } from './MyPosts/MyPosts';
import style from './Profile.module.css';
import { ProfileInformation } from './ProfileInformation/ProfileInformation';
import { ProfileStatus } from './ProfileStatus';


type PropsType = {
    status: string
    updateUserStatus: (status: string) => void
    savePhoto: (file: File) => void
    editProfileModeToggler: (mode: boolean) => void
    saveProfileData: (data: ProfileType) => void
    profileInformationEditMode: boolean
    isOwner: boolean
    profile: ProfileType | null
    getUserStatus: (id: number) => void
    posts: Array<PostType>
    addNewPost: (newPostText: string) => void
}

export const ProfilePage: FC<PropsType> = (props) => {
    return (
        <div className={style.content}>
            <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus} />
            <ProfileInformation
                saveProfileData={props.saveProfileData}
                profileInformationEditMode={props.profileInformationEditMode}
                profile={props.profile}
                isOwner={props.isOwner}
                savePhoto={props.savePhoto}
                editProfileModeToggler={props.editProfileModeToggler} />
            <MyPosts posts={props.posts} addNewPost={props.addNewPost} />
        </div>
    )
}