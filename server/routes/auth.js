const express = require('express');
const router = express.Router();

const {createOrUpdateUser} = require("../controllers/auth");
const {currentUser} = require("../controllers/auth");

//middlewars
const {authCheck} = require('../middlewares/auth');

//controllers
router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/current-user', authCheck, currentUser);

module.exports = router;