import { Component } from "react";
import { connect } from "react-redux";
import { ProfilePage } from "./ProfilePage";
import { setProfile, getUserProfile, getUserStatus, updateUserStatus } from "../../redux/reducers/profilePageReducer";
import { useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from "redux";



class ProfilePageContainer extends Component {
    componentDidMount() {
     let profileId = this.props.router.params.profileId;
     if (!profileId) {
         profileId = 25721;
     }
     this.props.getUserProfile(profileId);
     this.props.getUserStatus(profileId);
    }

    
    render() {
        return ( 
        <ProfilePage profile={this.props.profile} updateUserStatus={this.props.updateUserStatus} status={this.props.status}/>)
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status
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


export default compose (withAuthRedirect,
    withRouter,
     connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus }))
     (ProfilePageContainer);