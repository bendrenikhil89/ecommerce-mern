import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

import LoadingToRedirect from './LoadingToRedirect';

export default function PrivateRoute({component: Component, ...rest}) {
    const {user} = useSelector(state => ({...state}))    
    return (
        <Route
          {...rest}
          render={props => {
            return user && user.token ? <Component {...props} /> : <LoadingToRedirect />
          }}
        ></Route>
    )
}