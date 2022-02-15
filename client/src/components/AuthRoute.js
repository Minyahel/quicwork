import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Redirect, Route } from 'react-router-dom';

//parent components receive child components as props under the name
//children which can be taken an rerendered
//show prop tells the route whether to render that element if logged in
//or not, to prevents a loop of redirection and tells it where to redirect to
export default function AuthRoute({ children, redirect, to }) {
    const activeSession = useSelector((state) => state.activeSession);

    //needs the react fragment so that it is identified as an individual
    //component
    const truth = activeSession && redirect;

    if (truth === true) {
        return <Navigate to={to} />;
    } else {
        return <>{children}</>;
    }
}
