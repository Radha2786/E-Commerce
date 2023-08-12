const Product = require("./models/product");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/shopping-app")
  .then(() => console.log("db connected"))
  .catch((e) => {
    console.log(e);
  });

const Dummy_products = [
  {
    name: "Iphone",
    img: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SXBob25lfGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=60",
    price: 100,
    desc: "Advanced camera system for better photos in any light",
  },
  {
    name: "Samsung S22",
    img: "https://images.unsplash.com/photo-1674763301490-78a9d9012e5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNhbXN1bmclMjBzMjJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    price: 90,
    desc: "Advanced camera system for better photos in any light",
  },
  {
    name: "Macbook Air",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    price: 120,
    desc: "Advanced camera system for better photos in any light",
  },
  {
    name: "Adidas Shoes",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFkaWRhcyUyMHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    price: 60,
    desc: "Advanced camera system for better photos in any light",
  },
  {
    name: "Shirt",
    img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hpcnRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    price: 20,
    desc: "Advanced camera system for better photos in any light",
  },
  {
    name: "jeans",
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    price: 30,
    desc: "Advanced camera system for better photos in any light",
  },
  {
    name: "Bicycle",
    img: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmljeWNsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    price: 400,
    desc: "Advanced camera system for better photos in any light",
  },
  {
    name: "Makeup",
    img: "https://images.unsplash.com/photo-1622799336313-e0cf42fc6180?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFrZXVwJTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    price: 200,
    desc: "Advanced camera system for better photos in any light",
  },
  {
    name: "Bag",
    img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFnfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    price: 160,
    desc: "Advanced camera system for better photos in any light",
  },
];



Product.insertMany(Dummy_products)
  .then(() => console.log("DB Seeded"))
  .catch((e) => console.log(e));
