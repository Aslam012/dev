const mongoose = require('mongoose');

exports.initialize_mongo_connection = async () => {
    try {
        // let mongoDB = "mongodb+srv://admin:admin@cluster0.fdqlf.mongodb.net/?retryWrites=true&w=majority";
        let mongoDB =  "mongodb+srv://shoaib:shoaib@deviil.6pvkh.mongodb.net/?retryWrites=true&w=majority"
        await mongoose.connect(mongoDB);
        console.log("MongoDb Connected Successfully");
    } catch (error) {
        console.log(error);
        console.log('Retrying to connect to Mongodb')
        setTimeout(data => {
            this.initialize_mongo_connection()
        }, 1000)
    }
}

