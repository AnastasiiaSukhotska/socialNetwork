import { stopSubmit } from "redux-form";
import { profileAPI, userAPI } from "../../api/api";
const ADD_POST = 'ADD-POST';
const SET_PROFILE = 'SET_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SET_PHOTO_SUCCESS = 'SET_PHOTO_SUCCESS';
const EDIT_PROFILE_MODE_TOGGLER = 'EDIT_PROFILE_MODE_TOGGLER';


export let editProfileModeToggler = (mode) => {
    return {
        type: EDIT_PROFILE_MODE_TOGGLER,
        mode
    }
}


export let setUserStatus = (status) => {
    return {
        type: SET_STATUS,
        status
    }
}

export let addNewPostActionCreator = (newPostText) => {
    return {
        type: ADD_POST,
        newPostText
    }
}

export let setProfile = (profile) => {
    return {
        type: SET_PROFILE,
        profile
    }
}

export let savePhotoSuccess = (photos) => {
    return {
        type: SET_PHOTO_SUCCESS,
        photos
    }
}



export let getUserProfile = (profileId) => {
    return (dispatch) => {
        userAPI.getUserProfile(profileId)
            .then(res =>
                dispatch(setProfile(res.data)))
    }
}

export let getUserStatus = (userId) => {
    return async (dispatch) => {
        let res = await profileAPI.getUserStatus(userId)
        dispatch(setUserStatus(res.data));
    }
}

export let updateUserStatus = (newStatus) => {
    return async (dispatch) => {
        let res = await profileAPI.updateUserStatus(newStatus)
        if (res.data.resultCode === 0) {
            dispatch(setUserStatus(newStatus))
        }
    }
}

export let savePhoto = (file) => {
    return async (dispatch) => {
        let res = await profileAPI.savePhoto(file)
        if (res.data.resultCode === 0) {
            dispatch(savePhotoSuccess(res.data.data.photos))
        }
    }
}

export let saveProfileData = (profileData) => 
    
    async (dispatch, getState) => {
         const userId = getState().auth.userId;
         let res = await profileAPI.saveProfileData(profileData)
         if (res.data.resultCode === 0) {
             dispatch(getUserProfile(userId));
             dispatch(editProfileModeToggler(false));
         }
         let message = res.data.messages.length > 0 ? res.data.messages[0] : 'Some error';
            dispatch(stopSubmit('profileData', { _error: res.data.messages[0] }));
     }
 
let initState = {
    profile: null,
    posts: [
        { message: 'Hello', id: 1 },
        { message: 'My first post', id: 2 }
    ],
    status: '',
    profileInformationEditMode: false
}
const profilePageReducer = (state = initState, action) => {
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
                    profile: {...state.profile, photos: action.photos}
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