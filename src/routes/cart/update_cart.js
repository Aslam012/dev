const express = require("express");
const user = require("../../model/user");
const cart = require("../../model/Cart");
const updateCartRoute = express.Router();

updateCartRoute.put('/update/:id', async (req, res) => {
    try {
        let cardId = req.params.id
        let body = req.body
        let getUser = await user.findOne({ userId: req.body.userId })
        let getProduct = await cart.findOne({ id: cardId }).select({ products: { $elemMatch: { _id: req.body._id } } })
        if (getProduct && getUser) {
            let cartUpdate = await cart.findOneAndUpdate({ _id: cardId, "products.productId": body.productId }, { $set: { "products.$.quantity": body.quantity } }, { new: true })
            res.send({ message: "Cart is update." });
        }
        else {
            res.json({ error: 'Product not found' })
        }
    } catch (error) {
        if (error && error.code) {
            res.status(error.code).send(error);
        } else {
            res.send(error);
        }
    }
})

module.exports = updateCartRoute;