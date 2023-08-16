const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating:{
        type: Number,
        min:0,
        max:5,
    },
    comment:{
        type:String,
        trim:true,
    },
   
}, {timestamps:true          // timestamps se automatically 2 fields add ho jayenge that is created at and updated at 
})

const Review = mongoose.model('Review',reviewSchema);
module.exports = Review ;