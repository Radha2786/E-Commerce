const express= require('express');
const router = express.Router();
const Product = require('../models/product');
const Review = require('../models/review');
const {validatereview} = require('../middleware');

router.post('/products/:productid/review',  validatereview, async (req,res)=>{
    const {productid} = req.params ;
    const {rating,comment} = req.body;

    const product=await Product.findById(productid);
    const review = new Review({rating,comment});
   

    product.reviews.push(review);   // internally mongoose is review ki id nikaal lega aur usko push kar dega reviews array m

    // const review = new Review({...req.body})         another way that we can use 
    // console.log(req.body);
    await review.save();
    await product.save();
    // res.send('Review added');
    // console.log(review);
    res.redirect(`/products/${productid}`)
});


module.exports = router;