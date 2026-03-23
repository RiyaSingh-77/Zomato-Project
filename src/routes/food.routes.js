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

     router .post("/like",
        authMiddleware.authUserMiddleware,
        foodController.likeFood);

        router.post("/save",
        authMiddleware.authUserMiddleware,
        foodController.saveFood
    )

    router.get("/saved",
    authMiddleware.authUserMiddleware,
    foodController.getSavedFoodItems
)

router.delete("/:id",
    authMiddleware.authFoodPartnerMiddleware,
    foodController.deleteFood
);


     


module.exports = router;