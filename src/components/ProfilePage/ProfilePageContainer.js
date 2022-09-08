import { Component } from "react";
import { connect } from "react-redux";
import { ProfilePage } from "./ProfilePage";
import { setProfile, getUserProfile } from "../../redux/reducers/profilePageReducer";
import { useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';
import { withAuthRedirect } from "../hoc/withAuthRedirect";



class ProfilePageContainer extends Component {
    componentDidMount() {
     let profileId = this.props.router.params.profileId;
     if (!profileId) {
         profileId = 2;
     }
     this.props.getUserProfile(profileId);
    }

    
    render() {
        return ( 
        <ProfilePage profile={this.props.profile} />)
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
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

let ProfilePageContainerWithRouter = withRouter(ProfilePageContainer);


export default connect(mapStateToProps, { getUserProfile })(withAuthRedirect(ProfilePageContainerWithRouter));