import classes from '../content/AppContent.module.css';
import DeleteIcon from '@material-ui/icons/Delete';
import {Button, Grid, MenuItem, TextField} from "@material-ui/core";
import {useState} from "react";
import CardComponent from "../CardComponent";
import instance from "../../axios/axios";
import {useHistory} from "react-router-dom";

const EMPTY_NEW_USER = {
    'firstName':'',
    'lastName':'',
    'username': '',
    'password': '',
    'email':'',
    'address': '',
    'admin': false
}

const RegisterForm = () => {
    let history = useHistory();
    const [registeredUser, setRegisteredUser] = useState({...EMPTY_NEW_USER});

    const handleChangeForm = name => event => {
        setRegisteredUser({ ...registeredUser, [name]: event.target.value });
    };

    const handleClearForm = () => {
        setRegisteredUser({...EMPTY_NEW_USER})
    }

    const handleSubmit = () => {
        console.log("Wysyłamy:" + JSON.stringify(registeredUser))

        instance.post('/user/register', registeredUser)
            .then((data)=>{
                console.log("Odpowiedź sukces: "+ JSON.stringify(data));

                history.push("/auth");
            })
            .catch((err) => {
                console.log("Odpowiedź failed: "+ JSON.stringify(err));
            })
    }

    return (
        <div>
            <CardComponent title={'Registration Form'}>
                <Grid container className={classes.FormContainer}>
                    <Grid item xs={12}>
                        <TextField value={registeredUser.firstName}
                                   onChange={handleChangeForm("firstName")}
                                   className={classes.FormStretchField}
                                   label={'First Name'} size={'small'} variant="filled"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={registeredUser.lastName}
                                   onChange={handleChangeForm("lastName")}
                                   className={classes.FormStretchField}
                                   label={'Last Name'} size={'small'} variant="filled"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={registeredUser.username}
                                   onChange={handleChangeForm("username")}
                                   className={classes.FormStretchField}
                                   label={'Username'} size={'small'} variant="filled"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={registeredUser.password}
                                   onChange={handleChangeForm("password")}
                                   className={classes.FormStretchField}
                                   type={"password"}
                                   label={'Password'} size={'small'} variant="filled"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={registeredUser.email}
                                   onChange={handleChangeForm("email")}
                                   className={classes.FormStretchField}
                                   label={'Email'} size={'small'} variant="filled"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={registeredUser.address}
                                   onChange={handleChangeForm("address")}
                                   className={classes.FormStretchField}
                                   label={'Address'} size={'small'} variant="filled"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={registeredUser.admin}
                                   onChange={handleChangeForm("admin")}
                                   className={classes.FormStretchField}
                                   select
                                   label='Role' size={'small'} variant="filled">
                            <MenuItem value={true}>Administrator</MenuItem>
                            <MenuItem value={false}>Basic User</MenuItem>
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

export default RegisterForm;