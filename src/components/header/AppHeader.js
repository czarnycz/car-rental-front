import classes from "./AppHeader.module.css";

// import CarRentalIcon from '@material-ui/icons/Veh';
import PeopleAlt from '@material-ui/icons/PeopleAlt'
import {Link} from "react-router-dom";

import logo from "../../logo.svg";


const HEADER_BUTTONS = [
    {
        name: 'Reservation',
        href: '/reservations',
        icon: (<PeopleAlt fontSize={"small"}/>),
    },
    {
        name: 'Users',
        href: '/users',
        icon: (<PeopleAlt fontSize={"small"}/>),
    },
    {
        name: 'Home',
        href: '/',
        icon: (<></>),
    },

]
const AppHeader = () => {

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

export default AppHeader;