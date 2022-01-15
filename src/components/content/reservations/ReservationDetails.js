import {Link, useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import instance from "../../../axios/axios";
import CardComponent from "../../CardComponent";
import {Button, Grid} from "@material-ui/core";
import classes from './ReservationDetails.module.css';
import ReservationTable from "./ReservationTable";

const ReservationDetails = () => {
    const history = useHistory();
    const [editedReservation, setEditedReservation] = useState();
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
                    {reservation.cancelled == false ?
                        <>
                            <Grid item xs={3}>
                            <Link to={`/reservations/add/selectCar/${reservation.id}`}
                                  className={classes.ReservationAddButton}>
                                <Button className={classes.FormStretchField}
                                        size={'small'} variant="contained">
                                    Manage Car
                                </Button>
                            </Link>
                        </Grid>
                            <Grid item xs={3}>
                                <Link to={`/rent/${reservation.id}`}
                                      className={classes.ReservationAddButton}>
                                    <Button className={classes.FormStretchField}
                                            size={'small'} variant="contained">
                                        Rent Car
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link to={`/return/${reservation.id}`}
                                      className={classes.ReservationAddButton}>
                                    <Button className={classes.FormStretchField}
                                            size={'small'} variant="contained">
                                        Return Car
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Button className={classes.FormStretchField}
                                        size={'small'} variant="contained"
                                        onClick={handleCancel}>
                                    Cancel reservation
                                </Button>
                            </Grid>
                        </> :
                        <></>}
                </Grid>
            </CardComponent>
        </div>
    )
}
export default ReservationDetails;