const express = require("express");
const product = require("../../model/product");
const user = require("../../model/user");
const cart = require("../../model/Cart");
const detailsCartRoute = express.Router();

detailsCartRoute.post('/detail/:id', async (req, res) => {
    try {
        let body = body
        let getUser = await user.findOne({ userId: body.userId })
        if (getUser) {
            const result = await cart.findOne({
                id: body.id,
            }).select({ products: { $elemMatch: { productId: body.productId } } })
            res.json({ data: result })
        } else {
            res.json({ error: 'User not found' })
        }
    } catch (error) {
        if (error && error.code) {
            res.status(error.code).send(error);
        } else {
            res.send(error);
        }
    }
})

module.exports = detailsCartRoute;