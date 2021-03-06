const Sub = require("../models/sub");
const slugify = require("slugify");

exports.create = async(req, res) => {
    try{
        const {name, parent} = req.body;
        const sub = await new Sub({name, parent, slug: slugify(name) }).save();
        res.json(sub);
    }
    catch(err){
        res.status(400).send("Create sub failed")
    }
}

exports.list = async(req, res) => {
    const subs = await Sub.find({}).sort({createdAt: -1}).exec();
    res.json(subs);
}

exports.read = async(req, res) => {
    let sub = await Sub.findOne({slug: req.params.slug}).exec();
    res.json(sub);
}

exports.update = async(req, res) => {
    const {name, parent} = req.body;
    try{
        let sub = await Sub.findOneAndUpdate({slug: req.params.slug}, {name, parent, slug:slugify(name)}, {new: true});
        res.json(sub);
    }
    catch(err){
        console.log("sub update failed");
    }
}

exports.remove = async(req, res) => {
    try{
        let sub = await Sub.findOneAndDelete({slug: req.params.slug});
        res.json(sub);
    }
    catch(err){
        res.status(400).send("Delete sub failed")
    }
}