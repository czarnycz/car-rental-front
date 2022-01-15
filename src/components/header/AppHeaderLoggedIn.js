import classes from "./AppHeader.module.css";
import {Link} from 'react-router-dom';


import logo from "../../logo.svg";
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

const AppHeaderLoggedIn = () => {

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
                <img src={logo} className={classes.AppLogo} alt="logo"/>
            </div>
            <div className={classes.HeaderRight}>
                {
                    HEADER_BUTTONS.map(mapToHeaderButton)
                }
            </div>
        </header>
    );
}

export default AppHeaderLoggedIn;