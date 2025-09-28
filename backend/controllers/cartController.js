const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.getCart = async (req, res) => {
  try {
    let cart;
    if (req.user) {
      // User is logged in
      cart = await Cart.findOne({ user: req.user._id }).populate(
        "items.product"
      );
    } else if (req.query.sessionId) {
      // User is not logged in but has session
      cart = await Cart.findOne({ sessionId: req.query.sessionId }).populate(
        "items.product"
      );
    }

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, size, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!product.sizes.includes(size)) {
      return res.status(400).json({ message: "Invalid size for this product" });
    }

    let cart;
    if (req.user) {
      // User is logged in
      cart = await Cart.findOne({ user: req.user._id });
      if (!cart) {
        cart = new Cart({ user: req.user._id, items: [] });
      }
    } else {
      // User is not logged in - use session
      const sessionId = req.body.sessionId || req.headers["session-id"];
      if (!sessionId) {
        return res
          .status(400)
          .json({ message: "Session ID required for guest cart" });
      }
      cart = await Cart.findOne({ sessionId });
      if (!cart) {
        cart = new Cart({ sessionId, items: [] });
      }
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId && item.size === size
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        size,
        quantity,
      });
    }

    await cart.save();
    await cart.populate("items.product");

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    let cart;
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id });
    } else {
      const sessionId = req.headers["session-id"];
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (quantity <= 0) {
      item.remove();
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    await cart.populate("items.product");

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    let cart;
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id });
    } else {
      const sessionId = req.headers["session-id"];
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items.id(itemId).remove();
    await cart.save();
    await cart.populate("items.product");

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
