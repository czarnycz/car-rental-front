import classes from './AppContent.module.css'
import {Route, Switch} from "react-router-dom";
import ReservationForm from './reservations/ReservationForm';
import ReservationList from './reservations/ReservationList';
import ContentHome from "./home/ContentHome";

const AppContent = () => {
    return (
        <div className={classes.AppContent}>
            <Switch>
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
    )
}

export default AppContent;