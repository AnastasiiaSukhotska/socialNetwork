import { profileAPI, userAPI } from "../../api/api";
const ADD_POST = 'ADD-POST';
const SET_PROFILE = 'SET_PROFILE';
const SET_STATUS = 'SET_STATUS';


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

export let getUserProfile = (profileId) => {
    return (dispatch) => {
        userAPI.getUserProfile(profileId)
            .then(res =>
                dispatch(setProfile(res.data)))
    }
}

export let getUserStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getUserStatus(userId)
            .then(res =>
                dispatch(setUserStatus(res.data)))
    }
}

export let updateUserStatus = (newStatus) => {
    return (dispatch) => {
        console.log(newStatus);
        profileAPI.updateUserStatus(newStatus)
        
            .then(res => {
                if (res.data.resultCode === 0) {
                    console.log(res);
                    dispatch(setUserStatus(newStatus))
                }
            })

    }
}

let initState = {
    profile: null,
    posts: [
        { message: 'Hello', id: 1 },
        { message: 'My first post', id: 2 }
    ],
    status: ''
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

        default:
            return state;

    }

}
export default profilePageReducer;