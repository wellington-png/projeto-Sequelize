const { Router } = require("express");
const authController = require("../controllers/authController");


const router = Router();
router.post("/auth/login", authController.login);
router.post('/auth/verifyToken', authController.verifyToken);

module.exports = router;