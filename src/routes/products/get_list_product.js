const express = require("express");
const product = require("../../model/product");
const getListRouter = express.Router();

getListRouter.post('/list', async (req, res) => {
    try {
        let filters = { $and: [{ is_active: true }, { is_deleted: false }] }
        let sort = { updatedAt: -1 };
        let body = req.body;
        if (body && body.category) {
            let body_category = body.category;
            (body_category && body_category.length) ? filters.$and.push({ category: body_category }) : '';
            if (body.sort) {
                if (Object.keys(body.sort).length) {
                    sort = body.sort
                }
            }
        }

        let productList = await product.find(filters).sort(sort);
        productList = productList;
        if (productList) {
            let count = 0;
            if ((body.location_id && body.location_id.length == 0) || !body.location_id) {
                count = await product.count(filters);
            } else {
                count = productList.length
            }
            res.status(200).send({ data: productList, count: count })
        } else {
            res.send({ code: 404, message: 'Property Not Found' })
        }
    } catch (error) {
        if (error && error.code) {
            res.status(error.code).send(error)
        } else {
            res.send(error)
        }
    }
})

module.exports = getListRouter;