import { useState } from 'react';
import style from './Paginator.module.css'
export const Paginator = ({totalItemsAmount, countUsers, onPageClick, currentPage, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsAmount/countUsers);
    let pages = [];
    for (let i=1; i<pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(totalItemsAmount/portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber -1) * portionSize +1;
    let rightPortionPageNumber = portionNumber * portionSize;
    return <div>
        { portionNumber > 1 && <button className={'generalButton ' + style.paginatorBtn} onClick = {() => {setPortionNumber(portionNumber -1)}}>Privious page</button>}
        {pages
        .filter(p => p<=rightPortionPageNumber&&p>=leftPortionPageNumber)
        .map(p => {
            return <span key={p} onClick={() => onPageClick(p)} className={currentPage === p ? style.selectedPage : style.unselectedPage}>{p} </span>
        })}
                { portionNumber < portionCount && <button className={'generalButton ' + style.paginatorBtn} onClick = {() => {setPortionNumber(portionNumber + 1)}}>Next page</button>}
    </div>

}