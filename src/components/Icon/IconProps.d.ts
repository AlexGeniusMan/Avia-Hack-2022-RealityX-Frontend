import {ClickableObjectMini, DefaultParams} from '../../types/Types'

export interface IconProps extends DefaultParams, ClickableObjectMini {
    size?: number,
    color?: 'general' | 'green' | 'red' | 'orange' | 'blue' | 'general-light' | 'green-light' | 'red-light' | 'yellow-light' | 'orange-light' | 'blue-ligh',
    type?: 'fill' | 'line' | '',
    name: string,
}
