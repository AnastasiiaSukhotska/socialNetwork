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

export let requestUsers = (countUsers, page) => {
    return async (dispatch) => {
        dispatch(toggleLoading(true));
        let res = await userAPI.getUsers(countUsers, page)
            dispatch(toggleLoading(false));
            dispatch(setUsers(res.items));
            dispatch(setCurrentPage(page));
            dispatch(setTotalUsersAmount(res.totalCount));
    }
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleIsFollowingInProgress(true, userId));
      let res = await  apiMethod(userId)
            if (res.data.resultCode === 0) {
                dispatch(actionCreator(userId));
            }
            dispatch(toggleIsFollowingInProgress(false, userId));
}

export let follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, userAPI.followUser.bind(userAPI), followSuccess);
    }
}
export let unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, userAPI.unfollowUser.bind(userAPI), unfollowSuccess);
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