const {productSchema, reviewSchema} = require('./Schemas');

module.exports.validateProduct=(req,res,next )=>{
    const{name,img,price,desc}= req.body;
    const {error}=productSchema.validate({name,img,price,desc});
    if(error){
        const msg=error.details.map((err)=>err.message).join(',');
        return res.render('error',{err:msg});
    }
    next();
}

module.exports.validatereview= (req,res,next)=>{
    const {rating,comment} = req.body();
    const {error} = reviewSchema.validate({rating,comment});
    if(error){
        const msg=error.details.map((err)=>err.message).join(',');
        return res.render('error',{err:msg});

    }
    next();
}