const express = require("express");
const { generate_token } = require("../../middleware/jwt_auth");
const user = require("../../model/user");
const loginRouter = express.Router();

loginRouter.post('/login', async (req, res) => {
    try {
        let body = req.body
        console.log(body,'body')
        // let getUser = await user.findOne({ email: body.email });
        let getUser = await user.findOne({email: body.email });
        console.log(getUser, 'yyyyyyyy');
        if (getUser) {
            if (getUser.email == body.email && getUser.password == body.password) {
                // const token = await generate_token({ _id: getUser._id })
                // console.log(token, 'tpken')
                return res.send({
                    role: getUser.role,
                    code: 200, message: 'Login Successfully' 
                    // token: token
                })
            }

        } else {
            res.json({ code: 503, message: 'Invalid username or password' })

        }
    } catch (error) {
        if (error && error.code) {
            res.status(error.code).send(error)
        } else {
            res.send(error)
        }
    }
})
module.exports = loginRouter;
