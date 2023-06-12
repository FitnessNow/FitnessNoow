const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  const userDetails = req.session.currentUser;
  res.render("index", {userDetails});
});

module.exports = router;
