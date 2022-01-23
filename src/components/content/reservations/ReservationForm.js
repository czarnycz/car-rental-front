import classes from './ReservationForm.module.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import CardComponent from "../../CardComponent";
import DeleteIcon from '@material-ui/icons/Delete';
import {Button, Grid} from "@material-ui/core";
import {useState} from "react";
import instance from  "../../../axios/axios";
import {Link, useHistory} from "react-router-dom";

const getDateStringFromDateObject = (dateObject) => {
    let ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(dateObject);
    let mo = new Intl.DateTimeFormat('en', {month: '2-digit'}).format(dateObject);
    let da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(dateObject);

    return `${ye}-${mo}-${da}`
}

const EMPTY_NEW_RESERVATION = {
    'id': null,
    'startOfReservation': getDateStringFromDateObject(new Date),
    'endOfReservation': null,


}

const ReservationForm = () => {
    const history = useHistory();


    const [editedReservation, setEditedReservation] = useState({...EMPTY_NEW_RESERVATION});
    const [startOfReservation, setStartOfReservation] = useState(new Date());
    const [endOfReservation, setEndOfReservation] = useState(new Date());

    const handleDateChangeForm = name => date => {
        const finalDate = getDateStringFromDateObject(date)
        setStartOfReservation(date)
        setEditedReservation({...editedReservation, [name]: finalDate});
    };
    const handleDateChangeForm1 = name => date => {
        const finalDate = getDateStringFromDateObject(date)
        setEndOfReservation(date)
        setEditedReservation({...editedReservation, [name]: finalDate});
    };

    const handleClearForm = () => {
        setEditedReservation({...EMPTY_NEW_RESERVATION})
    }

    const handleSubmit = () => {

        console.log("Wysyłamy:" + JSON.stringify(editedReservation))

        instance.post('/reservations',editedReservation)
            .then((data)=>{
                console.log("Odpowiedz sukces: " + JSON.stringify(data));
                let reservationId = data.data;
                history.push(`/reservations/add/selectCar/${reservationId}`)
            })
            .catch((err)=>{
                console.log("Odpowiedz failed: " + JSON.stringify(err))
            })

    }

    return (
        <div>
            <CardComponent title={'Reservation Form'}>
                <Grid container className={classes.FormContainer}>
                    <Grid item xs={6}>
                        Date Start of reservation:
                    </Grid>
                    <Grid item xs={6}>
                        <DatePicker selected={startOfReservation}
                                    onChange={handleDateChangeForm("startOfReservation")}>
                        </DatePicker>
                    </Grid>
                    <Grid item xs={6}>
                        Date End of reservation:
                    </Grid>
                    <Grid item xs={6}>
                        <DatePicker selected={endOfReservation}
                                    onChange={handleDateChangeForm1("endOfReservation")}>
                        </DatePicker>
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