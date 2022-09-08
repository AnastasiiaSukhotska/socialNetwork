import React from "react";
import { PostItem } from "../PostItem/PostIte";
import style from './MyPosts.module.css';
export function MyPosts(props) {
  
    let addNewPost = () => {
        props.addNewPost();
    }

    let updateNewPostText = (e) => {
        let text = e.target.value;
        props.updateNewPostText(text);
    }
 
    return (
        <div>
            My posts
            <textarea value={props.newPostText} onChange={updateNewPostText} ></textarea>
            <button onClick={addNewPost}></button>
            <div>Privious posts
                {props.posts.map((post) => <PostItem message={post.message} key={post.id} />)}
            </div>
        </div>
    )
}

