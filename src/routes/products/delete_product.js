const express = require("express");
const { check_product_authorization } = require("../../middleware/permission");
const product = require("../../model/product");
const deleteRouter = express.Router();

deleteRouter.delete('/:id', async (req, res) => {
    try {
        await check_product_authorization(req.user);
        let getSingleProduct = await property_model.findOne({ $and: [{ _id: req.params.id }, { is_active: true }] }).lean()
        if (getSingleProduct) {
            getSingleProduct.is_active = false
            getSingleProduct.is_deleted = true
            getSingleProduct.status = 'inactive'
            let update_property = await product.findOneAndUpdate({ _id: get_single_property._id }, { $set: get_single_property, new: true })
            if (update_property) {
                res.status(200).send({ code: 200, message: 'Product Deleted Sucessfully' })
            } else {
                res.send({ code: 503, message: 'Something Went Wrong' })
            }
        } else {
            res.send({ code: 404, message: 'Product Not Found' })
        }
    } catch (error) {
        if (error && error.code) {
            res.status(error.code).send(error)
        } else {
            res.send(error)

        }
    }
})

module.exports = deleteRouter;