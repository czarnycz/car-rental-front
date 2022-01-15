
import instance from "../../../axios/axios";
import classes from "./CarList.module.css";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import CardComponent from "../../CardComponent";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";



const CarList = (props) => {


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

    const handleRemoveRecord = (row) => {
        instance.delete("/cars" + row.id)
            .then((data) => {
                console.log("Otrzymaliśmy sukces odpowiedź!");
                props.refreshData();
            })
            .catch((error) => {
                console.log("Otrzymaliśmy odpowiedź o błędzie!");
            });
    }
    useEffect(() => {
        pullRecordsFromDatabaseServer();
    }, [])


    return(
    <div>
        <CardComponent title={'Cars List'}>
        <div className={classes.TableContainer}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Model</TableCell>
                            <TableCell align="right">Mark</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Delete</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            return (<TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell align="right">{row.model}</TableCell>
                                <TableCell align="right">{row.mark}</TableCell>
                                <TableCell align="right">{row.type}</TableCell>
                                <TableCell align="right">
                                    {
                                        props.hideDelete ? (<></>) : <Button onClick={() => {handleRemoveRecord(row)}}>Delete</Button>
                                    }
                                </TableCell>


                            </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </CardComponent>
    </div>
)
}

export default CarList;