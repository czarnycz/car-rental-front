import classes from "../../App.module.css";
import {Route, Switch} from "react-router-dom";
import React from "react";
import Auth from "./Auth";
import AppHeaderLoggedOut from "../header/AppHeaderLoggedOut";
import ContentHome from "../content/home/ContentHome";
import RegisterForm from "./RegisterForm";

const ContentLoggedOut = () => {
    return (
        <>
            <AppHeaderLoggedOut/>
            <div className={classes.AppContent}>
                <Switch>
                    <Route path={'/auth'}>
                        <Auth/>
                    </Route>
                    <Route path={'/register'}>
                        <RegisterForm/>
                    </Route>
                    <Route path={'/'}>
                        <ContentHome/>
                    </Route>
                </Switch>
            </div>
        </>
    )
}

export default ContentLoggedOut;