import { Paginator } from "../../common/Paginator/Paginator";
import { UserType } from "../../redux/reducers/usersPageReducer";
import { UserItem } from "./UserItem";
import { UsersSearchingFilter } from "./UsersSearchingFilter";

const style =require('./UsersPage.module.css');
type PropsType = {

    countUsers: number
    onPageClick: (pageNumber: number) => void
    currentPage: number
    portionSize?: number
    users: Array<UserType>
    follow: (userId: number)=> void
    unfollow: (userId: number)=> void
    followingInProgress: Array<number>
    totalUsersAmount: number


}

export const UsersList = ({ users, follow, unfollow, followingInProgress, totalUsersAmount, countUsers, onPageClick, currentPage }: PropsType) => {

    return (
        <div className={style.userPageContainer}>
            <Paginator totalItemsAmount={totalUsersAmount} countUsers={countUsers} onPageClick={onPageClick} currentPage={currentPage} />
            {users.map(u => <UserItem key={u.id} user={u} follow={follow} unfollow={unfollow} followingInProgress={followingInProgress}  />)}
        </div>
    )
}