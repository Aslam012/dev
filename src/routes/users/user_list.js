const express = require("express");
const user = require("../../model/user");
const userListRouter = express.Router();
const { check_product_authorization } = require("../../middleware/permission");

userListRouter.post('/list', async (req, res) => {
    try {
        // await check_product_authorization(req.user);
        let filter = { $and: [{ "is_active": true }, { "status": "active" }] };
        let response = await user.find(filter).sort({ updatedAt: -1 });
        console.log(response);
        if (response) {
            let count = await user.count(filter) || 0
            res.status(200).send({  count: count ,data: response});
        } else {
            res.send({ code: 503, message: 'Something went wrong' });
        }
    } catch (error) {
        if (error && error.code) {
            res.status(error.code).send(error);
        } else {
            res.send(error);
        }
    }
})

module.exports = userListRouter;