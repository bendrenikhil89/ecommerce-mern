const admin = require("../firebase");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
    try{
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken);
        req.user = firebaseUser;
        next();
    }
    catch(err){
        res.status(401).json({
            err: err.message
        })
    }
}

exports.adminCheck = async(req, res, next) => {
    try{
        const {email} = req.user;
        const adminUser = await (await User.findOne({email})).exec();
        if(adminUser.role !== "admin"){
            res.status(401).json({
                err: "Admin resource. Access denied."
            })
        }
        else{
            next();
        }
    }
    catch(err){
        res.status(500).json({
            err: "Internal server error."
        })
    }
}