import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import ReservationTable from "./ReservationTable";


const ReservationAddCar = () => {

    const {reservationId} = useParams();
    const [cars , setCars] = useState([])
    const [reservation, setReservation] = useState({
        'cars': [],
    })

    const pullCar = () => {
        axios.get("http://localhost:8080/reservations")
            .then((data) => {
                console.log("Otrzymaliśmy sukces odpowiedź!")
                console.log("Rekordy: " + JSON.stringify(data.data));

                setCars(data.data);
            })
            .catch((error) => {
                console.log("Otrzymaliśmy odpowiedź o błędzie!")
            });
    }

    const pullReservation = () => {
        axios.get(`http://localhost:8080/reservations/${reservationId}`)
            .then((data) => {
                console.log("Otrzymaliśmy sukces odpowiedź!")
                console.log("Rekordy: " + JSON.stringify(data.data));

                setReservation(data.data);
            })
            .catch((error) => {
                console.log("Otrzymaliśmy odpowiedź o błędzie!")
            });
    }

    const addCarToReservation = (carId) => {
        console.log("Removing: " + carId)
        axios.post(`http://localhost:8080/reservations/selectCar/${reservationId}/${carId}`)
            .then((data) => {
                console.log("Otrzymaliśmy sukces odpowiedź!")
                console.log("Rekordy: " + JSON.stringify(data.data));

                pullReservation();
                pullCar();
            })
            .catch((error) => {
                console.log("Otrzymaliśmy odpowiedź o błędzie!")
            });
    }


    const isCarAdded = (carId) => {
        for (let reservationCarId in reservation.cars){
            if(reservation.cars[reservationCarId].id === carId){
                return true;
            }
        }
        return false
    }

    useEffect(() => {
        pullCar();
        pullReservation();
    }, [])

    return (
        <div>
            <ReservationTable rows={cars}
                            onAdd={addCarToReservation}
                            isAdded={isCarAdded}/>
        </div>
    )
}
export default ReservationAddCar;