import React, { useEffect, useState} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {currentAdmin} from '../../utils/auth';

import LoadingToRedirect from './LoadingToRedirect';

export default function AdminRoute({component: Component, ...rest}) {
    const {user} = useSelector(state => ({...state}));
    const [ok, setOk] = useState(false);
    
    useEffect(() => {
        if(user && user.token){
            currentAdmin(user.token)
            .then(res => {
                console.log("CURRENT ADMIN RES", res);
                setOk(true);
            })
            .catch(err => {
                console.log("ADMIN ROUTE ERROR", err.message)
                setOk(false);
            })
        }
    }, [user]); 
    return (
        <Route
          {...rest}
          render={props => {
            return ok ? <Component {...props} /> : <LoadingToRedirect />
          }}
        ></Route>
    )
}