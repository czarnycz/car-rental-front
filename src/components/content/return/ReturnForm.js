import {Link, useParams} from "react-router-dom";
import {useState} from "react";
import instance from "../../../axios/axios";
import CardComponent from "../../CardComponent";
import {Button, Grid, TextField} from "@material-ui/core";
import classes from "./ReturnForm.module.css";

import DatePicker from "react-datepicker";

const getDateStringFromDateObject = (dateObject) => {
    let ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(dateObject);
    let mo = new Intl.DateTimeFormat('en', {month: '2-digit'}).format(dateObject);
    let da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(dateObject);

    return `${ye}-${mo}-${da}`
}

const EMPTY_RETURN_FORM = {
    'reservationId': null,
    'worker': null,

}

const ReturnForm = () => {
    const {reservationId} = useParams();
    const [dateOfReturn, setDateOfReturn] = useState(new Date());

    const [editedCarForm, setEditedCarForm] = useState({...EMPTY_RETURN_FORM});

    const handleChangeForm = name => event => {
        setEditedCarForm({...editedCarForm, [name]: event.target.value});
    };


    const handleClearForm = () => {
        setEditedCarForm({...EMPTY_RETURN_FORM})
    }
    const handleDateChangeForm = name => date => {
        const finalDate = getDateStringFromDateObject(date)
        setDateOfReturn(date)
        setEditedCarForm({...editedCarForm, [name]: finalDate});
    };

    const handleSubmit = () => {
        console.log(reservationId)
        console.log("Wysyłamy:" + JSON.stringify(editedCarForm))

        instance.post(`/return/${reservationId}`,editedCarForm)
            .then((data)=>{
                console.log("Odpowiedz sukces: " + JSON.stringify(data));
            })
            .catch((err)=>{
                console.log("Odpowiedz failed: " + JSON.stringify(err))
            })

    }

    return (
        <div>
            <CardComponent title={'Return Form'}>
                <Grid container className={classes.FormContainer}>
                    <Grid item xs={12}>
                        <DatePicker selected={dateOfReturn}
                                    onChange={handleDateChangeForm("dateOfReturn")}>
                        </DatePicker>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={editedCarForm.worker}
                                   onChange={handleChangeForm("worker")}
                                   className={classes.FormStretchField}
                                   label='Worker' size={'small'} variant="filled">
                        </TextField>
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid container item xs={10}>
                        <Grid item xs={6}>
                        <Link to={`/reservations`}
                              className={classes.BackButton}>
                            <Button className={classes.FormStretchField}
                                    size={'small'} variant="contained">
                                Back
                            </Button>
                        </Link>
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

export default ReturnForm;