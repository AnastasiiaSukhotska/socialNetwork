
import  MyPostsContainer from './MyPosts/MyPostsContainer';
import style from './Profile.module.css';
import { ProfileInformation } from './ProfileInformation/ProfileInformation';


export function ProfilePage(props) {
    
    return (
        <div className={style.content}>
            <ProfileInformation profile = {props.profile}/>  
            <MyPostsContainer store = {props.store}/>
        </div>
    )
}