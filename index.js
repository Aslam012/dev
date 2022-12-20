const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cors = require("cors");
const baseRouter = require('./src/base_router');
const { initialize_mongo_connection } = require("./src/database/mongo");
const port = process.env.PORT || 4000;

app.use(bodyParser.json()) // for parsing application/json
app.use('/assests', express.static('assests'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}))

app.get('/', (req, res) => {
    res.json({message:'Hello World!'})
})
app.use('/api', baseRouter)

app.listen(port, function (err) {
    if (err) console.log("Error in server setup")
    initialize_mongo_connection()
    console.log("Server listening on Port", port);
})