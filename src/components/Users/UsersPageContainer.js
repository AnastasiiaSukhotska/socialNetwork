import { connect } from "react-redux";
import { follow, setCurrentPage, setTotalUsersAmount, setUsers, toggleLoading, unfollow, toggleIsFollowingInProgress, requestUsers } from "../../redux/reducers/usersPageReducer";
import { UsersList } from "./UsersList";
import React from "react";
import style from './UsersPage.module.css';
import { Preloader } from "../Preloader/Preloader";
import { userAPI } from "../../api/api";
import { getCountUsers, getCurrentPage, getIsFollowingInProgress, getIsLoading, getPage, getTotalUsersAmount, getUsers } from "../../redux/reducers/users-selectors";


class UsersPageContainer extends React.Component {
    componentDidMount() {
       this.props.requestUsers(this.props.countUsers);
    }

    onPageClick = (page) => {
        this.props.requestUsers(this.props.countUsers, page);
    }

    render() {
        return <>
        {this.props.isLoading ? <Preloader /> : null}
            <UsersList totalUsersAmount={this.props.totalUsersAmount}
                countUsers={this.props.countUsers}
                onPageClick={this.onPageClick}
                currentPage={this.props.currentPage}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                isFollowingInProgress = {this.props.isFollowingInProgress}
          
            />
        </>
    }


}
let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        countUsers: getCountUsers(state),
        page: getPage(state),
        currentPage: getCurrentPage(state),
        totalUsersAmount: getTotalUsersAmount(state),
        isLoading: getIsLoading(state),
        isFollowingInProgress: getIsFollowingInProgress(state)

    }
}


export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersAmount,
    toggleLoading,
    toggleIsFollowingInProgress,
    requestUsers
    }
)(UsersPageContainer);
