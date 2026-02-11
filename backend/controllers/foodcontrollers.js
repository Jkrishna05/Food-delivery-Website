import foodModel from "../models/foodmodel.js";
import cloudinary from "../config/cloudinary.js";

let addfood = async (req, res) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ success: false, message: "Admin access required" });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.path,          // ✅ Cloudinary URL
      imageId: req.file.filename     // ✅ Cloudinary public_id
    });

    await food.save();
    res.json({ success: true, message: "Food added" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding food" });
  }
};

let foodlist = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, foods: foods });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error" });
  }
};

let removeItem = async (req, res) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ success: false, message: "Admin access required" });
    }

    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // ✅ Delete image from Cloudinary
    if (food.imageId) {
      await cloudinary.uploader.destroy(food.imageId);
    }

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error removing food" });
  }
};

export { addfood, foodlist, removeItem };
