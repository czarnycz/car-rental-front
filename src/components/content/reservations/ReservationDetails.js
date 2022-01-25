import {Link, useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import instance from "../../../axios/axios";
import CardComponent from "../../CardComponent";
import {Button, Grid} from "@material-ui/core";
import classes from './ReservationDetails.module.css';
import {connect} from "react-redux";

const ReservationDetails = (props) => {
    const history = useHistory();
    const {reservationId} = useParams();
    const [reservation, setReservation] = useState({});

    const pullRecords = () => {
        instance.get(`/reservations/${reservationId}`)
            .then((data) => {

                console.log("Otrzymaliśmy sukces odpowiedź!")
                console.log("Rekordy: " + JSON.stringify(data.data));

                setReservation(data.data);
            })
            .catch((error) => {
                console.log("Otrzymaliśmy odpowiedź o błędzie!")
            });
    }

    const handleCancel = () => {
        instance.post(`/reservations/cancel/${reservationId}`)
            .then((data) => {
                history.push('/reservations');
                history.goBack();
            })
            .catch((error) => {
                console.log("Otrzymaliśmy odpowiedź o błędzie!")
            });
    }

    useEffect(() => {
        pullRecords();
    }, []);

    let buttonSelectCar = <Grid item xs={4}>
        <Link to={`/reservations/add/selectCar/${reservation.id}`}
              className={classes.ReservationAddButton}>
            <Button className={classes.FormStretchField}
                    size={'small'} variant="contained">
                Manage Car
            </Button>
        </Link>
    </Grid>;

    let buttonRentCar = <Grid item xs={4}>

        <Link to={`/rent/${reservation.id}`}
              className={classes.ReservationAddButton}>
            <Button className={classes.FormStretchField}
                    size={'small'} variant="contained">
                Rent Car
            </Button>
        </Link>
    </Grid>;

    let buttonReturnCar = <Grid item xs={4}>

        <Link to={`/return/${reservation.id}`}
              className={classes.ReservationAddButton}>
            <Button className={classes.FormStretchField}
                    size={'small'} variant="contained">
                Return Car
            </Button>
        </Link>
    </Grid>;

    let buttonCancel = <Grid item xs={4}>
        <Button className={classes.FormStretchField}
                size={'small'} variant="contained"
                onClick={handleCancel}>
            Cancel reservation
        </Button>
    </Grid>;

    let buttonBack = <Grid item xs={4}>
        <Link to={`/reservations/details`}
              className={classes.ReservationAddButton}>
            <Button className={classes.FormStretchField}
                    size={'small'} variant="contained">
                Back
            </Button>
        </Link>
    </Grid>;


    return (
        <div>
            <CardComponent title={'Reservation Details'}>
                <Grid container className={classes.DetailsContainer}>
                    <Grid item xs={3}>
                        ID:
                    </Grid>
                    <Grid item xs={9}>
                        {reservation.id}
                    </Grid>
                    <Grid item xs={3}>
                        Reservation Date:
                    </Grid>
                    <Grid item xs={9}>
                        {reservation.dateOfReservation}
                    </Grid>
                    <Grid item xs={3}>
                        Start Date:
                    </Grid>
                    <Grid item xs={9}>
                        {reservation.startOfReservation}
                    </Grid>
                    <Grid item xs={3}>
                        End Date:
                    </Grid>
                    <Grid item xs={9}>
                        {reservation.endOfReservation}
                    </Grid>
                    <Grid item xs={3}>
                        Mark Of Car
                    </Grid>
                    <Grid item xs={9}>
                        {reservation.mark}
                    </Grid>
                    <Grid item xs={3}>
                        Model Of Car
                    </Grid>
                    <Grid item xs={9}>
                        {reservation.model}
                    </Grid>
                    <Grid item xs={3}>
                        Car Body Type
                    </Grid>
                    <Grid item xs={9}>
                        {reservation.type}
                    </Grid>
                    <Grid item xs={3}>
                        Price
                    </Grid>
                    <Grid item xs={9}>
                        {reservation.price}
                    </Grid>
                    <Grid item xs={3}>
                        Cancelled
                    </Grid>
                    <Grid item xs={9}>
                        {reservation.cancelled ? "Reservation is cancelled" : "No"}
                    </Grid>
                    <Grid item xs={3}>
                        Rented
                    </Grid>
                    <Grid item xs={9}>
                        {reservation.rented ? "Car from this reservation has been rented" : "No"}
                    </Grid>
                    <Grid item xs={3}>
                        Returned
                    </Grid>
                    <Grid item xs={9}>
                        {reservation.returned ? "Car from this reservation has been returned" : "No"}
                    </Grid>
                    {!props.authenticatedUserAdmin && !reservation.rented && !reservation.cancelled? buttonSelectCar : <></>}
                    {props.authenticatedUserAdmin   && !reservation.rented && !reservation.cancelled? buttonRentCar : <></>}
                    {props.authenticatedUserAdmin && reservation.rented && !reservation.returned && !reservation.cancelled? buttonReturnCar : <></>}
                    {!props.authenticatedUserAdmin && !reservation.rented && !reservation.cancelled? buttonCancel : <></>}
                    {buttonBack}

                </Grid>
            </CardComponent>
        </div>
    )
}
const mapStateToProps = state => {
        return {
            authenticatedUsername: state.auth.username,
            authenticatedUserAdmin: state.auth.admin,
            authenticatedUserId: state.auth.id
        };
    }
;
export default connect(mapStateToProps, null)(ReservationDetails);