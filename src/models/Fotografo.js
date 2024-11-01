import mongoose from "mongoose"
const { Schema } = mongoose;


const fotografoSchema = new Schema({
    nombre: String,
    image_url: String,
    email: String ,
    precio_por_hora: Number,
    portafolio: [String],
    servicios: [String],
    ubicacion: String,
    calificacion: { type: Number, default: 0 },
    redes_sociales: [String],
    telefono: String
}, {
    versionKey: false
})


const Fotografo = mongoose.model("Fotografo", fotografoSchema)

export default Fotografo
