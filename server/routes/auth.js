const express = require('express');
const router = express.Router();

const {createOrUpdateUser} = require("../controllers/auth");
const {currentUser} = require("../controllers/auth");

//middlewars
const {authCheck, adminCheck} = require('../middlewares/auth');

//controllers
router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/current-user', authCheck, currentUser);
router.post('/current-admin', authCheck, adminCheck, currentUser);

module.exports = router;