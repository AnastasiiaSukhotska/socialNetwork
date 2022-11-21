import { connect } from "react-redux";
import { follow,  unfollow, actions, requestUsers, UserType, FilterType } from "../../redux/reducers/usersPageReducer";
import { UsersList } from "./UsersList";
import React from "react";
import { Preloader } from "../Preloader/Preloader";
import { AppStateType } from "../../redux/redux-store";
import { compose } from "redux";
import style from './UsersPage.module.css';
import { UsersSearchingFilter } from "./UsersSearchingFilter";

type OwnProps = {
    title: string
}

type MapStateToProps = {
    users: Array<UserType>
    countUsers: number
    page: number|string
    currentPage: number
    totalUsersAmount: number
    isLoading: boolean
    followingInProgress: Array<number>
    filter: FilterType

}

type MapDispatchToProps = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    requestUsers: (countUsers: number, page: number, filter: FilterType) => void
    setUsersSearchingFilter: (filter: FilterType) => void
}

type PropsType = MapStateToProps & MapDispatchToProps & OwnProps;
class UsersPageContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.requestUsers(this.props.countUsers, 1, this.props.filter);
    }

    onPageClick = (page: number ) => {
        this.props.requestUsers(this.props.countUsers, page, this.props.filter);
    }

    onFilterChange = (filter: FilterType) => {
        this.props.requestUsers(this.props.countUsers, 1, filter);
    }

    render() {
        return <>
            {this.props.isLoading ? <Preloader /> : null}
            <UsersSearchingFilter onFilterChange={this.onFilterChange}/>
            <UsersList 
                totalUsersAmount={this.props.totalUsersAmount}
                countUsers={this.props.countUsers}
                onPageClick={this.onPageClick}
                currentPage={this.props.currentPage}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType) : MapStateToProps  => {
    return {
        users: state.usersPage.users, // getUsers(state),
        countUsers:  state.usersPage.countUsers, // getCountUsers(state),
        page: state.usersPage.page,  // getPage(state),
        currentPage: state.usersPage.currentPage, // getCurrentPage(state),
        totalUsersAmount: state.usersPage.totalUsersAmount, // getTotalUsersAmount(state),
        isLoading: state.usersPage.isLoading,  // getIsLoading(state),
        followingInProgress: state.usersPage.followingInProgress,  // getIsFollowingInProgress(state)
        filter: state.usersPage.filter
    }
}


export default compose(
    connect<MapStateToProps, MapDispatchToProps, OwnProps, AppStateType>(mapStateToProps, {
    follow,
    unfollow,
    requestUsers,
    setUsersSearchingFilter: actions.setUsersSearchingFilter
})
)(UsersPageContainer);

