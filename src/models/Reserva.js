import mongoose from "mongoose"

const { Schema } = mongoose;


const reservaSchema = new Schema({
    fotografo: mongoose.Types.ObjectId,
    usuario: mongoose.Types.ObjectId, 
    fecha: Date, 
    direccion: String, 
    evento: String, 
    emailUsuario: String,
    emailFotografo: String,
    completado: { type: Boolean, default: false },
    hora: String, 
    telefonoUsuario: String, 
    precioTotal: Number,
    numero_horas: Number
}, {
    versionKey: false
})


const Reserva = mongoose.model("Reserva", reservaSchema)

export default Reserva