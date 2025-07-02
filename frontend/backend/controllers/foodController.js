import fs from 'fs';
import foodModel from '../models/foodModel.js';

// ✅ Add food item
const addFood = async (req, res) => {
  const image_filename = req.file?.filename; // Handles undefined cases too

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename, // exact filename including extension
  });

  try {
    await food.save();
    res.json({ success: true, message: 'Food Added' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error while adding food' });
  }
};

// ✅ Get all food
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error fetching food list' });
  }
};

// ✅ Remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.json({ success: false, message: 'Food item not found' });
    }

    // Check if image file exists before deleting
    const imagePath = `uploads/${food.image}`;
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Food Removed' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error removing food' });
  }
};

export { addFood, listFood, removeFood };
