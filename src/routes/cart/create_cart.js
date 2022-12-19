const express = require("express");
const product = require("../../model/product");
const user = require("../../model/user");
const cart = require("../../model/Cart");
const createCartRoute = express.Router();

createCartRoute.post('/add-cart', async (req, res) => {
    try {
        let body = req.body;
        let filter = body.products.map(s => s.productId);
        let findResult = await product.findById(filter);
        let findResultUser = await user.findById(body.userId);

        if (findResultUser && findResult) {
            let add_to_cart = new cart(body);
            let response = await add_to_cart.save();
            res.json({ data: response })
        } else {
            res.json({ error: 'Product not found ' })
        }
    }
    catch (error) {
        if (error && error.code) {
            res.status(error.code).send(error);
        } else {
            res.send(error);
        }
    }
})

module.exports = createCartRoute;