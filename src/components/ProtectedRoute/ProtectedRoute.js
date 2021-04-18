import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ loggedIn, children, ...props  }) => {

    return (
                loggedIn
                    ? <Route {...props}>{ children }</Route>
                    : <Redirect to={{ pathname: "/", state: 1 }}/>
    )}

export default ProtectedRoute
