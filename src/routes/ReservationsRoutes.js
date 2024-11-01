import { Router } from "express"
import Reserva from "../models/Reserva.js"


const reservationRoutes = Router();


// CREATE RESERVATION

reservationRoutes.post("/addReservation", async (req, res) => {
    const { 
        fotografo,
        usuario, 
        fecha, 
        direccion,
        evento, 
        emailUsuario,
        emailFotografo, 
        hora, 
        telefonoUsuario, 
        precioTotal,
        numero_horas
     } = req.body

    const newReserva = new Reserva({
        usuario, 
        fotografo,
        fecha, 
        direccion,
        evento, 
        emailUsuario,
        emailFotografo, 
        hora, 
        telefonoUsuario, 
        precioTotal,
        numero_horas
    })


    const savedReserva = await newReserva.save();

    return res.status(200).json({ reserva: savedReserva })

})


reservationRoutes.post("/modify/:reservationId", async (req, res) => {
    const { reservationId } = req.params

    const updatedReservation = await Reserva.findByIdAndUpdate(reservationId, { completado: true }, { new: true });

    return res.status(200).json({ reservation: updatedReservation })
})

export default reservationRoutes

