import {useEffect, useState} from "react";
import classes from "./ReservationList.module.css";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import axios from "axios";
import ReservationTable from "./ReservationTable";

const ReservationList = () => {
    const [rows, setRows] = useState([]);

    const pullRecordsFromDatabaseServer = () => {
        axios.get("http://localhost:8080/reservations/")
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
                <Link to={"/reservations/add"} className={classes.ReservationAddButton}>
                    <Button variant="outlined">Add New</Button>
                </Link>
            </div>
            <ReservationTable rows={rows} refreshData={pullRecordsFromDatabaseServer}/>
        </div>
    )
}
export default ReservationList;