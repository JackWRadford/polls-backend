import { config } from 'dotenv'
import express from 'express'
import { connectToCluster } from './db/connection.js'

// Assign environment variables to process.env.
config()

const port = process.env.PORT || 3000

const app = express()

// Configure Express Middleware.
app.use(express.json())

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`)
})