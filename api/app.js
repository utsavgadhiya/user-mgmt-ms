'use strict'

// imports
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const config = require('config')
const { initiateDbConnection } = require('./lib/db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(helmet())
app.use(cors())

const PORT = config.port || 3000

app.listen(PORT, () => {
    console.info(`Server is up and running on PORT: ${PORT}`);
})

// connect to db
initiateDbConnection(config.database)

// connection check if service is up or not
app.get('/api/check', (req, res) => {
    res.status(200).send('service is healthy!')
})

// routes
const userRoute = require('./routes/userRoute')
app.use('/api', userRoute)

module.exports = app
