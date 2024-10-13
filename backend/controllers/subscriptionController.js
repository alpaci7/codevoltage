const SubscriptionModel = require("../models/SubscriptionModel");
const { isValidDate } = require("../utils/isValidDate");
const subscription = require("../utils/subscription");




const subscribe = async(req, res)=>{
    const {user, course} = req.body;
    const payed = [
        {label: "month1", value : false },
        {label: "month2", value : false },
        {label: "month3", value : false },
        {label: "month4", value : false },
        
    ]
    const subscribe = await subscription(user, course, false, payed);
    if(subscribe){
        res.status(200).json({message : "success", subscribe, user});
    }
    else{
        res.status(404).json({message : "error"});
    }
};


const getSubscriptions = async(req, res)=>{
    const {value, key}  = req.body;
    let subscriptions;

    
    
    if(key === "GETAll"){
        subscriptions = await SubscriptionModel.find({});

    }
    else if(key === "userEmail" || key === "userName" || key === "userAddress"){
        subscriptions = await SubscriptionModel.find({
            
            [key] : {$regex : value, $options : 'i'},
        });
    }
    else if (key === "subscriptionDate") {
        if(isValidDate(value)){
            // Split the user input by '-' to identify what part of the date was provided
            const dateParts = value.split('-');
            let startDate, endDate;
            
            if (dateParts.length === 1) {
                // User entered only a year (e.g., '2024')
                const year = dateParts[0];
                startDate = new Date(`${year}-01-01`); // Start of the year
                endDate = new Date(`${year}-12-31`);   // End of the year
            
            } else if (dateParts.length === 2) {
                // User entered a year and month (e.g., '2024-10')
                const year = dateParts[0];
                const month = dateParts[1];
                
                startDate = new Date(`${year}-${month}-01`); // Start of the month
                endDate = new Date(`${year}-${month}-31`);   // End of the month (handles up to 31 days)
            
            } else if (dateParts.length === 3) {
                // User entered a full date (e.g., '2024-10-12')
                startDate = new Date(`${dateParts[0]}-${dateParts[1]}-${dateParts[2]}T00:00:00Z`);
                endDate = new Date(`${dateParts[0]}-${dateParts[1]}-${dateParts[2]}T23:59:59Z`); // Same day for exact match
            
            } else {
                return res.status(400).json({ error: "Invalid date format" });
            }
            
            subscriptions = await SubscriptionModel.find({
                subscriptionDate: { $gte: startDate, $lte: endDate }
            });
            
        }
        else{
            return res.status(400).json({ error: "Invalid date format" });
        }
        
    }
    else{
        console.log(value);
        console.log(key)
        subscriptions = await SubscriptionModel.find({
            [key] : value,
        })
        
    }


    res.status(200).json({message : "success" , subscriptions});
    
    
};


const confirmSubscription = async(req, res)=>{
    const {id} = req.body;
    await SubscriptionModel.updateOne({_id : id},{
        confirmed : true,
    });
    res.status(200).json({message : "success"});
}


const getSubscription = async(req, res)=>{
    const {id} = req.body;

    const subscriptions = await SubscriptionModel.find({userId : id}); 
    if(subscriptions){
        return res.status(200).json({message : "success", subscriptions});
    }
    else{
        return res.status(404).json({message : "No subscriptions"});
    }
}

module.exports = {subscribe, getSubscriptions,getSubscription, confirmSubscription};