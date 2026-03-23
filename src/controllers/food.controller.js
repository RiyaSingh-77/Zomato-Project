const foodModel = require('../models/food.model');
const likeModel = require('../models/likes.model');
const storageServices = require('../services/storage.service');
const saveModel = require('../models/save.model');
const { v4: uuid } = require("uuid")

async function createFoodItem(req, res) {
    try {
        if(!req.file) {
            return res.status(400).json({ message: "No file uploaded" })
        }

        const fileUploadResult = await storageServices.uploadFile(req.file.buffer, uuid())

        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner._id
        })

        console.log(fileUploadResult)

        res.status(201).json({
            message: "food created successfully",
            food: foodItem
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" })
    }
}

async function getFoodItems(req, res) {
    try {
        const foodItems = await foodModel.find({})
        res.status(200).json({
            message: "Food items fetched successfully",
            foodItems
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" })
    }
}

async function likeFood(req, res) {
    const {foodId} = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({ 
        user: user._id,
        food: foodId
     })
     if(isAlreadyLiked){
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate (foodId, {
            $inc: { likeCount: -1 }
        }) 
    
        return res.status(200).json({ 
            message: "Food unliked successfully",
        })
     }
     
    const like = await likeModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate (foodId, {
        $inc: { likeCount: 1 }
    })

    res.status(201).json({
        message: "Food liked successfully",
        like
    })
    
}

async function saveFood(req, res) { 
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })
    if(isAlreadySaved){
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })
        await foodModel.findByIdAndUpdate(foodId, { $inc: { savesCount: -1 } }) 
        return res.status(200).json({
            message: "Food unsaved successfully",
            save: false 
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, { $inc: { savesCount: 1 } })

    res.status(201).json({
        message: "Food saved successfully",
        save: true
    })
}

async function getSavedFoodItems(req, res) {
    try {
        const user = req.user;
        const savedItems = await saveModel.find({ user: user._id }).populate('food')
        const foodItems = savedItems.map(item => item.food)
        res.status(200).json({
            message: "Saved foods retrieved successfully",
            foodItems
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" })
    }
}

async function deleteFood(req, res) {
    try {
        const { id } = req.params;
        const foodPartner = req.foodPartner;

        const foodItem = await foodModel.findById(id);
        
        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }

        if (foodItem.foodPartner.toString() !== foodPartner._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await foodModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Food deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}




module.exports = {
    createFoodItem,
    getFoodItems,
    likeFood,
    saveFood,
    getSavedFoodItems,
    deleteFood
}