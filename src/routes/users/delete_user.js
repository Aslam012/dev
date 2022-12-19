const express = require("express");
const { check_product_authorization } = require("../../middleware/permission");
const user = require("../../model/user");
const deleteUser = express.Router();

deleteUser.delete('/delete/:id', async (req, res) => {
    try {
        // await check_product_authorization(req.user);
        let userId = req.params.id;
        let getUser = await user.findOne({ _id: userId });
        if (getUser) {
            let result = await user.deleteOne(
                { '_id': userId },
            );
            res.send({code:200, message: "User Deleted Successfully" });
        } else {
            res.send({code:401, message: "No User found." });
        }
    } catch (error) {
        if (error && error.code) {
            res.status(error.code).send(error);
        } else {
            res.send(error);
        }
    }
})

module.exports = deleteUser;