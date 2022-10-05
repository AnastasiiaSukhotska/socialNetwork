import { NavLink } from 'react-router-dom';
import userPhoto from '../../assets/images/user.png';
import style from './UserItem.module.css';
export function UserItem(props) {

    return (
       
            <div className={style.userItemContainer}>
                <div className={style.userItem}>{props.user.name}</div>
                <NavLink to={'/profile/' + props.user.id} className={style.userItem}>
                    <img src={props.user.photos.small ? props.user.photos.small : userPhoto} className={style.userPhoto} />
                </NavLink>
                <div>
                    {
                        props.user.followed ?
                            <button className={'generalButton ' + style.followTogglerUnfollow} disabled={props.isFollowingInProgress.some(id => id === props.user.id)} onClick={() => {
                                props.unfollow(props.user.id)
                            }}>Unfollow</button> :
                            <button className={'generalButton ' + style.followTogglerFollow} disabled={props.isFollowingInProgress.some(id => id === props.user.id)} onClick={() => {
                                props.follow(props.user.id)
                            }}>Follow</button>
                    }
                </div>
            </div>
    
    )
}