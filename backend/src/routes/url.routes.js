const express = require("express");
const {
  createUrl,
  gotoUrl,
  editUrl,
  getUrls,
  deleteUrl,
} = require("../controllers/urlController");
const { route } = require("./auth.routes");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

const router = express.Router();

router.post("/create", createUrl);
router.get("/:shortenId", gotoUrl);
router.put("/edit", jwtMiddleware, editUrl);
router.delete("/delete", jwtMiddleware, deleteUrl);
router.get("/urls/:userId", jwtMiddleware, getUrls);

module.exports = router;
