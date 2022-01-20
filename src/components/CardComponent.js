import classes from './CardComponent.module.css';
import car_city from "../car_city.png";

const CardComponent = (props) => {
    return (
        <div className={classes.CardComponentContainer}>
            <div className={classes.CardTitle}>
                {props.title}
            </div>
            <div className={classes.CardContent}>
                {props.children}
            </div>
        </div>
    )
}

export default CardComponent;