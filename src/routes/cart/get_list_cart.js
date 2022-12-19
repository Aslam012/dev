const express = require("express");
const user = require("../../model/user");
const cart = require("../../model/Cart");
const getListCartRoute = express.Router();

getListCartRoute.get('/list/:id', async (req, res) => {
    try {
        let userId = req.params.id;
        let getUser = await user.find({ userId: userId })
        if (getUser) {
            let cartList = await cart.find({ userId: userId })
            res.json({ data: cartList })
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

module.exports = getListCartRoute;
