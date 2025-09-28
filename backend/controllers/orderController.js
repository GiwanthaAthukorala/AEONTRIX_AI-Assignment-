const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const nodemailer = require("nodemailer");

const sendOrderEmail = async (email, order) => {
  try {
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const itemsList = order.items
      .map(
        (item) =>
          `${item.name} (Size: ${item.size}) - $${item.price} x ${
            item.quantity
          } = $${(item.price * item.quantity).toFixed(2)}`
      )
      .join("\n");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Order Confirmation - #${order._id}`,
      html: `
        <h2>Thank you for your order!</h2>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Order Date:</strong> ${new Date(
          order.orderDate
        ).toLocaleDateString()}</p>
        <h3>Order Summary:</h3>
        <pre>${itemsList}</pre>
        <h3>Total: $${order.totalPrice.toFixed(2)}</h3>
        <p>We'll notify you when your order ships.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

exports.createOrder = async (req, res) => {
  try {
    let cart;
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id }).populate(
        "items.product"
      );
    } else {
      const sessionId = req.headers["session-id"];
      cart = await Cart.findOne({ sessionId }).populate("items.product");
    }

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total and prepare order items
    let totalPrice = 0;
    const orderItems = cart.items.map((item) => {
      const itemTotal = item.product.price * item.quantity;
      totalPrice += itemTotal;

      return {
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        size: item.size,
        quantity: item.quantity,
      };
    });

    const order = new Order({
      user: req.user ? req.user._id : null,
      items: orderItems,
      totalPrice,
    });

    await order.save();

    // Clear cart
    cart.items = [];
    await cart.save();

    // Send confirmation email
    if (req.user) {
      await sendOrderEmail(req.user.email, order);
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const orders = await Order.find({ user: req.user._id }).sort({
      orderDate: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
