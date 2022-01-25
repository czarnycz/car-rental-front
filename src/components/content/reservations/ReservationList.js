import {useEffect, useState} from "react";
import classes from "./ReservationList.module.css";
import {Link} from "react-router-dom";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import instance from  "../../../axios/axios";
import CardComponent from "../../CardComponent";

const ReservationList = () => {
    const [rows, setRows] = useState([]);

    const pullRecordsFromDatabaseServer = () => {
        instance.get("/reservations")
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
            <CardComponent title={'Reservation List'}>
                <div className={classes.TableContainer}>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell align="right">Start Date</TableCell>
                                    <TableCell align="right">End Date</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Is Cancelled</TableCell>
                                    <TableCell align="right">Details</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">{row.id}</TableCell>
                                        <TableCell align="right">{row.startOfReservation}</TableCell>
                                        <TableCell align="right">{row.endOfReservation}</TableCell>
                                        <TableCell align="right">{row.price}</TableCell>
                                        <TableCell align="right">{row.cancelled ? "Reservation is cancelled" : "No"}</TableCell>
                                        <TableCell align="right">
                                            <Link to={`/reservations/details/${row.id}`} className={classes.ReservationAddButton}>
                                                <Button>Details</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </CardComponent>
        </div>
    )
}
export default ReservationList;