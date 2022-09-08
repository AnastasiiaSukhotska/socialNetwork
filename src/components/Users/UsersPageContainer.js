import { connect } from "react-redux";
import { follow, setCurrentPage, setTotalUsersAmount, setUsers, toggleLoading, unfollow, toggleIsFollowingInProgress, getUsers } from "../../redux/reducers/usersPageReducer";
import { UsersList } from "./UsersList";
import React from "react";
import style from './UsersPage.module.css';
import { Preloader } from "../Preloader/Preloader";
import { userAPI } from "../../api/api";


class UsersPageContainer extends React.Component {
    componentDidMount() {
       this.props.getUsers(this.props.countUsers);
    }

    onPageClick = (page) => {
        this.props.getUsers(this.props.countUsers, page);
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
        users: state.usersPage.users,
        countUsers: state.usersPage.countUsers,
        page: state.usersPage.page,
        currentPage: state.usersPage.currentPage,
        totalUsersAmount: state.usersPage.totalUsersAmount,
        isLoading: state.usersPage.isLoading,
        isFollowingInProgress: state.usersPage.isFollowingInProgress

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
    getUsers
    }
)(UsersPageContainer);
