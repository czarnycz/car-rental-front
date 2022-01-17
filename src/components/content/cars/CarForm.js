import {useState} from "react";
import instance from  "../../../axios/axios";
import CardComponent from "../../CardComponent";
import {Button, Grid, MenuItem, TextField} from "@material-ui/core";
import classes from "./CarForm.module.css"
import DeleteIcon from "@material-ui/icons/Delete";
import {Link, useParams} from "react-router-dom";



const EMPTY_CAR_FORM = {
    'id': null,
    'mark': null,
    'model': null,
    'type': 'SUV',
}

const CarForm = () => {
    const {reservationId} = useParams();

    const [editedCarForm, setEditedCarForm] = useState({...EMPTY_CAR_FORM});

    const handleChangeForm = name => event => {
        setEditedCarForm({...editedCarForm, [name]: event.target.value});
    };


    const handleClearForm = () => {
        setEditedCarForm({...EMPTY_CAR_FORM})
    }

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
                        <TextField value={editedCarForm.mark}
                                   onChange={handleChangeForm("mark")}
                                   className={classes.FormStretchField}
                                   label={'Mark'} size={'small'} variant="filled"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={editedCarForm.model}
                                   onChange={handleChangeForm("model")}
                                   className={classes.FormStretchField}
                                   label={'Model'} size={'small'} variant="filled"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={editedCarForm.type}
                                   onChange={handleChangeForm("type")}
                                   className={classes.FormStretchField}
                                   select
                                   label='Car Body/Type' size={'small'} variant="filled">
                            <MenuItem value={'SUV'}>SUV</MenuItem>
                            <MenuItem value={'CABRIOLET'}>Cabriolet</MenuItem>
                            <MenuItem value={'SEDAN'}>Sedan</MenuItem>
                        </TextField>
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