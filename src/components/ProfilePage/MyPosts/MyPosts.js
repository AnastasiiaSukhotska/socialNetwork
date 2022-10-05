import React from "react";
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../../../common/FormControls";
import { maxLengthCreator, required } from "../../../common/validators";
import { PostItem } from "../PostItem/PostIte";
import style from './MyPosts.module.css';


let maxLength10 = maxLengthCreator(10);
const MyNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field validate={[required, maxLength10]} name='newPost' component={Textarea} />
            </div>
            <button className={'generalButton ' + style.newPostBtn}>Add post</button>
        </form>
    )
}

const NewPostReduxForm = reduxForm({ form: 'newPost' })(MyNewPostForm);

export const MyPosts = React.memo(props => {

    let addNewPost = (formData) => {
        console.log(formData);
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

