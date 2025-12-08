const {Router} = require("express");
const { createUser, loginUser, logoutUser } = require("../controllers/user.controller");
const { UserAuth } = require("../middleware/auth.middleware");

const router = Router();

router.post("/auth/register",createUser);
router.post("/auth/login",loginUser);
router.post("/auth/logout",UserAuth, logoutUser);

module.exports = router