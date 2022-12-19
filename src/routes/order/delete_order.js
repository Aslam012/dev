const express = require("express");
const order = require("../../model/order");
const deleteOrderRoute = express.Router();

deleteOrderRoute.delete('/delete/:id', async (req, res) => {
    try {
        let orderId = req.params.id;
        let getSingleProduct = await order.findOne({ _id: orderId });
        if (getSingleProduct) {
            let result = await order.deleteOne(
                { '_id': orderId },
            );
            res.send({ message: "Your order has been cancelled." });
        } else {
            res.send({ message: "No order found." });
        }
    } catch (error) {
        if (error && error.code) {
            res.status(error.code).send(error);
        } else {
            res.send(error);
        }
    }
})

module.exports = deleteOrderRoute;
