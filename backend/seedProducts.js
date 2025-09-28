const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const products = [
  {
    name: "Classic White T-Shirt",
    description: "Comfortable cotton t-shirt for everyday wear",
    price: 1999,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHY41Uc4WOE09WXiOzOmwZlqyBK9MfVRFVCg&s",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Denim Jacket",
    description: "Stylish denim jacket for casual outings",
    price: 6999,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxMOe8l2_MQUa1-wl6HVvwcHp3FLWkS9bqvA&s",
    category: "Men",
    sizes: ["M", "L", "XL"],
  },
  {
    name: "Slim Fit Jeans",
    description: "Comfortable slim fit jeans in dark wash",
    price: 4999,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmNA8wcyncJy1-2QiwB-8BvvfNMe9U7rbdJg&s",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Summer Dress",
    description: "Light and flowy summer dress with floral pattern",
    price: 3999,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrw7r_-lMMrJZLNDxHd5wBHHTe-jn07-G2mA&s",
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Women's Hoodie",
    description: "Cozy hoodie for cold days",
    price: 2599,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrurWWa3zC5bGE7pfz4Dc393pSWmkqGQI7AA&s",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Kids T-Shirt Pack",
    description: "Pack of 3 colorful t-shirts for kids",
    price: 2100,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDRyDOpvF_fWq7ITdXWprho_HJ7CmES2vQoQ&s",
    category: "Kids",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Men's Polo Shirt",
    description: "Classic polo shirt for semi-formal occasions",
    price: 2500,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8kyfgF2yVgTZPbBHl4iiuWOjeCKcFxYrdvQ&s",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Women's Blouse",
    description: "Elegant blouse for office wear",
    price: 2000,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqDYbv7QQbn7e-XXRYVxnsWB_PDXUAqLsYlw&s",
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Kids Jeans",
    description: "Durable jeans for active kids",
    price: 1000,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxldcG6mJGv4CTzvLrifs2L4DY92y35XsNOw&s",
    category: "Kids",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Men's Sweater",
    description: "Warm wool sweater for winter",
    price: 4599,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQci88swf6e5mFeftW16ikI6AMaSRWS5b6VeA&s",
    category: "Men",
    sizes: ["M", "L", "XL"],
  },
  {
    name: "Women's Skirt",
    description: "A-line skirt perfect for any occasion",
    price: 35.99,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSA8Jmdp0f_lxRtH_cef8iE_WJsQNtV_NYBw&s",
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Kids Hoodie",
    description: "Warm and comfortable hoodie for children",
    price: 1099,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTa7KOfNTj2Krj1S5Bt1rbInjkNegmuUpFQw&s",
    category: "Kids",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Men's Shorts",
    description: "Casual shorts for summer",
    price: 1850,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKoo4us-dCDVwFeWQOu9qhRCAFXrturUDLNQ&s",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Women's Leggings",
    description: "Stretchy and comfortable leggings",
    price: 2200,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYmLmVTd0e-x1694O-RGBzLL-9TproxWyLpA&s",
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Kids Jacket",
    description: "Warm jacket for cold weather",
    price: 2000,
    imageUrl:
      "https://img.freepik.com/premium-photo/women-winter-jacket-white-background_461160-7853.jpg?semt=ais_hybrid&w=740&q=80",
    category: "Kids",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Men's Formal Shirt",
    description: "Crisp formal shirt for business meetings",
    price: 3500,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAs2efKNjpF5UnlXVeT9BhSzr0xgrkWooazg&s",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Women's Cardigan",
    description: "Soft cardigan for layering",
    price: 2899,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROtWKDLN_cCP6gDHhSmYpwZbr8ifwgCselPA&s",
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Kids Sweater",
    description: "Colorful sweater for children",
    price: 1799,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkli-l39dmos6DGsTMn-8IaF31rq6vwrREwQ&s",
    category: "Kids",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Men's Track Pants",
    description: "Comfortable track pants for sports",
    price: 2500,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrIWpQqXuom8Fw6XaEA3y_6NhUn_Wtu5J2Vw&s",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Women's Jumpsuit",
    description: "Trendy jumpsuit for fashion-forward individuals",
    price: 3500,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjuOZiuju94Rj-LWpJt5HRun9YXSSwF5CU7w&s",
    category: "Women",
    sizes: ["S", "M", "L"],
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce"
    );

    // Clear existing products
    await Product.deleteMany({});

    // Insert new products
    await Product.insertMany(products);

    console.log("Products seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
