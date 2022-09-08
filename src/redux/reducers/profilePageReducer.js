import { userAPI } from "../../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_PROFILE = 'SET_PROFILE';
export let addNewPostActionCreator = () => {
    return {
        type: ADD_POST
    }
}
export let updateNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        text
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

let initState = {
    profile: null,
    posts: [
        { message: 'Hello', id: 1 },
        { message: 'My first post', id: 2 }
    ],
    newPostText: 'hello'
}
const profilePageReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts: [...state.posts,
                {
                    message: state.newPostText,
                    id: state.posts.length + 1
                }],
                newPostText: ''
            };
        }
        case UPDATE_NEW_POST_TEXT:
            {
                return {
                    ...state,
                    newPostText: action.text
                };
            }
        case SET_PROFILE:
            {
                return {
                    ...state,
                    profile: action.profile
                }
            }
        default:
            return state;

    }

}
export default profilePageReducer;