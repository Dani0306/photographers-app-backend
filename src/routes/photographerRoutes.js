import { Router } from "express"
import Fotografo from "../models/Fotografo.js";
import bcrypt from "bcrypt"


const photographerRoutes = Router();


// GET PROFILE

photographerRoutes.get("/:id", async (req, res) => {
    const { id } = req.params

    const user = await Fotografo.findById(id);

    if(!user) return res.status(404).json({ message: "Usuario no encontrado." })

    return res.status(200).json({ user })

})

// PHOTOGRAPHERS REGISTER

photographerRoutes.post("/register", async (req, res) => {
    const { 
        nombre, 
        email,
        contraseña,
        precio_por_hora,
        portafolio, 
        servicios, 
        ubicacion,
        calificacion,
        redes_sociales,
        telefono
      } = req.body


    const user = await Fotografo.findOne({ email });

    if(user) return res.status(401).json({ message: "El usuario ya existe, intenta iniciando sesión." })

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt)

    const newFotografo = new Fotografo({
        nombre, 
        email, 
        contraseña: hashedPassword, 
        precio_por_hora, 
        portafolio, 
        servicios, 
        ubicacion, 
        calificacion, 
        redes_sociales, 
        telefono
    })

    const savedFotografo = await newFotografo.save();

    return res.status(200).json({ user: savedFotografo })

})

// PHOTOGRAPHERS LOGIN


photographerRoutes.post("/login", async (req, res) => {
    const { email, contraseña } = req.body;

    const user = await Fotografo.findOne({ email });

    if(!user) return res.status(400).json({ message: "Usuario o contraseña incorrect@." })

    const matched = await bcrypt.compare(contraseña, user.contraseña);

    if(!matched) return res.status(400).json({ message: "Usuario o contraseña incorrect@." })

    return res.status(200).json({ user })
})

export default photographerRoutes


