import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import instance from "../../../axios/axios";
import classes from "./CarList.module.css";
import {Button} from "@material-ui/core";
import ReservationTable from "../reservations/ReservationTable";


const CarList = () => {
    const [rows, setRows] = useState([]);

    const pullRecordsFromDatabaseServer = () => {
        instance.get("/cars")
            .then((data) => {

                console.log("Otrzymaliśmy sukces odpowiedź!")
                console.log("Rekordy: " + JSON.stringify(data.data));

                setRows(data.data);
            })
            .catch((error) => {
                console.log("Otrzymaliśmy odpowiedź o błędzie!")
            });
    }

    useEffect(() => {
        pullRecordsFromDatabaseServer();
    }, [])

    return (
        <div>
            <div className={classes.AddButtonContainer}>
                <Link to={"/cars"} className={classes.CarsAddButton}>
                    <Button variant="outlined">Add New</Button>
                </Link>
            </div>
            <ReservationTable rows={rows} refreshData={pullRecordsFromDatabaseServer}/>
        </div>
    )
}
export default CarList;