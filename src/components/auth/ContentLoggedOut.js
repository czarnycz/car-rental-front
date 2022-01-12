import classes from "../../App.module.css";
import {Route, Switch} from "react-router-dom";
import React from "react";
import Auth from "./Auth";
import AppHeaderLoggedOut from "../header/AppHeaderLoggedOut";
import ContentHome from "../content/home/ContentHome";

const ContentLoggedOut = () => {
    return (
        <>
            <AppHeaderLoggedOut/>
            <div className={classes.AppContent}>
                <Switch>
                    <Route path={'/auth'}>
                        <Auth/>
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