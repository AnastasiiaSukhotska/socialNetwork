import { Preloader } from '../../Preloader/Preloader';
import style from './ProfileInformation.module.css';
export function ProfileInformation (props) {
    if (!props.profile) {
        return (
            <Preloader/>
        )
    }
    return (
        <div>
            <h2>main content</h2>
            <div className={style.imageWrapper}>
                <img src={props.profile.photos.large} />
            </div>
            <div>ava+description</div>
        </div>
    )
}