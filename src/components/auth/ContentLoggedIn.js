import AppHeaderLoggedIn from '../header/AppHeaderLoggedIn';
import classes from "../../App.module.css";
import {Route, Switch} from "react-router-dom";
import React from "react";
import Logout from "./Logout";
import ReservationList from "../content/reservations/ReservationList";
import ContentHome from "../content/home/ContentHome";
import CarForm from "../content/cars/CarForm";
import ReservationForm from "../content/reservations/ReservationForm";
import ReservationAddCar from "../content/reservations/ReservationAddCar";

const ContentLoggedIn = () => {
    return (
        <>
            <AppHeaderLoggedIn/>
            <div className={classes.AppContent}>
                <Switch>
                    <Route path={'/logout'}>
                        <Logout/>
                    </Route>
                    <Route path={'/reservations/add/selectCar/:reservationId'}>
                        <ReservationAddCar/>
                    </Route>
                    <Route path={'/reservations/add/selectCar'}>
                        <CarForm/>
                    </Route>
                    <Route path={'/reservations/add'}>
                        <ReservationForm/>
                    </Route>
                    <Route path={'/reservations'}>
                        <ReservationList/>
                    </Route>
                    <Route path={'/'}>
                        <ContentHome/>
                    </Route>
                </Switch>
            </div>
        </>
    )
}

export default ContentLoggedIn;