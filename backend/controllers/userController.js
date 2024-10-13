const UserModel = require("../models/UserModel");
const TokenModel = require("../models/TokenModel");

const {ObjectId} = require("mongodb");


const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendEmail = require('../utils/sendEmail');

const subscription = require("../utils/subscription");
const { isValidDate } = require("../utils/isValidDate");




const editProfile = async (req,res)=>{
    const {id, username, password, fullname, email, phone, address, birthDate, gender, course} = req.body;
    const payed = [
        {label : "month1", value : false},
        {label : "month2", value : false},
        {label : "month3", value : false},
        {label : "month4", value : false},

    ];
    let subscribe = false;

    bcrypt.hash(password, 10, async(err, passwordHash)=>{
        if(err){
            console.error(err);
            return res.status(500).json({message : "server error"})
        }
        else{
            const usernameCheck = await UserModel.findOne({username : username, _id : {$ne : id}});
            const emailCheck = await UserModel.findOne({email : email, _id : {$ne : id}});

            
            if(emailCheck){
                return res.status(404).json({message : "email exist"});

            }
            else if(usernameCheck){
                return res.status(404).json({message : "username exist"});
            } 
            else if(!usernameCheck && !emailCheck){
                const user = await UserModel.findOne({_id : id});
                if(user){
                    
                    await UserModel.updateOne({_id : id},
                        {
                            username, 
                            fullname, 
                            email, 
                            password : passwordHash , 
                            phone,
                            address, 
                            birthDate,
                            gender, 
                        }
                    );

                    if(course !== "none"){
                        await subscription(user, course, false, payed);
                        subscribe = true;
                    }

                    
                    const token = crypto.randomBytes(32).toString("hex");
                    await TokenModel.deleteMany({id : id});
                    await TokenModel.create({id : id, token : token});   
                    const url = `${process.env.BASE_URL}/editProfile/${id}/${token}`;
                    await sendEmail(email, "Edit Profile", url, user, password);
                    return res.status(200).json({message : "success",subscribe, user : user});
                
                } 
                else {
                    return res.status(404).json({message : "No Acount"});
                }
            }
        }
        
            
    });
}



const verifyAccount = async (req,res)=>{
    const {id, token} = req.body;
    try {
        const objId = new ObjectId(id);
    } catch (error) {
       return res.status(404).json({message : "Bad Id"});
    }
    const userCheck = await UserModel.findOne({_id : id});
    const tokenCheck = await TokenModel.findOne({id : id});
    if(!userCheck){
        return res.status(404).json({message : "No Account"});
    }
    else if(!tokenCheck){
        return res.status(404).json({message : "Expired Token"});
    }
    else if(userCheck && tokenCheck){
        if(tokenCheck.token === token){
            await TokenModel.deleteOne({id : id});
            const user = await UserModel.updateOne({_id : id}, {verified : true});
            return res.status(200).json({message : "success", user: user})
        }
        else{
            return res.status(404).json({message : "Wrong Token"})
        }
    }
}

const checkToken = async(req,res)=>{
    const {id, token} = req.body;
    try {
        const objId = new ObjectId(id);
    } catch (error) {
       return res.status(404).json({message : "Bad Id"});
    }
    const tokenCheck = await TokenModel.findOne({id : id});
    if(!tokenCheck){
        return res.status(404).json({message : "Expired Token"});
    }
    else if(tokenCheck){
        if(tokenCheck.token === token){
            await TokenModel.deleteOne({id : id});
            const user = await UserModel.findOne({_id : id});
            return res.status(200).json({message : "success", user: user})
        }
        else{
            return res.status(404).json({message : "Wrong Token"})
        }
    }
};



const getUser = async(req, res)=>{
    const {value, key}  = req.body;
    let users;
    if(key === "GETAll"){
        users = await UserModel.find({});

    }
    else if(key === "email" || key === "username" || key === "address" || key === "fullname" || key === "birthDate"){
        users = await UserModel.find({
            
            [key] : {$regex : value, $options : 'i'},
        });
    }
    else if (key === "subscriptionDate"){
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
            
            users = await UserModel.find({
                [key]: { $gte: startDate, $lte: endDate }
            });
        
        }
        else{
            return res.status(400).json({ error: "Invalid date format" });
        }
        
    }
    else{
        console.log(value);
        console.log(key)
        users = await UserModel.find({
            [key] : value,
        })
        
    }


    res.status(200).json({message : "success" , users});
    
    
};
module.exports = {
    editProfile,
    verifyAccount,
    checkToken,
    getUser
}