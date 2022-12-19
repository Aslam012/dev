const express = require("express");
const { ordersendMail } = require("../../middleware/mail");
const order = require("../../model/order");
const createOrderRouter = express.Router();

createOrderRouter.post('/create-order', async (req, res) => {
    try {
        let body = req.body;
        let new_order = new order(body);
        let result = await new_order.save();
        if (result) {
            await ordersendMail(body);
            res.json({ orderId: result._id, message: 'Your order has place successfully' })
        } else {
            res.json({ message: 'Your order has not placed' })
        }

    } catch (error) {
        if (error && error.code) {
            res.status(error.code).send(error)
        } else {
            res.send(error)
        }
    }
})

module.exports = createOrderRouter;