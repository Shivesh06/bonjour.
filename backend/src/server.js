import express from "express"
import dotenv from "dotenv"
dotenv.config()
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res) => {
  res.send("HELLO")
})

app.use("/api/auth",authRoutes)

app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`)
  connectDB()
})