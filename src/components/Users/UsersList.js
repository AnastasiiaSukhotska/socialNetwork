import { UserItem } from "./UserItem";
import style from './UsersPage.module.css';

export const UsersList = (props) => {
    let pagesCount = Math.ceil(props.totalUsersAmount/props.countUsers);
    let pages = [];
    for (let i=1; i<pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div>
        {pages.map (p => {
            return <span key={p} onClick={() => props.onPageClick(p)} className={props.currentPage === p ? style.selectedPage: style.unselectedPage}>{p} </span>
        })}
        {props.users.map(u => <UserItem key={u.id} user={u} follow={props.follow} unfollow={props.unfollow} isFollowingInProgress={props.isFollowingInProgress} toggleIsFollowingInProgress={props.toggleIsFollowingInProgress} />)}

    </div>
    )
}