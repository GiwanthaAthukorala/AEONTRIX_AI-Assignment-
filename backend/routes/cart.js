const express = require("express");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, getCart);
router.post("/add", auth, addToCart);
router.put("/:itemId", auth, updateCartItem);
router.delete("/:itemId", auth, removeFromCart);

// Guest cart routes (without auth)
router.get("/guest", getCart);
router.post("/guest/add", addToCart);
router.put("/guest/:itemId", updateCartItem);
router.delete("/guest/:itemId", removeFromCart);

module.exports = router;
