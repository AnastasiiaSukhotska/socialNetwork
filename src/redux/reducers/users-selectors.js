/*
users: state.usersPage.users,
        countUsers: state.usersPage.countUsers,
        page: state.usersPage.page,
        currentPage: state.usersPage.currentPage,
        totalUsersAmount: state.usersPage.totalUsersAmount,
        isLoading: state.usersPage.isLoading,
        isFollowingInProgress: state.usersPage.isFollowingInProgress
*/


export const getUsers = (state) => {
    return state.usersPage.users
}

export const getCountUsers = (state) => {
    return state.usersPage.countUsers
}

export const getPage = (state) => {
    return state.usersPage.page
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const getTotalUsersAmount = (state) => {
    return state.usersPage.totalUsersAmount
}

export const getIsLoading = (state) => {
    return state.usersPage.isLoading
}

export const getIsFollowingInProgress= (state) => {
    return state.usersPage.isFollowingInProgress
}