
import { connect } from "react-redux";
import { addNewPostActionCreator } from "../../../redux/reducers/profilePageReducer";
import {MyPosts } from './MyPosts';
let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addNewPost: (newPostText) => {
            dispatch(addNewPostActionCreator(newPostText));
        }
    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;