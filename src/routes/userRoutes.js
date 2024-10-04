import { Router } from "express"
import User from "../models/User.js";
import bcrypt from "bcrypt"
import Fotografo from "../models/Fotografo.js"

const userRouter = Router();


// GET PROFILE

userRouter.get("/:id", async (req, res) => {
    const { id } = req.params

    const user = await User.findById(id);

    if(!user) return res.status(404).json({ message: "Usuario no encontrado." })

    return res.status(200).json({ user })

})

// REGISTER

userRouter.post("/register", async (req, res) => {
    const { nombre, email, avatarUrl, contraseña } = req.body;

    const user = await User.findOne({ email })

    if(user) return res.status(403).json({ message: "Este usuario ya existe, intenta iniciando sesión." })

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    const newUser = new User({
        nombre,
        email, 
        avatarUrl, 
        contraseña: hashedPassword
    })

    const savedUser = await newUser.save();

    return res.status(200).json(savedUser)

})


// LOGIN


userRouter.post("/login", async (req, res) => {
    const { email, contraseña } = req.body

    const user = await User.findOne({ email });

    if(!user) return res.status(404).json({ message: "Correo o contraseña incorrect@." })

    const matched = await bcrypt.compare(contraseña, user.contraseña)

    if(!matched) return res.status(404).json({ message: "Correo o contraseña incorrect@." })

    return res.status(200).json({ user })

})

// ELIMINATE ALL 


userRouter.delete("/deleteAll", async (req, res) => {
    await User.deleteMany();
    await Fotografo.deleteMany();
    
}) 

export default userRouter



