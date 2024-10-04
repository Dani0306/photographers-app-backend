import mongoose from "mongoose"
const { Schema } = mongoose;


const fotografoSchema = new Schema({
    nombre: String,
    email: String ,
    contraseña: String,
    precio_por_hora: Number,
    portafolio: [String],
    servicios: [String],
    reservas: [mongoose.Types.ObjectId],
    fechas_reservadas: [Date],
    ubicacion: String,
    calificacion: Number,
    redes_sociales: [String],
    telefono: String
}, {
    versionKey: false
})


const Fotografo = mongoose.model("Fotografo", fotografoSchema)

export default Fotografo
