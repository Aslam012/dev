const express = require("express");
const { sendwelcomeEmail, sendMail } = require("../../middleware/mail");
const user = require("../../model/user");
const createUserRoute = express.Router();

createUserRoute.post('/sign-in', async (req, res) => {
    try {
        let body = req.body;
        if (body == null || body == undefined) {
            res.send({ code: 503, message: "Please pass the body" });
        }
        let get_user = await user.find({ email: body.email });
        if (get_user.length) {
            res.send({ code: 409, message: 'User Email already exists' });
        } else {
            let new_user_model = new user(body);
            let response = await new_user_model.save();
            if (response) {
                await sendMail(response);
                res.send({code: 200, message: 'User Added Successfully' });
            } else {
                res.send({ code: 503, message: "Something went wrong" });
            }
        }
    }
    catch (error) {
        if (error && error.code) {
            res.status(error.code).send(error)
        } else {
            res.send(error)
        }
    }
})

module.exports = createUserRoute;