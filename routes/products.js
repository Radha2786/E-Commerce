const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Review = require("../models/review")

router.get("/products", async (req, res) => {
  console.log("products page of routes");
  const products = await Product.find();
  res.render("products/index", { products });
});

router.get("/products/new", async (req, res) => {
  res.render("products/new");
});

router.post("/products", async (req, res) => {
  const { name, img, price, desc } = req.body;
  await Product.create({ name,img, price, desc });
  res.redirect("/products");
});

// display a particular product 

router.get('/products/:id',async(req,res)=>{
  const {id} = req.params;
  const product=await Product.findById(id).populate('reviews');
  console.log(product);
  res.render('products/show',{product});
})

// edit a particular product

router.get('/products/:id/edit', async(req,res)=>{
  const {id} = req.params;
  const product=await Product.findById(id);
  res.render('products/edit',{product});
})

router.patch('/products/:id',async(req,res)=>{
  const {id} =  req.params;
  const{name,img,price,desc}=req.body;
  await Product.findByIdAndUpdate(id,{name,img,price,desc});
  res.redirect(`/products/${id}`);
})

router.delete('/products/:id',async(req,res)=>{
  const {id} = req.params ;
  await Product.findByIdAndDelete(id);
  res.redirect('/products');
})

module.exports = router;

