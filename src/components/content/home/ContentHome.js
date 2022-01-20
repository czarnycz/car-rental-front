import CardComponent from "../../CardComponent";
import classes from "../../CardComponent.module.css";
import car_city from "../../../car_city.png";

const ContentHome = () => {
    return (
        <header>
        <div>
            <CardComponent title={'Home'}>
                Welcome to our car hiring website. We offer three types of car: SEDAN, SUV and CABRIOLET.
                Follow the reservation form to pick car that you need. Enjoy your travel :)
            </CardComponent>
        </div>
            <div className={classes.CardPicture}>
                <img src={car_city} className={classes.CardPicture}  alt="car_city"/>
            </div>
        </header>
    )
}

export default ContentHome;