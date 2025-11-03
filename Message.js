//==========================================Schema for users==============================================//
//                     -This page creates the model for messages and stores it in the DB

const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    
    message: {type: String},

    location: {
        lat: {type:Number},
        long: {type:Number}
    }
    
})

module.exports = mongoose.model('message', MessageSchema)