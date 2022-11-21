import style from './PostItem.module.css';

type PropsType = {
    message: string
    key: number
}
export const PostItem: React.FC<PropsType> = (props) => {
    return (
        <div className={style.postItem}>
            <img  src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Circle-icons-camera.svg/2048px-Circle-icons-camera.svg.png'/>
            {props.message}
        </div>
    )
}