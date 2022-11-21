import { AppStateType, InferActionsTypes, BaseThunkType } from './../redux-store';
import { FormAction, stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { profileAPI, userAPI } from "../../api/api";
import { PhotosType } from "./usersPageReducer";
const ADD_POST = 'ADD-POST';
const SET_PROFILE = 'SET_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SET_PHOTO_SUCCESS = 'SET_PHOTO_SUCCESS';
const EDIT_PROFILE_MODE_TOGGLER = 'EDIT_PROFILE_MODE_TOGGLER';

export const actions = {
    editProfileModeToggler: (mode: boolean) => ({ type: EDIT_PROFILE_MODE_TOGGLER, mode} as const),
    setUserStatus: (status: string) => ({ type: SET_STATUS, status } as const),
    addNewPostActionCreator: (newPostText: string) => ({ type: ADD_POST, newPostText } as const),
    setProfile: (profile: ProfileType) => ({ type: SET_PROFILE, profile } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: SET_PHOTO_SUCCESS, photos } as const),
}

export let getUserProfile = (profileId: number) : ThunkType => {
    return async (dispatch) => {
        let data = await userAPI.getUserProfile(profileId)
        dispatch(actions.setProfile(data))
    }
}

export let getUserStatus = (userId: number) : ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.getUserStatus(userId)
        dispatch(actions.setUserStatus(data));
    }
}

export let updateUserStatus = (newStatus: string): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.updateUserStatus(newStatus)
        if (data.resultCode === 0) {
            dispatch(actions.setUserStatus(newStatus))
        }
    }
}

export let savePhoto = (file: File) : ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.savePhoto(file)
        if (data.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(data.data.photos))
        }
    }
}

export let saveProfileData = (profileData: ProfileType): ThunkType =>
    async (dispatch, getState) => {
        const userId = getState().auth.userId;
        let data = await profileAPI.saveProfileData(profileData)
        if (data.resultCode === 0) {
            if (userId !== null) {
                dispatch(getUserProfile(userId));
            } else throw new Error('UserID can`t be null')
            dispatch(actions.editProfileModeToggler(false));
        }
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
        dispatch(stopSubmit('profileData', { _error: data.messages[0] }));

    }

let initState = {
    profile: null as null | ProfileType,
    posts: [
        { message: 'Hello', id: 1 },
        { message: 'My first post', id: 2 }
    ] as Array<PostType>,
    status: '',
    profileInformationEditMode: false
}


const profilePageReducer = (state = initState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts: [...state.posts,
                {
                    message: action.newPostText,
                    id: state.posts.length + 1
                }]
            };
        }
        case SET_PROFILE:
            {
                return {
                    ...state,
                    profile: action.profile
                }
            }
        case SET_STATUS:
            {
                return {
                    ...state,
                    status: action.status
                }
            }
        case SET_PHOTO_SUCCESS:
            {
                return {
                    ...state,
                    profile: { ...state.profile, photos: action.photos } as ProfileType
                }
            }
        case EDIT_PROFILE_MODE_TOGGLER:
            {
                return {
                    ...state,
                    profileInformationEditMode: action.mode
                }
            }

        default:
            return state;

    }

}
export default profilePageReducer;

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType

}

export type PostType = {
    message: string
    id: number
}
type InitialStateType = typeof initState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>