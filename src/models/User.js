import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    avatarUrl: String,
    contraseña: String,
    reservas: [mongoose.Types.ObjectId]
}, {
    versionKey: false
})


const User = mongoose.model("User", userSchema)

export default User