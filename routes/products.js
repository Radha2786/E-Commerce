const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Review = require("../models/review")
const {validateProduct} = require('../middleware');

router.get("/products", async (req, res) => {
  try{
    // console.log("products page of routes");
  const products = await Product.find();
  res.render("products/index", { products });
  }
  catch(e){
    res.render('error',{err:e.message})
  }
  
});

router.get("/products/new",async (req, res) => {
  try{
    res.render("products/new");
  }
  catch(e){
    res.render('error',{err:e.message})
  }
  
});

router.post("/products", validateProduct,async (req, res) => {
  try{
    const { name, img, price, desc } = req.body;
    await Product.create({ name,img, price, desc });
    res.redirect("/products");
  }
  catch(e){
    res.render('error',{err:e.message})
  }

});

// display a particular product 

router.get('/products/:id',async(req,res)=>{
  try{
    const {id} = req.params;
    const product=await Product.findById(id).populate('reviews');
    // console.log(product);
    res.render('products/show',{product});
  }
  catch(e){
    res.render('error',{err:e.message})

  }
 
})

// edit a particular product

router.get('/products/:id/edit', async(req,res)=>{
  try{
    const {id} = req.params;
    const product=await Product.findById(id);
    res.render('products/edit',{product});
  }
  catch(e){
    res.render('error',{err:e.message})
  }

})

router.patch('/products/:id',validateProduct,async(req,res)=>{
  try{
    const {id} =  req.params;
  const{name,img,price,desc}=req.body;
  await Product.findByIdAndUpdate(id,{name,img,price,desc});
  res.redirect(`/products/${id}`);
  }
  catch(e){
    res.render('error',{err:e.message})
  }
  
})

router.delete('/products/:id',async(req,res)=>{
  try{
  const {id} = req.params ;
  await Product.findByIdAndDelete(id);
  res.redirect('/products');
  }
  catch(e){
    res.render('error',{err:e.message})
  }

})

module.exports = router;

