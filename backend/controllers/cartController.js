import jwt from 'jsonwebtoken';
import userModel from './../models/userModel.js';

const getUserIdFromToken = (req) => {
  const token = req.headers.token;
  if (!token) return null;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};

const addToCart = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const itemId = req.body.itemId.toString();
    let userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: 'Added to cart' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const itemId = req.body.itemId.toString();
    let userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: 'Removed from cart' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

    let userData = await userModel.findById(userId);
    let rawCart = userData.cartData || {};
    let cartData = {};

    for (let key in rawCart) {
      cartData[key.toString()] = rawCart[key];
    }

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

export { addToCart, removeFromCart, getCart };
