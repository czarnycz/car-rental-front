import classes from './ReservationForm.module.css';

import "react-datepicker/dist/react-datepicker.css";
import CardComponent from "../../CardComponent";
import DeleteIcon from '@material-ui/icons/Delete';
import {Button, Grid, TextField} from "@material-ui/core";
import {useState} from "react";
import axios from "axios";

const getDateStringFromDateObject = (dateObject) => {
    let ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(dateObject);
    let mo = new Intl.DateTimeFormat('en', {month: 'numeric'}).format(dateObject);
    let da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(dateObject);

    return `${ye}-${mo}-${da}`
}

const EMPTY_NEW_RESERVATION = {
    'id': null,
    'startOfReservation': getDateStringFromDateObject(new Date),
    'endOfReservation': null,


}

const ReservationForm = () => {

    const [editedReservation, setEditedReservation] = useState({...EMPTY_NEW_RESERVATION});


    const handleChangeForm = name => event => {
        setEditedReservation({...editedReservation, [name]: event.target.value});
    };

    const handleClearForm = () => {
        setEditedReservation({...EMPTY_NEW_RESERVATION})
    }

    const handleSubmit = () => {

        console.log("Wysyłamy:" + JSON.stringify(editedReservation))

        axios.post('http://localhost:8080/reservations',editedReservation)
            .then((data)=>{
                console.log("Odpowiedz sukces: " + JSON.stringify(data));
            })
            .catch((err)=>{
                console.log("Odpowiedz failed: " + JSON.stringify(err))
            })

    }

    return (
        <div>
            <CardComponent title={'Reservation Form'}>
                <Grid container className={classes.FormContainer}>
                    <Grid item xs={12}>
                        <TextField value={editedReservation.startOfReservation}
                                   onChange={handleChangeForm("startOfReservation")}
                                   className={classes.FormStretchField}
                                   label={'StartOfReservation'} size={'small'} variant="filled"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={editedReservation.endOfReservation}
                                   onChange={handleChangeForm("endOfReservation")}
                                   className={classes.FormStretchField}
                                   label={'EndOfReservation'} size={'small'} variant="filled"/>
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid container item xs={10}>
                        <Grid item xs={6}>
                            <Button className={classes.FormStretchField}
                                    size={'small'} variant="contained"
                                    startIcon={<DeleteIcon/>}
                                    onClick={handleClearForm}>
                                Reset
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button className={classes.FormStretchField}
                                    size={'small'} variant="contained"
                                    onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </CardComponent>
        </div>
    )
}

export default ReservationForm;