const express= require('express');
const router = express.Router();
const Product = require('../models/product');
const Review = require('../models/review');

router.post('/products/:productid/review',async (req,res)=>{
    const {rating,comment} = req.body;
    const review = new Review({rating,comment});
    const {productid} = req.params ;
    const product=await Product.findById(productid);
    product.reviews.push(review);   // internally mongoose is review ki id nikaal lega aur usko push kar dega reviews array m

    // const review = new Review({...req.body})         another way that we can use 
    // console.log(req.body);
    review.save();
    product.save();
    // res.send('Review added');
    // console.log(review);
    res.redirect(`/products/${productid}`)
});


module.exports = router;