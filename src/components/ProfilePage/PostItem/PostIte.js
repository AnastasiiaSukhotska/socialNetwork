import style from './PostItem.module.css';
export function PostItem (props) {
    return (
        <div className={style.postItem}>
            <img  src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Circle-icons-camera.svg/2048px-Circle-icons-camera.svg.png'/>
            {props.message}
        </div>
    )
}