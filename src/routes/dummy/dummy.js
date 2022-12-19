const express = require("express");
const action_dummy_Router = express.Router();


action_dummy_Router.post('/action', async (req, res) => {
    try {
        `Please Write Your Logic Here`
    } catch (error) {
        throw error
    }
})

module.exports = action_dummy_Router;