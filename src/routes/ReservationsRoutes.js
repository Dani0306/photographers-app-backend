import { Router } from "express"
import Fotografo from "../models/Fotografo.js";
import User from "../models/User.js";
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


    const updatedFotografo = await Fotografo.findByIdAndUpdate(fotografo, { $push: { reservas: savedReserva._id }}, { new: true })
    const updatedUser = await User.findByIdAndUpdate(usuario, { $push: { reservas: savedReserva._id } }, { new: true })

    return res.status(200).json({ photographerReservation: updatedFotografo, userReservation: updatedUser })

})


reservationRoutes.post("/modify/:reservationId", async (req, res) => {
    const { reservationId } = req.params

    const updatedReservation = await Reserva.findByIdAndUpdate(reservationId, { completado: true }, { new: true });

    return res.status(200).json({ reservation: updatedReservation })
})

export default reservationRoutes

