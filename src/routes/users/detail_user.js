const express = require("express");
const { check_product_authorization } = require("../../middleware/permission");
const user = require("../../model/user");
const detailUser = express.Router();

detailUser.get('/detail/:id', async (req, res) => {
    try {
        let _id = req.params.id;
        let findResult = await user.findById(_id);
        console.log(findResult);
        if (findResult) {
            res.json({ data: findResult })
        } else {
            res.json({ error: 'User not found ' })
        }
    } catch (error) {
        console.log(error);
        if (error && error.code) {
            res.status(error.code).send(error)
        } else {
            res.send(error)
        }
    }
})

module.exports = detailUser;    