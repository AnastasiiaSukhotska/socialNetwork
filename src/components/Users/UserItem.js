import { NavLink } from 'react-router-dom';
import userPhoto from '../../assets/images/user.png';
import style from './UserItem.module.css';
import * as axios from 'axios';
import { userAPI } from '../../api/api';
export function UserItem(props) {

    return (
        <div>
            <div>
                <NavLink to={'/profile/' + props.user.id}>
                    <img src={props.user.photos.small ? props.user.photos.small : userPhoto} className={style.userPhoto} />
                </NavLink>
                <div>
                    {
                        props.user.followed ?
                            <button disabled={props.isFollowingInProgress.some(id => id === props.user.id)} onClick={() => {
                                props.unfollow(props.user.id)
                            }}>Unfollow</button> :
                            <button disabled={props.isFollowingInProgress.some(id => id === props.user.id)} onClick={() => {
                                props.follow(props.user.id)
                            }}>Follow</button>
                    }
                </div>
            </div>
            <div>
                <div>{props.user.name}</div>
                <div>{props.user.status}</div>
            </div>
        </div>
    )
}