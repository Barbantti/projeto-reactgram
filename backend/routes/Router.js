const express = require("express");
const router = express();
// User Route
router.use("/api/users", require("./UserRoutes"));
console.log("Chegou no backend");
// Photo Route
router.use("/api/photos", require("./PhotoRoutes"));

// Test route
router.get("/", (req, res) => {
  res.send("API it's on!");
});

module.exports = router;
