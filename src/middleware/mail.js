var nodemailer = require('nodemailer')
const user = require('../model/user')

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    service: 'Gmail',
    auth: {
        user: "demomail099@gmail.com",
        pass: "fvflkgeapperdmql",
    }
})

// fvflkgeapperdmql
exports.sendMail = async (req, res) => {
    var mailOption = {
        form: 'demomail099@gmail.com',
        to: req.email,
        subject: 'Welcome to the demo site',
        text: "Thanks for signing up for our website! You’re joining an amazing community of shopping lovers."
    }
    transporter.sendMail(mailOption, function (error, info) {
        if (error) {
            console.log(error, 'bj')
        }
        else {
            console.log('mail has been send succefully')
        }
    })
}

exports.ordersendMail = async (req, res) => {

    let getUser = await user.findById(req.userId);
    var mailOption = {
        form: 'demomail099@gmail.com',
        to: getUser.email,
        subject: 'Order Placed',
        text: "We’re happy to let you know that we’ve received your order."
    }
    transporter.sendMail(mailOption, function (error, info) {
        if (error) {
            console.log(error, 'bj')
        }
        else {
            console.log('mail has been send succefully')
        }
    })
}
