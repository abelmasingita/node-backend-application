import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import { importData, deleteData } from './seeder.js'
import productRoutes from './routes/productRoutes.js' 
import userRoutes from './routes/userRoutes.js'

//Config
dotenv.config()
const app = express()
app.use(express.json())
connectDB()

const mode = process.env.mode
const port = process.env.PORT || 5000

//Seeder code
//importData()
//deleteData()

//routes
app.get('/', (req, res) => {
  res.send('Backen Running!')
})

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
//Middleware

//Listener
app.listen(port, () => {
  console.log(`Backend Application Running in Port ${port} on ${mode} mode`)
})
