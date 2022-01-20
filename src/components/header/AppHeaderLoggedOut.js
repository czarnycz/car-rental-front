import classes from "./AppHeader.module.css";
import {Link} from 'react-router-dom';
import car_rental from '../../car_rental.png';

const HEADER_BUTTONS = [
    {
        name: 'Home',
        href: '/',
        icon: (<></>),
    },
    {
        name: 'Join',
        href: '/register',
        icon: (<></>),
    },
    {
        name: 'Sign In',
        href: '/auth',
        icon: (<></>),
    },
]

const AppHeaderLoggedOut = () => {

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
            </div>
        </header>
    );
}

export default AppHeaderLoggedOut;