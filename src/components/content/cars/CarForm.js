import {useState} from "react";
import axios from "axios";
import CardComponent from "../../CardComponent";
import {Button, Grid, TextField} from "@material-ui/core";
import classes from "./CarForm.module.css"
import DeleteIcon from "@material-ui/icons/Delete";



const EMPTY_CAR_FORM = {
    'id': null,
    'mark': null,
    'model': null,
    'type': null,
}

const CarForm = () => {

    const [editedCarForm, setEditedCarForm] = useState({...EMPTY_CAR_FORM});

    const handleChangeForm = name => event => {
        setEditedCarForm({...editedCarForm, [name]: event.target.value});
    };


    const handleClearForm = () => {
        setEditedCarForm({...EMPTY_CAR_FORM})
    }

    const handleSubmit = () => {
        console.log("Wysyłamy:" + JSON.stringify(editedCarForm))

        axios.post('http://localhost:8080/reservations',editedCarForm)
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
                                   label={'Type'} size={'small'} variant="filled"/>
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

export default CarForm;