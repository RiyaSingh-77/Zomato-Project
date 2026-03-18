const foodModel = require('../models/food.model');
const storageServices = require('../services/storage.service');
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

module.exports = {
    createFoodItem,
    getFoodItems
}