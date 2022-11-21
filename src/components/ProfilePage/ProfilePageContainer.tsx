import { Component, ComponentType, FC, useEffect } from "react";
import { connect } from "react-redux";
import { ProfilePage } from "./ProfilePage";
import { actions, getUserProfile, saveProfileData, updateUserStatus, savePhoto, getUserStatus, ProfileType, PostType } from "../../redux/reducers/profilePageReducer";
import { useLocation, useNavigate, useParams, NavigateFunction, Params, Navigate } from 'react-router-dom';
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";


type MapStateToPropsType = {
    profile: ProfileType | null
    isAuth: boolean
    status: string
    authorizedUserId: number | null
    profileInformationEditMode: boolean
    posts: Array<PostType>
}

type MapDispatchToPropsType = {
    getUserProfile: (id: number) => void
    getUserStatus: (id: number) => void
    updateUserStatus: (status: string) => void
    savePhoto: (file: File) => void
    editProfileModeToggler: (mode: boolean) => void
    saveProfileData: (data: ProfileType) => void
    addNewPost: (newPostText: string) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType;
const ProfilePageContainer: FC<PropsType> = (props) => {

    const { profileId } = useParams<{ profileId?: string }>();

    const updateUser = () => {
        let id: any = profileId ? profileId : props.authorizedUserId;
        props.getUserProfile(id);
        props.getUserStatus(id);
    }

    useEffect(() => {
        updateUser()
    }, [])

    useEffect(() => {
        updateUser()
    }, [profileId])

    if (!props.isAuth && !profileId) {
        return <Navigate to='/login' />

    }
    return (
        <ProfilePage
            profile={props.profile}
            updateUserStatus={props.updateUserStatus}
            getUserStatus={props.getUserStatus}
            status={props.status}
            isOwner={!profileId}
            savePhoto={props.savePhoto}
            profileInformationEditMode={props.profileInformationEditMode}
            editProfileModeToggler={props.editProfileModeToggler}
            saveProfileData={props.saveProfileData}
            posts={props.posts}
            addNewPost={props.addNewPost}
        />)

}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    profileInformationEditMode: state.profilePage.profileInformationEditMode,
    posts: state.profilePage.posts
})

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
        getUserProfile, getUserStatus,
        updateUserStatus, savePhoto,
        editProfileModeToggler: actions.editProfileModeToggler, saveProfileData, addNewPost: actions.addNewPostActionCreator
    }))
    (ProfilePageContainer);





