const express = require("express");
const { getPanShopOwnerById } = require("../controllers/panShopOrderController");

const router = express.Router();

router.route("/:id").get(getPanShopOwnerById);
module.exports = router;