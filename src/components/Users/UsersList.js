import { Paginator } from "../../common/Paginator/Paginator";
import { UserItem } from "./UserItem";
import style from './UsersPage.module.css';

export const UsersList = ({ users, follow, unfollow, isFollowingInProgress, toggleIsFollowingInProgress, totalUsersAmount, countUsers, onPageClick, currentPage }) => {

    return (
        <div className={style.userPageContainer}>
            <Paginator totalItemsAmount={totalUsersAmount} countUsers={countUsers} onPageClick={onPageClick} currentPage={currentPage} />
            {users.map(u => <UserItem key={u.id} user={u} follow={follow} unfollow={unfollow} isFollowingInProgress={isFollowingInProgress} toggleIsFollowingInProgress={toggleIsFollowingInProgress} />)}
        </div>
    )
}