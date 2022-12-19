const express = require("express");
const user = require("../../model/user");
const order = require("../../model/order");
const updateOrderRoute = express.Router();

updateOrderRoute.put("/update/:id", async (req, res) => {
    try {
        let body = {
            address: req.body.address,
            status: req.body.status,
            paymentMode: req.body.paymentMode,
            paymentStatus: req.body.paymentStatus
        }
        let updatedOrder = await order.findByIdAndUpdate(req.params.id, { $set: body, }, { new: true }
        );
        res.status(200).json({ message: 'Your order has been updated' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = updateOrderRoute;
