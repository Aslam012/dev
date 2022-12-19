const express = require("express");
const product = require("../../model/product");
const user = require("../../model/user");
const cart = require("../../model/Cart");
const deleteCartRoute = express.Router();

deleteCartRoute.put('/delete/:id', async (req, res) => {
    try {
        let cartId = req.params.id;
        let getSingleProduct = await cart.findOne({ cartId: req.body.cartId });
        if (getSingleProduct) {
            let result = await cart.updateOne(
                { '_id': cartId },
                { $pull: { products: { _id: req.body._id } } },
            );
            res.send({ message: "Cart is deleted." });
        } else {
            res.send({ message: "Product is not in cart available." });
        }
    } catch (error) {
        if (error && error.code) {
            res.status(error.code).send(error);
        } else {
            res.send(error);
        }
    }

})

module.exports = deleteCartRoute;