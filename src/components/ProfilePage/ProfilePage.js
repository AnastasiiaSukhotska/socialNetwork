
import  MyPostsContainer from './MyPosts/MyPostsContainer';
import style from './Profile.module.css';
import { ProfileInformation } from './ProfileInformation/ProfileInformation';
import { ProfileStatus } from './ProfileStatus';


export function ProfilePage(props) {
    
    return (
        <div className={style.content}>
            <ProfileStatus status={props.status} getUserStatus={props.getUserStatus} updateUserStatus={props.updateUserStatus}/>
            <ProfileInformation profile = {props.profile}/>  
            <MyPostsContainer store = {props.store}/>
        </div>
    )
}