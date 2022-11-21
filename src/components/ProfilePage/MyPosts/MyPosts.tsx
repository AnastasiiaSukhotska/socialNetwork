import React from "react";
import { reduxForm, InjectedFormProps } from "redux-form";
import { createField, Textarea } from "../../../common/FormControls";
import { maxLengthCreator, required } from "../../../common/validators";
import { PostType } from "../../../redux/reducers/profilePageReducer";
import { PostItem } from "../PostItem/PostIte";
import style from './MyPosts.module.css';

let maxLength10 = maxLengthCreator(10);

type PropsType = {
    addNewPost: (newPost: string) => void
    posts: Array<PostType>
}

type MyNewPostFormValuesType = {
    newPost: string
}

type MyPostFormKeys = Extract<keyof MyNewPostFormValuesType, string>

type MyNewPostFormOwnPropsType = {}
const MyNewPostForm = (props: InjectedFormProps<MyNewPostFormValuesType, MyNewPostFormOwnPropsType> & MyNewPostFormOwnPropsType) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<MyPostFormKeys>("Your new post...", Textarea, [required, maxLength10], "newPost")}
            </div>
            <button className={'generalButton ' + style.newPostBtn}>Add post</button>
        </form>
    )
}

const NewPostReduxForm = reduxForm<MyNewPostFormValuesType, MyNewPostFormOwnPropsType>({ form: 'newPost' })(MyNewPostForm);

export const MyPosts: React.FC<PropsType> = React.memo(props => {

    let addNewPost = (formData: { newPost: string }) => {
        props.addNewPost(formData.newPost);
    }

    return (
        <div className={style.postsContainer}>
            <b>My posts</b>
            <NewPostReduxForm onSubmit={addNewPost} />
            <div className={style.priviousPostsContainer}>Privious posts
                {props.posts.map((post) => <PostItem message={post.message} key={post.id} />)}
            </div>
        </div>
    )
})

