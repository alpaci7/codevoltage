const express = require("express");
const { subscribe , getSubscriptions,getSubscription, confirmSubscription} = require("../controllers/subscriptionController");

const router = express.Router();


router.post("/subscribe",subscribe);
router.post("/getSubscriptions" , getSubscriptions);
router.post("/getSubscription" , getSubscription);

router.post("/confirmSubscription", confirmSubscription);

module.exports = router;