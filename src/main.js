import express from "express"
import morgan from "morgan"
import cors from "cors"
import connect from "./database.js"
import photographerRoutes from "./routes/photographerRoutes.js"
import reservationRoutes from "./routes/ReservationsRoutes.js"

const app = express();

// MIDDLEWARES

app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json())
app.use(morgan("common"))


// routes prefix

app.use("/auth/photographer", photographerRoutes)
app.use("/reservations", reservationRoutes)


console.log(new Date())

// CONNECTING THE DATABASE AND RUNNING THE SERVER

connect().then(() => {
    console.log("datbase running")
    app.listen(4000, () => console.log("app running"))
})

