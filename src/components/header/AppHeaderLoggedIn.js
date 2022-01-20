import classes from "./AppHeader.module.css";
import {Link} from 'react-router-dom';
import {connect} from "react-redux";

import car_rental from '../../car_rental.png';
import ListAltIcon from "@material-ui/icons/ListAlt";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";


const HEADER_BUTTONS = [
    {
        name: 'Logout',
        href: '/logout',
        icon: (<></>),
    },
    {
        name: 'Cars',
        href: '/cars',
        icon: (<DirectionsCarIcon fontSize={"small"}/>),
    },
    {
        name: 'Reservation',
        href: '/reservations',
        icon: (<ListAltIcon fontSize={"small"}/>),
    },
    {
        name: 'Home',
        href: '/',
        icon: (<></>),
    },
]

const AppHeaderLoggedIn = (props) => {

    const mapToHeaderButton = (buttonInfo) => {
        return (
            <Link key={buttonInfo.name} to={buttonInfo.href} className={classes.HeaderMenuButton}>
                {buttonInfo.icon}
                <div>{buttonInfo.name}</div>
            </Link>
        )
    }

    return (
        <header className={classes.AppHeader}>
            <div className={classes.HeaderLeft}>
                <img src={car_rental} className={classes.AppLogo} alt="car_rental"/>
            </div>
            <div className={classes.HeaderRight}>
                {
                    HEADER_BUTTONS.map(mapToHeaderButton)
                }
                <div className={classes.UsernameHeaderDiv}>
                    Logged in as: {props.authenticatedUsername} [{props.authenticatedUserId}] [{props.authenticatedUserAdmin?'A':'U'}]
                </div>
            </div>
        </header>
    );
}
const mapStateToProps = state => {
        return {
            authenticatedUsername: state.auth.username,
            authenticatedUserAdmin: state.auth.admin,
            authenticatedUserId: state.auth.id
        };
    }
;

export default connect(mapStateToProps, null)(AppHeaderLoggedIn);