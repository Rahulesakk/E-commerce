const express = require("express");

const router = express.Router();

//middleware routes
const { authCheck, adminCheck } = require("../middleware/auth");

const { create,read,update,remove,list,getSubs} = require("../controller/category");

router.post("/category", authCheck, adminCheck, create);
router.get("/categories", list);
router.get("/category/:slug",  read);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);
router.get("/category/subs/:_id",getSubs);


module.exports = router;
