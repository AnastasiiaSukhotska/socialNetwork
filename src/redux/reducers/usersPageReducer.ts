import { AppStateType, InferActionsTypes, BaseThunkType } from './../redux-store';
import { ThunkAction } from 'redux-thunk';
import { APIResponeType, userAPI } from "../../api/api";
import { Dispatch } from 'react';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_AMOUNT = 'SET_TOTAL_USERS_AMOUNT';
const TOGGLE_LOADING = 'TOGGLE_LOADING';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'TOGGLE_IS_FOLLOWING_IN_PROGRESS';
const SET_USERS_SEARCHING_FILTERS = 'SET_USERS_SEARCHING_FILTERS;'


export const actions = {
    followSuccess: (userId: number) => ({ type: FOLLOW, userId } as const),
    unfollowSuccess: (userId: number) => ({ type: UNFOLLOW, userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: SET_USERS, users } as const),
    setCurrentPage: (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage } as const),
    toggleLoading: (isLoading: boolean) => ({ type: TOGGLE_LOADING, isLoading } as const),
    toggleIsFollowingInProgress: (isFollowingInProgress: boolean, userId: number) => ({ type: TOGGLE_IS_FOLLOWING_IN_PROGRESS, isFollowingInProgress, userId } as const),
    setTotalUsersAmount: (number: number) => ({ type: SET_TOTAL_USERS_AMOUNT, number } as const),
    setUsersSearchingFilter: (filter: FilterType) => ({ type: SET_USERS_SEARCHING_FILTERS, payload: filter } as const)
}

export let requestUsers = (countUsers: number, page: number, filter: FilterType ): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleLoading(true));
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.setUsersSearchingFilter(filter));
        let res = await userAPI.getUsers(countUsers, page, filter.term, filter.friend);
        dispatch(actions.toggleLoading(false));
        dispatch(actions.setUsers(res.items));
        dispatch(actions.setTotalUsersAmount(res.totalCount));
    }
}

const followUnfollowFlow = async (dispatch: Dispatch<ActionsType>, userId: number, apiMethod: (userId: number) => Promise<APIResponeType>, actionCreator: (userId: number) => ActionsType) => {
    dispatch(actions.toggleIsFollowingInProgress(true, userId));
    let res = await apiMethod(userId)
    if (res.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleIsFollowingInProgress(false, userId));
}

export let follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, userAPI.followUser.bind(userAPI), actions.followSuccess);
    }
}
export let unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, userAPI.unfollowUser.bind(userAPI), actions.unfollowSuccess);
    }
}

let initState = {
    users: [] as Array<UserType>,
    countUsers: 10,
    page: '' as number | string,
    currentPage: 1,
    totalUsersAmount: 0,
    isLoading: false,
    followingInProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null|boolean
    }
};

const usersPageReducer = (state = initState, action: ActionsType): InitialStateType => {
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
                followingInProgress: action.isFollowingInProgress ? [...state.followingInProgress, action.userId] : state.followingInProgress.filter(id => id != action.userId)
            }
        case SET_USERS_SEARCHING_FILTERS:
            return {
                ...state,
                filter: action.payload
            }

        default:
            return state;

    }
}

export default usersPageReducer;


export type PhotosType = {
    small: null | string
    large: null | string
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}
type InitialStateType = typeof initState;
export type FilterType = typeof initState.filter;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
