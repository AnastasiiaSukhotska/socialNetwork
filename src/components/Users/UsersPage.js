import { UserItem } from "./UserItem";
import * as axios from 'axios';

export function UsersPage(props) {
    let getUsers = () => {
        if (props.users.length === 0) {

            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(res => {
                props.setUsers(res.data.items);
              
            });
        }
    }
    return (

        <div>
            <button onClick={getUsers}></button>
            jnkj
            {props.users.map(u => <UserItem key={u.id} user={u} follow={props.follow} unfollow={props.unfollow} />)}

        </div>
    )
}