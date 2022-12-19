const express = require("express");
const { check_product_authorization } = require("../../middleware/permission");
const user = require("../../model/user");
const updateUser = express.Router();

updateUser.put('/update/:id', async (req, res) => {
    try {
        // await check_product_authorization(req.user);
        let _id = req.params.id
        let result = await user.findById(_id);
        if (result) {
            await user.updateOne({ _id }, { $set: req.body, new: true })
            res.send({code :200, message: "User is update." });
        } else {
            res.send({code :509, message: 'User not found' })
        }
    } catch (error) {
        console.log(error)
        if (error && error.code) {
            res.status(error.code).send(error)
        
        } else {
            res.send(error)

        }
    }
})

module.exports = updateUser;