const express = require("express");
const user = require("../../model/user");
const order = require("../../model/order");
const getListOrderRoute = express.Router();

getListOrderRoute.get('/list/:id', async (req, res) => {
    try {
        let userId = req.params.id;
        let getUser = await user.find({ userId: userId })
        if (getUser) {
            let orderList = await order.find({ userId: userId })
            res.json({ data: orderList })
        } else {
            res.json({ error: 'User not found ' })
        }
    } catch (error) {
        if (error && error.code) {
            res.status(error.code).send(error);
        } else {
            res.send(error);
        }
    }
})

module.exports = getListOrderRoute;
