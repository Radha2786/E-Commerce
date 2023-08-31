const express = require('express');
const router = express.Router();
const User = require('../../models/user')
const { isLoggedIn } = require('../../middleware');

router.post('/product/:productid/like',isLoggedIn,async (req,res)=>{
    const { productid } = req.params;
    // grab the current logged in user
    const user = req.user;
    const isLiked = user.wishlist.includes(productid);
    const option = isLiked ? '$pull' : '$addToSet';
    req.user = await User.findByIdAndUpdate(req.user._id,{[option]:{ wishlist:productid }},{new:true});
        
    res.send('Like api');

})

module.exports=router;

//------ Reason why we are using option key inside bracket------- 
// const obj ={name:'Radha Sharma'}
// undefined
// obj
// {name: 'Radha Sharma'}
// const x = {[name]:'Radha Sharma'}
// undefined
// x
// {Radha: 'Radha Sharma'}