const express = require("express");
const path = require('path')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assests/')
    },
    filename: function (req, file, cb) {
        let obj = path.extname(file.originalname)
        cb(null, Date.now() + obj)
    }
})
let imageUpload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
            cb(null, true)
        } else {
            console.log("file type is not supported jpg & png is supported");
            cb(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 3
    }
})
module.exports = imageUpload
