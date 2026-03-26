const foodModel = require('../models/food.model');
const foodPartnerModel = require('../models/foodpartner.model');


async function getFoodPartnerById(req, res){
    try {
        const foodPartnerId = req.params.id;

        const foodPartner = await foodPartnerModel.findById(foodPartnerId)
        const foodItemsByFoodPartner = await foodModel.find({ foodPartner: 
            foodPartnerId })

        if(!foodPartner){
            return res.status(404).json({ message: "Food partner not found" });
        }
        res.status(200).json({
            message: "Food partner retrieved successfully",
            foodPartner: {
                ...foodPartner.toObject(),
                foodItems: foodItemsByFoodPartner
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

async function getMe(req, res) {
    try {
        const foodPartner = await foodPartnerModel.findById(req.foodPartner._id);
        if (!foodPartner) {
            return res.status(404).json({ message: "Food partner not found" });
        }
        res.status(200).json({ foodPartner });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}


module.exports = {
    getFoodPartnerById,
    getMe
};