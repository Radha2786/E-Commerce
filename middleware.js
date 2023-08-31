const { session } = require("passport");
const { productSchema, reviewSchema } = require("./Schemas");
const Product = require("./models/product");

module.exports.validateProduct = (req, res, next) => {
  const { name, img, price, desc } = req.body;
  const { error } = productSchema.validate({ name, img, price, desc });
  if (error) {
    const msg = error.details.map((err) => err.message).join(",");
    return res.render("error", { err: msg });
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { rating, comment } = req.body;
  const { error } = reviewSchema.validate({ rating, comment });
  if (error) {
    const msg = error.details.map((err) => err.message).join(",");
    return res.render("error", { err: msg });
  }
  next();
};

module.exports.isLoggedIn = (req, res, next) => {
  // console.log(req.xhr);
  req.session.returnUrl = req.originalUrl;
  //   console.log(req.session);
  if(req.xhr && !req.isAuthenticated()){
    req.flash("error", "You need to login first to do that!");
    return res.status(401).json({msg:'You need to login first'})
  }

  if (!req.isAuthenticated()) {
    req.flash("error", "You need to login first to do that!");
    return res.redirect("/login");
  }
  next();
};

module.exports.isSeller = (req, res, next) => {
  if (!req.user.role || req.user.role !== "seller") {
    req.flash("error", "You don't have permission to do that");
    return res.redirect("/products");
  }
  next();
};

module.exports.isProductAuthor = async (req, res, next) => {
  // getting a product id
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product.author && product.author.equals(req.user._id)) {
    return next();
  } else {
    req.flash("error", "You don't have permission to do that");
    res.redirect(`/products/${id}`);
  }
};

// const { productSchema,reviewSchema } = require('./schemas');

// module.exports.validateProduct = (req, res, next) => {

//     const { name, img, desc, price } = req.body;
//     const { error} = productSchema.validate({ name, img, price, desc });

//     if (error) {
//         const msg = error.details.map((err)=>err.message).join(',')
//         return res.render('error', { err: msg });
//     }

//     next();

// }

// module.exports.validateReview = (req,res,next) => {

//     const { rating, comment } = req.body;
//     const { error } = reviewSchema.validate({ rating, comment });

//     if (error) {
//         const msg = error.details.map((err)=>err.message).join(',')
//         // console.log(msg);
//         return res.render('error', { err: msg });
//     }
//     next();
// }
