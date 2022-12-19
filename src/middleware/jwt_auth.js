const jwt = require('jsonwebtoken');
const user = require('../model/user');
let secretKey = 'pocSecrete'
exports.generate_token = async (userInfo) => {
    try {
        let token = jwt.sign(userInfo, secretKey, { expiresIn: "2h" });
        return token
    } catch (error) {
        throw error
    }
}


exports.verify_token = async (token) => {
    try {
        if (token) {
            if (token.includes('Bearer')) { throw { code: 401, message: 'Invalid Token' } }
            let decode_token = jwt.verify(token, secretKey);
            if (decode_token) {
                let get_user = await user.findById(decode_token._id).lean()
                if (!get_user) {
                    res.send({ code: 401, message: 'Invaild Token' })
                }
                return { _id: get_user._id, role: get_user.role}
            } else {
                res.send({ code: 401, message: 'Token Expired' })
            }
        } else {
            res.send({ code: 503, message: 'Please Provide a authorization token' })
        }

    } catch (error) {
        if (error && error.code) {
            res.status(error.code).send(error)
        } else {
            res.send(error)

        }
    }
}