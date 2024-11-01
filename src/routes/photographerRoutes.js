import { Router } from "express"
import Fotografo from "../models/Fotografo.js";
import bcrypt from "bcrypt"

const photographerRoutes = Router();

// DELETE ONE

photographerRoutes.delete("/:id", async (req, res) => {
    const { id } = req.params
    const deleted = await Fotografo.findByIdAndDelete(id)
    return res.status(200).json({ deleted })

})


// GET ALL PHOTOGRAPHERS 

photographerRoutes.get("/all", async (req, res) => {
    const photographers = await Fotografo.find();
    return res.status(200).json({ photographers })

})

// GET PROFILE

photographerRoutes.get("/:email", async (req, res) => {
    const { email } = req.params

    const user = await Fotografo.findOne({ email });

    if(!user) return res.status(200).json({ user: null })

    return res.status(200).json({ user })

})

// PHOTOGRAPHERS REGISTER

photographerRoutes.post("/register", async (req, res) => {
    const { 
        nombre, 
        email,
        image_url,
        precio_por_hora,
        servicios, 
        ubicacion,
        redes_sociales,
        telefono
      } = req.body


    const newFotografo = new Fotografo({
        nombre, 
        email, 
        precio_por_hora: Number(precio_por_hora), 
        portafolio: [], 
        servicios: servicios.split(" "), 
        ubicacion, 
        calificacion: 0, 
        redes_sociales: redes_sociales.split(" "), 
        telefono, 
        image_url
    })

    const savedFotografo = await newFotografo.save();

    return res.status(200).json({ user: savedFotografo })

})

// MODIFY A PHOTOGRAPHER PROFILE

photographerRoutes.post("/modify", async (req, res) => {
    const { 
        email,
        precio_por_hora,
        servicios, 
        ubicacion,
        redes_sociales,
        telefono
      } = req.body

    const modifiedPhotograher = await Fotografo.findOneAndUpdate({ email }, { precio_por_hora, servicios: servicios.split(", "), ubicacion, redes_sociales: redes_sociales.split(", "), telefono }, { new: true });

    return res.status(200).json({ user: modifiedPhotograher })

})

export default photographerRoutes


