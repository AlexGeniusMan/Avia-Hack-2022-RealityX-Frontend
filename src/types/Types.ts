import React from 'react'
import {CSSProperties} from 'react'

export interface DefaultParams{
    style?: CSSProperties;
    className?: string | string[];
}

export interface ClickableObjectMini {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
    onFocus?: (event: React.MouseEvent<HTMLElement>) => void;
    onBlur?: (event: React.MouseEvent<HTMLElement>) => void;
}

export type RequestStatusType = 'Обработано' | 'В процессе' | 'Отклонено'
