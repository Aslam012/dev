const express = require("express");
const product = require("../../model/product");
const createRouter = express.Router();
const multer = require('multer')
const sharp = require('sharp')
const storage = require('../../middleware/img_upload')
const upload = multer(storage)
const path = require('path')
const fs = require('fs');
const { check_product_authorization } = require("../../middleware/permission");

createRouter.post('/create', async (req, res) => {
    try {
        await check_product_authorization(req.user);
        let body = req.body;
        // if (req.file) {
        //     body.image = req.file.path
        // }
        let new_product_model = new product(req.body);
        let response = await new_product_model.save();
        if (response) {
            res.status(200).send(response)
        } else {
            res.send({ code: 503, message: 'Something went wrong' })
        }
    } catch (error) {
        if (error && error.code) {
            res.status(error.code).send(error)
        } else {
            res.send(error)

        }
    }
})

module.exports = createRouter;