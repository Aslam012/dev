const express = require("express");
const product = require("../../model/product");
const getProductByIdRouter = express.Router();

getProductByIdRouter.get('/:id', async (req, res) => {
    try {
        let _id = req.params.id;
        let findResult = await product.findById(_id);
        if (findResult) {
            res.json({ data: findResult })
        } else {
            res.json({ error: 'product not found ' })
        }
    } catch (error) {
        if (error && error.code) {
            res.status(error.code).send(error)
        } else {
            res.send(error)
        }
    }
})

module.exports = getProductByIdRouter;