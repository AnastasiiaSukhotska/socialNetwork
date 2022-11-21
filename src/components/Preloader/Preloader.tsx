import style from './Preloader.module.css';

const preloader = require('../../assets/images/preloader.svg');


export const Preloader = () => {
    return (
        <div className={style.preloaderContainer}>
            <img src={preloader}/>
        </div>
    )
}