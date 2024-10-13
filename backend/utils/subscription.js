const SubscriptionModel = require("../models/SubscriptionModel");
const UserModel = require("../models/UserModel");

const subscription = async(user, course, confirmed, payed)=>{
    let courseId;
    if(course === "robotics"){
        courseId = 1;
    }
    else if(course === "IoT"){
        courseId = 2;
    }
    else if(course === "PCB"){
        courseId = 3;
    }
    else if(course === "matlab"){
        courseId = 4;
    }
    else if(course === "assembly"){
        courseId = 5;
    }
    else if(course === "FPGA"){
        courseId = 6;
    }

    const subscriptionCheck = await SubscriptionModel.findOne({
        userId : user.id,
        courseId,
    });

    const userData = await UserModel.findOne({_id : user._id});

    if(!subscriptionCheck){
        const lastSubscription = await SubscriptionModel.find({}).sort({id : -1}).limit(1);  
        const subscription = await SubscriptionModel.create({
            id : lastSubscription[0].id + 1, 
            userId : userData.id,
            userName : userData.fullname,
            userEmail : userData.email,
            userGender : userData.gender,
            userPhone : userData.phone,
            userAddress: userData.address,
            courseId,
            courseTopic : course,
            confirmed,
            payed,
            subscriptionDate : Date.now()
        });
        if(subscription){
            return 1;
        }
        else{
            return 0;
        }
    }
    else{
        const subscription = await SubscriptionModel.updateOne({id : subscriptionCheck.id},{
            userId : userData.id,
            userName : userData.fullname,
            userEmail : userData.email,
            userGender : userData.gender,
            userPhone : userData.phone,
            userAddress: userData.address,
            courseId,
            courseTopic : course,
            confirmed,
            payed,
        });
        if(subscription){
            return 1;
        }
        else{
            return 0;
        }
    }
    
}


module.exports = subscription;