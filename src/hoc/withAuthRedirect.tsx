import React, {ComponentType} from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import {Navigate} from 'react-router-dom'

let mapStateToPropsForRedirect = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
    };
}

type MapPropsType = {
    isAuth: boolean
}

export function withAuthRedirect<WCP> (WrappedComponent: ComponentType<WCP>) {

    const RedirectComponent: React.FC<any> = (props) => {
        let {isAuth, ...restProps} = props
        if(!isAuth) return <Navigate to={'/login'} />

        return (
            <WrappedComponent {...restProps} />
        )
    }

    let ConnectedAuthRedirectComponent = connect<MapPropsType, {}, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}
