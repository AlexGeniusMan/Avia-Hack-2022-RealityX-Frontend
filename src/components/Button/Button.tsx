import React, {FC, forwardRef, ReactNode, useMemo} from 'react'
import {useButton} from "./useButton";
import {ButtonProps} from "./ButtonProps";
import Icon from '../Icon/icon'
import "../../styles/icons/_index.scss";
import {getAllEvents} from '../../utils/getAllEvents'

export const Button = forwardRef((props: ButtonProps, ref: any) => {
  const {classes, iconClasses} = useButton(props);

  const events=useMemo(() => {
    return getAllEvents(props)
  },[props]);

  const LocalIcon:FC<{icon?: ReactNode}> = React.memo(({icon}) => (
    <>
      {icon && <span className={iconClasses}>{
          props.success
              ?
              <Icon name={'ri-check-line'} type={'line'} color={'green'} size={20} />
          : props.icon
      }</span>}
    </>
  ))
  const LoadingIcon:FC<{loadingIcon?: ReactNode}> = React.memo(({loadingIcon}) => (
    <>{loadingIcon ? <span className={iconClasses}>{props.loadingIcon}</span>
      : <span className={iconClasses}><Icon name={"ri-loader-2-line"} size={18}/></span>}
    </>
))

  return (
    <button {...events} ref={ref} style={props.style} className={classes} disabled={(!!props.disabled) || !!props.loading}>
      {props.children}
      {props.loading ? <LoadingIcon loadingIcon={props.loadingIcon} /> : <LocalIcon icon={props.icon} />}
    </button>);
});
