import React from 'react'
import Icon from '../Icon/icon'
import {DefaultParams} from '../../types/Types'

type InputTypeEnum = 'text' | 'email' | 'password' | 'search' | 'tel' | 'date' | 'dateRange'| 'number'

export interface InputProps extends DefaultParams {
    iconPosition?: 'left' | 'right';
    icon?: React.ReactNode<Icon>;
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    valid?: boolean;
    error?: boolean;
    errorText?: string;
    id?: string;
    name?: string;
    defaultValue?: string
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    autoFocus?: boolean;
    type?: InputTypeEnum;
    pattern?: string;
    color?: 'default' | 'green';
    title?: string;
    maxLength?: number;
    tabIndex?: number
    children?: string | React.ReactNode,
}
