/*
users: state.usersPage.users,
        countUsers: state.usersPage.countUsers,
        page: state.usersPage.page,
        currentPage: state.usersPage.currentPage,
        totalUsersAmount: state.usersPage.totalUsersAmount,
        isLoading: state.usersPage.isLoading,
        isFollowingInProgress: state.usersPage.isFollowingInProgress
*/

import { AppStateType } from "../redux-store"


export const getUsers = (state: AppStateType) => {
    return state.usersPage.users
}

export const getCountUsers = (state: AppStateType) => {
    return state.usersPage.countUsers
}

export const getPage = (state: AppStateType) => {
    return state.usersPage.page
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getTotalUsersAmount = (state: AppStateType) => {
    return state.usersPage.totalUsersAmount
}

export const getIsLoading = (state: AppStateType) => {
    return state.usersPage.isLoading
}

export const getIsFollowingInProgress= (state: AppStateType) => {
    return state.usersPage.followingInProgress
}