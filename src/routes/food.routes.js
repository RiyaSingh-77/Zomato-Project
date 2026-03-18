const express = require('express');
const foodController = require("../controllers/food.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router();
const multer = require('multer');

console.log("Food Routes Loaded!")

const upload = multer({
    storage: multer.memoryStorage(),
})



/*POST /api/food/ [protected]
only food partner can add a food item*/
router.post("/", 
    authMiddleware.authFoodPartnerMiddleware,
    upload.single('video'),
    foodController.createFoodItem);

    /* GET /api/food/ [protected] */
router.get("/",
     authMiddleware.authFoodPartnerMiddleware,
     foodController.getFoodItems);



module.exports = router;