const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
    id:{
        type : Number,
        required : true,
        unique : true
    },
    userId:{
        type : Number,
        required : true,
        unique : true
    },
    userName: {
        type : String,
        required : true,
        unique : true
    },
    userEmail: {
        type : String,
        required : true,
    },
    userPhone: {
        type : String,
        required : false,
    },
    userGender: {
        type : String,
        required : false,
    },
    userAddress: {
        type : String,
        required : false,
    },
    courseId:{
        type : Number,
        required : true,
    }, 
    courseTopic:{
        type : String,
        required : true,
    },
    subscriptionDate: {
        type : Date,
        required : false,
    },
    confirmed: {
        type : Boolean,
        required : true,
    },
    payed:{
        type : Object,
        required : true
    }
});

const SubscriptionModel = mongoose.model("Subscription", SubscriptionSchema);

module.exports = SubscriptionModel;