import { NavLink } from 'react-router-dom';
import { UserType } from '../../redux/reducers/usersPageReducer';
import React from 'react';
import style from './UserItem.module.css';

const userPhoto = require('../../assets/images/user.png');

type PropsType = {
    user: UserType
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    followingInProgress: Array<number>

}
export  const UserItem: React.FC<PropsType> = (props) => {

    return (
            <div className={style.userItemContainer}>
                <div className={style.userItem}>{props.user.name}</div>
                <NavLink to={'/profile/' + props.user.id} className={style.userItem}>
                    <img src={props.user.photos.small ? props.user.photos.small : userPhoto} className={style.userPhoto} width='100' height='100'/>
                </NavLink>
                <div>
                    {
                        props.user.followed ?
                            <button className={'generalButton ' + style.followTogglerUnfollow} disabled={props.followingInProgress.some(id => id === props.user.id)} onClick={() => {
                                props.unfollow(props.user.id)
                            }}>Unfollow</button> :
                            <button className={'generalButton ' + style.followTogglerFollow} disabled={props.followingInProgress.some(id => id === props.user.id)} onClick={() => {
                                props.follow(props.user.id)
                            }}>Follow</button>
                    }
                </div>
            </div>
    
    )
}