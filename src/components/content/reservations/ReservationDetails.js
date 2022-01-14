import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import instance from "../../../axios/axios";
import CardComponent from "../../CardComponent";
import {Button, Grid} from "@material-ui/core";
import classes from './ReservationDetails.module.css';
import ReservationTable from "./ReservationTable";

const ReservationDetails = () => {
    const {reservationId} = useParams();
    const [reservation, setReservation] = useState({
        'reservations': [],
    });

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

    useEffect(() => {
        pullRecords();
    }, []);

    return (
        <div>
            <CardComponent title={'Reservation Details'}>
                <Grid container className={classes.DetailsContainer}>
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
                </Grid>
            </CardComponent>
            <div className={classes.AddButtonContainer}>
                <Link to={`/reservations/add/selectCar/${reservation.id}`} className={classes.ReservationAddButton}>
                    <Button variant="outlined">Manage Cars</Button>
                </Link>
            </div>
            <ReservationTable rows={reservation.cars} hideDelete={true} refreshData={pullRecords}/>
        </div>
    )
}
export default ReservationDetails;