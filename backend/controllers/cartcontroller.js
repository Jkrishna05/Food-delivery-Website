import userModel from "../models/userModel.js";

let adduserCart = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ from JWT
    const { Itemid } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartdata = user.cartdata || {};

    cartdata[Itemid] = (cartdata[Itemid] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartdata });

    res.json({ success: true, cartdata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

let removeuserCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { Itemid } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartdata = user.cartdata || {};

    if (cartdata[Itemid]) {
      cartdata[Itemid] -= 1;
      if (cartdata[Itemid] <= 0) {
        delete cartdata[Itemid];
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartdata });

    res.json({ success: true, cartdata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

let getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartdata: user.cartdata || {} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export { adduserCart, removeuserCart, getCart };
