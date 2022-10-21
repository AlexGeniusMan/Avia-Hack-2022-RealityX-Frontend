import {useMemo} from "react";
import {ButtonProps} from "./ButtonProps";
import styles from './Button.module.scss'
import {getClasses} from '../../utils/getClasses'

export function useButton(props:ButtonProps) {
  const classes = useMemo(() => {
    const conditions:{[index: string]:boolean} = {
      "button": true,
      "button-icon-only": !props.children,
      "button-green": Boolean(props.success) || props.color === 'green',
      "button-red": props.color === 'red',
      "button-blue": props.color === 'blue',
      "button-gray": props.color === 'gray',
    };
    return getClasses(conditions, styles, props.className)
  }, [props]);

  const iconClasses = useMemo(() => {
    const conditions:{[index: string]:boolean} = {
      "button-icon": true,
      "button-icon-left": !props.iconPosition || props.iconPosition === 'left',
      "button-icon-right": props.iconPosition === 'right',
      "spin-anim": Boolean(props.loading),
    };
    return getClasses(conditions, styles)
  }, [props]);

  return {classes, iconClasses}
}
