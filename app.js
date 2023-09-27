require('dotenv').config()
require('express-async-errors')

const express = require('express')

const mongoose = require('mongoose')
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

const port = process.env.PORT || 3000
const app = express()


//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//routes

app.get('/', (req,res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productsRouter)
//Products routes

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const start =async () => {
    try {
        //connect db
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`listening on port: ${port}`))
    } catch (error) {
        console.log(error)
    }
}


start()
