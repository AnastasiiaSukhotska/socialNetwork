import { NavLink } from 'react-router-dom';
import style from './Header.module.css';
export const Header = (props) => {
    return (
        <header className={style.header}>
        
               {props.isAuth ? <div className={style.headerWrapper}>  <span>{'Hello, ' + props.login }</span>  
               <button onClick={props.logout} className={'generalButton' + ' ' + style.headerBtn}>Logout</button> </div> : <NavLink to={'/login'}>Login</NavLink>
            
            }
   
        </header>
    )
}