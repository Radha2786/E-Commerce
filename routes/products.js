const express = require("express");
const router = express.Router();
const Product = require("../models/product");
// const Review = require("../models/review")
const { validateProduct,isLoggedIn} = require('../middleware');

router.get("/products", async (req, res) => {
  try{
    // console.log("products page of routes");
  const products = await Product.find();
  res.render("products/index", { products});
  }
  catch(e){
    res.status(500).render('error',{err:e.message}) 
  }
  
});

router.get("/products/new",isLoggedIn,async (req, res) => {
  try{
    res.render("products/new");
  }
  catch(e){
    res.status(500).render('error',{err:e.message}) 
  }
  
});

router.post("/products", isLoggedIn,validateProduct,async (req, res) => {
  try{
    const { name, img, price, desc } = req.body;
    await Product.create({ name,img, price, desc });
    req.flash('success', 'Added new product successfully');
    res.redirect("/products");
  }
  catch(e){
    res.status(500).render('error',{err:e.message}) 
  }

});

// display a particular product 

router.get('/products/:id',async(req,res)=>{
  try{
    const {id} = req.params;
    const product=await Product.findById(id).populate('reviews');
    // console.log(product);
    // res.render('products/show',{product, msg: req.flash('msg') });
    res.render('products/show',{product});
  }
  catch(e){
    res.status(500).render('error',{err:e.message}) 

  }
 
})

// edit a particular product

router.get('/products/:id/edit',isLoggedIn, async(req,res)=>{
  try{
    const {id} = req.params;
    const product=await Product.findById(id);
    res.render('products/edit',{product});
  }
  catch(e){
    res.status(500).render('error',{err:e.message})
  }

})

router.patch('/products/:id',isLoggedIn,validateProduct,async(req,res)=>{
  try{
    const {id} =  req.params;
  const{name,img,price,desc}=req.body;
  await Product.findByIdAndUpdate(id,{name,img,price,desc});
  req.flash('success', 'Edited the product successfully');
  res.redirect(`/products/${id}`);
  }
  catch(e){
    res.status(500).render('error',{err:e.message}) ;
  }
  
})

router.delete('/products/:id',isLoggedIn,async(req,res)=>{
  try{
  const {id} = req.params ;
  await Product.findByIdAndDelete(id);
  req.flash('success', 'Deleted the product successfully');
  res.redirect('/products');
  }
  catch(e){
    res.status(500).render('error',{err:e.message}) ;
  }

})

module.exports = router;

