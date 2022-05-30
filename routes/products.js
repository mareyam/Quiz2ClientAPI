var express = require("express");
var router = express.Router();
var Product = require("../models/product");
/* GET home page. */
router.get("/", async function(req, res, next) {
  let products = await Product.find();
  res.render("products/list",{title: "products in db", products});
});

router.get("/add", async function(req, res, next) {
  res.render("products/add");
});

router.post("/add", async function(req, res, next) {
  let product = new Product(req.body);
  await product.save();
  res.redirect("/products");
  console.log(req.body);
});

router.get("/delete/:id", async function(req,res, next) {
 let product = await Product.findByIdAndDelete(req.params.id);
 res.redirect("/products");
});

 
router.get("/cart/:id", async function(req,res, next) {
console.log("addded to cart");
let products = await Product.findById(req.params.id);
res.render(products);
});

  
router.get("/edit/:id",async function(req, res, next) {
  let product = await Product.findById(req.params.id);
  res.render("products/edit", { product });
})

router.post("/edit/:id", async function(req,res, next) {
  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  await product.save();
  res.redirect("/products");
 });


module.exports = router;
