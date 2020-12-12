const express = require('express');
const router = express.Router();

router.get('/user', (req, res, next) => {
    res.json({
        data: "user api endpoint hit"
    })
});

module.exports = router;