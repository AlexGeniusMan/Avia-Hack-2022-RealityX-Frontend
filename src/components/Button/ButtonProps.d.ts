import React from 'react'
import Icon from '../Icon/Icon'
import {ClickableObjectMini, DefaultParams} from '../../../../polyus/src/types/Types'

export interface ButtonProps extends DefaultParams, ClickableObjectMini {
    children?: React.ReactNode | string;
    iconPosition?: 'left' | 'right';
    icon?: React.ReactNode<Icon>;
    disabled?: boolean;
    loading?: boolean;
    success?: boolean;
    loadingIcon?: React.ReactNode<Icon>;
    color?: 'green' | 'blue' | 'orange' | 'gray'
}
