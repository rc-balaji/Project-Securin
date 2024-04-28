const express = require("express");
const router = express.Router();

const { getTotalCount, getDataByIndexAndCount,getDataById } = require("../controller/CVEControllers");

router.get("/total-records", getTotalCount);

router.get("/list", getDataByIndexAndCount);

router.get("/:id", getDataById);

module.exports = router;
