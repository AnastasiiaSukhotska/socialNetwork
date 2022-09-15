import { NavLink } from 'react-router-dom';
import style from './Header.module.css';
export const Header = (props) => {
    return (
        <header className={style.header}>
           <div>
               {props.isAuth ? <div> {props.login }- <button onClick={props.logout}>Logout</button> </div> : <NavLink to={'/login'}>Login</NavLink>
            
            }
            </div> 
            <img src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-logo-design-template-78655edda18bc1196ab28760f1535baa_screen.jpg?ts=1617645324' />
        </header>
    )
}