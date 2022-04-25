import express from 'express'
import cors from 'cors'
import connectDB from './config/db'

const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.send("hello world")
})

connectDB()
app.listen(process.env.PORT, async () => {
    console.log(`app running on port ${3000}`)
})