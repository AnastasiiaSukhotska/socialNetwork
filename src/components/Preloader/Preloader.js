import preloader from '../../assets/images/preloader.svg';
import style from './Preloader.module.css';
export const Preloader = (props) => {
    return (
        <div className={style.preloaderContainer}>
            <img src={preloader}/>
        </div>
    )
}