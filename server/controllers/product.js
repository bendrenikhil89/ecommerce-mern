const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async(req,res) => {
  try{
    let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
    res.json({products});
  }
  catch(err){
    res.status(400).json({
      err: err.message,
    });
  }
}

exports.remove = async(req, res) => {
  try{
    let deleted = await Product.findOneAndRemove({slug: req.params.slug}).exec();
    res.json(deleted);
  }
  catch(err){
    res.status(400).json({
      err: err.message,
    });
  }
}

exports.read = async(req, res) => {
  try{
    let product = await Product.findOne({slug: req.params.slug})
    .populate('category')
    .populate('subs')
    .exec();
    res.json(product);
  }
  catch(err){
    res.status(400).json({
      err: err.message,
    });
  }
}

exports.update = async(req, res) => {
  try{
    if(req.body.title) {
      req.body.slug = slugify(req.body.title);  
    }
    const updated = await Product.findOneAndUpdate({slug: req.params.slug}, req.body, {new: true}).exec();
    res.json(updated);
  }
  catch(err){
    res.status(400).json({
      err: err.message,
    });
  }
}