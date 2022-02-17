import dotenv from 'dotenv'
import express from 'express'

//Config
dotenv.config()
const app = express()
const mode =  process.env.mode
const port = process.env.PORT || 5000

//routes
app.get('/', (req, res) => {
  res.send('Backen Running!')
})

app.listen(port, () => {
  console.log(`Backend Application Running in Port ${port} on ${mode} mode`)
})
