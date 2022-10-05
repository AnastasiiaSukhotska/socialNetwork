import { Component } from "react";
import { connect } from "react-redux";
import { ProfilePage } from "./ProfilePage";
import { getUserProfile, getUserStatus, updateUserStatus, savePhoto, editProfileModeToggler, saveProfileData } from "../../redux/reducers/profilePageReducer";
import { useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';
import { compose } from "redux";



class ProfilePageContainer extends Component {
    updateUser() {
        let profileId = this.props.router.params.profileId ? this.props.router.params.profileId : this.props.authorizedUserId;
        this.props.getUserProfile(profileId);
        this.props.getUserStatus(profileId);
    }

    componentDidMount() {
        this.updateUser();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.router.params.profileId != this.props.router.params.profileId) {
            this.updateUser();
        }
    }


    render() {
        if (!this.props.isAuth && !this.props.router.params.profileId) {
            return <Navigate to='/login' />
        }
        return (
            <ProfilePage profile={this.props.profile}
                updateUserStatus={this.props.updateUserStatus}
                status={this.props.status}
                isOwner={!this.props.router.params.profileId}
                savePhoto={this.props.savePhoto}
                profileInformationEditMode={this.props.profileInformationEditMode}
                editProfileModeToggler={this.props.editProfileModeToggler}
                saveProfileData={this.props.saveProfileData}
            />)
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    profileInformationEditMode: state.profilePage.profileInformationEditMode
})

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();

        return (
            < Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }
    return ComponentWithRouterProp;
}


export default compose(
    withRouter,
    connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, savePhoto, editProfileModeToggler, saveProfileData }))
    (ProfilePageContainer);