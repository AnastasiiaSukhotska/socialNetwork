import { NavLink } from 'react-router-dom';
import style from './Navbar.module.css';
export function Navbar() {
    return (
        <nav className={style.nav}>
            <div>
                <NavLink to='/profile' className={style.navItem}>Profile</NavLink>
            </div>
            <div>
                <NavLink to='/dialogs' className={style.navItem}>Messages</NavLink>
            </div>
            <div>
                <NavLink to='/users' className={style.navItem}>Users</NavLink>
            </div>
            <div>
                <a>News</a>
            </div>
            <div>
                <a>Music</a>
            </div>
            <div>
                <a>Settings</a>
            </div>
        </nav>
    )
}