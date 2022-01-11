import classes from "./ReservationList.module.css";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import CardComponent from "../../CardComponent";
import axios from "axios";

const ReservationTable = (props) => {

    const handleRemoveRecord = (row) => {
        axios.delete("http://localhost:8080/reservations/" + row.id)
            .then((data) => {
                console.log("Otrzymaliśmy sukces odpowiedź!");
                props.refreshData();
            })
            .catch((error) => {
                console.log("Otrzymaliśmy odpowiedź o błędzie!");
            });
    }


    return <CardComponent title={'Reservations List'}>
        <div className={classes.TableContainer}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Start Date</TableCell>
                            <TableCell align="right">End Date</TableCell>
                            <TableCell align="right">Car</TableCell>
                            <TableCell align="right">User</TableCell>
                            <TableCell align="right">
                                {/*<Button onClick={}>Edit</Button>*/}
                            </TableCell>
                            <TableCell align="right"/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.map((row) => {
                            let addButton = (<></>);
                            let removeButton = (<></>);
                            if (props.onAdd) {
                                addButton = (<TableCell align="right">
                                    <Button onClick={() => {
                                        props.onAdd(row.id)
                                    }}>Add</Button>
                                </TableCell>)
                            }
                            if (props.onRemove) {
                                removeButton = (<TableCell align="right">
                                    <Button onClick={() => {
                                        props.onRemove(row.id)
                                    }}>Remove</Button>
                                </TableCell>)
                            }

                            return (<TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.surname}</TableCell>
                                <TableCell align="right">
                                    {
                                        props.hideDelete ? (<></>) : <Button onClick={() => {handleRemoveRecord(row)}}>Delete</Button>
                                    }
                                </TableCell>
                                {
                                    (props.isAdded !== undefined && props.isAdded(row.id)) ? removeButton : addButton
                                }

                            </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </CardComponent>
}

export default ReservationTable;