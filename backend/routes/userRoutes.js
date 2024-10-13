const express = require("express");
const { editProfile, verifyAccount,checkToken, getUser } = require("../controllers/userController");

const router = express.Router();


router.post("/editProfile",editProfile);

router.post("/verifyAccount",verifyAccount);

router.post("/checkToken",checkToken);

router.post("/getUser" , getUser)

module.exports = router;