const express = require("express");
const { check_product_authorization } = require("../../middleware/permission");
const product = require("../../model/product");
const updateRouter = express.Router();

updateRouter.put('/update/:id', async (req, res) => {
    try {
        await check_product_authorization(req.user);
        let _id = req.params.id
        let result = await product.findById(_id);
        if (result) {
            await product.updateOne({ _id }, { $set: req.body, new: true })
            res.send({ message: "Product is update." });
        } else {
            res.send({ message: 'Product not found' })
        }
    } catch (error) {
        if (error && error.code) {
            res.status(error.code).send(error)
        } else {
            res.send(error)

        }
    }
})

module.exports = updateRouter;