import {useState} from "react";
import instance from  "../../../axios/axios";
import CardComponent from "../../CardComponent";
import {Button, Grid, MenuItem, TextField} from "@material-ui/core";
import classes from "./CarForm.module.css"

import {Link, useParams} from "react-router-dom";



const EMPTY_CAR_FORM = {
    'id': null,
    'mark': 'AUDI',
    'model': 'Q5',
    'type': 'SUV',
}

const CarForm = () => {
    const {reservationId} = useParams();

    const [editedCarForm, setEditedCarForm] = useState({...EMPTY_CAR_FORM});

    const handleChangeForm = name => event => {
        setEditedCarForm({...editedCarForm, [name]: event.target.value});
    };



    const handleSubmit = () => {
        console.log(reservationId)
        console.log("Wysyłamy:" + JSON.stringify(editedCarForm))

        instance.post(`/reservations/selectCar/${reservationId}`,editedCarForm)
            .then((data)=>{
                console.log("Odpowiedz sukces: " + JSON.stringify(data));
            })
            .catch((err)=>{
                console.log("Odpowiedz failed: " + JSON.stringify(err))
            })

    }

    return (
        <div>
            <CardComponent title={'Car Form'}>
                <Grid container className={classes.FormContainer}>
                    <Grid item xs={12}>
                        <TextField value={editedCarForm.type}
                                   onChange={handleChangeForm("type")}
                                   className={classes.FormStretchField}
                                   select
                                   label='Car Body/Type' size={'small'} variant="filled">
                            <MenuItem value={'SUV'}>SUV - 350/day</MenuItem>
                            <MenuItem value={'CABRIOLET'}>Cabriolet - 320/day</MenuItem>
                            <MenuItem value={'SEDAN'}>Sedan - 200/day</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={editedCarForm.mark}
                                   onChange={handleChangeForm("mark")}
                                   className={classes.FormStretchField}
                                   select
                                   label='Mark' size={'small'} variant="filled">
                            <MenuItem value={'AUDI'}>AUDI</MenuItem>
                            <MenuItem value={'BMW'}>BMW</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={editedCarForm.model}
                                   onChange={handleChangeForm("model")}
                                   className={classes.FormStretchField}
                                   select
                                   label='Model' size={'small'} variant="filled">
                            <MenuItem value={'A5'}>A5</MenuItem>
                            <MenuItem value={'E36'}>E36</MenuItem>
                            <MenuItem value={'X5'}>X5</MenuItem>
                            <MenuItem value={'RS6'}>RS6</MenuItem>
                            <MenuItem value={'Q5'}>Q5</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid container item xs={10}>
                        <Grid item xs={6}>
                            <Link to={`/reservations/add`}
                                  className={classes.BackButton}>
                                <Button className={classes.FormStretchField}
                                        size={'small'} variant="contained">
                                    Back
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Link to={`/reservations`}
                                  className={classes.BackButton}>
                                <Button className={classes.FormStretchField}
                                        size={'small'} variant="contained"
                                    onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </CardComponent>
        </div>
    )
}

export default CarForm;