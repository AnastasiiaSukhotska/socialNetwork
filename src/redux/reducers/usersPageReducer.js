import { userAPI } from "../../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_AMOUNT = 'SET_TOTAL_USERS_AMOUNT';
const TOGGLE_LOADING = 'TOGGLE_LOADING';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'TOGGLE_IS_FOLLOWING_IN_PROGRESS';
export let followSuccess = (userId) => {
    return {
        type: FOLLOW,
        userId
    }
}
export let unfollowSuccess = (userId) => {
    return {
        type: UNFOLLOW,
        userId
    }
}

export let setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }
}

export let setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}

export let setTotalUsersAmount = (number) => {
    return {
        type: SET_TOTAL_USERS_AMOUNT,
        number
    }
}

export let toggleLoading = (isLoading) => {
    return {
        type: TOGGLE_LOADING,
        isLoading
    }
}

export let toggleIsFollowingInProgress = (isFollowingInProgress, userId) => {
    return {
        type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
        isFollowingInProgress,
        userId
    }
}

export let getUsers = (countUsers, page) => {
    return (dispatch) => {
        dispatch(toggleLoading(true));
        userAPI.getUsers(countUsers, page).then(res => {
            dispatch(toggleLoading(false));
            dispatch(setUsers(res.items));
            dispatch(setTotalUsersAmount(res.totalCount));
        })
    }
}

export let follow = (userId) => {
    return (dispatch) => {
        dispatch(toggleIsFollowingInProgress(true, userId));
        userAPI.followUser(userId).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(followSuccess(userId));
            }
            dispatch(toggleIsFollowingInProgress(false, userId));
        });
    }
}
export let unfollow = (userId) => {
    return (dispatch) => {
        dispatch(toggleIsFollowingInProgress(true, userId));
        userAPI.unfollowUser(userId).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(unfollowSuccess(userId));
            }
            dispatch(toggleIsFollowingInProgress(false, userId));
        });
    }
}

let initState = {
    users: [],
    countUsers: 10,
    page: '',
    currentPage: 1,
    totalUsersAmount: 0,
    isLoading: false,
    isFollowingInProgress: []

};

const usersPageReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_USERS:
            return { ...state, users: action.users }

        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (action.userId === u.id) {
                        return { ...u, followed: true, unfollowed: false }
                    }
                    return u;
                })

            }


        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (action.userId === u.id) {
                        return { ...u, unfollowed: true, followed: false }
                    }
                    return u;

                })
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_AMOUNT:
            return {
                ...state,
                totalUsersAmount: action.number
            }

        case TOGGLE_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }

        case TOGGLE_IS_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                isFollowingInProgress: action.isFollowingInProgress ? [...state.isFollowingInProgress, action.userId] : state.isFollowingInProgress.filter(id => id != action.userId)
            }


        default:
            return state;

    }
}

export default usersPageReducer;