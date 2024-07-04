import express from 'express'
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5000

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requestes-With, Content-Type, Authorization')
    next()
})

app.use(express.json({limit:'10mb'}))

