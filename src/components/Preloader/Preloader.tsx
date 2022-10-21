import React, {FC} from 'react';
import {ReactComponent as FetchLoader} from './loader.svg';
import s from './Preloader.module.scss'

let Preloader:FC<MyProps> = ({stroke = '#1d0e0b'}) => {
    return (
        <div className={s.preloaderContainer} >
            <FetchLoader stroke={stroke} />
        </div>
    );
}

export default Preloader;

type MyProps = {
    stroke?: string
}
