"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController"); // Adjust path if necessary
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware")); // Adjust path if necessary
const router = express_1.default.Router();
// Route for user login
router.post('/login', authController_1.login);
// Route for user signup
router.post('/signup', authController_1.signup);
// Example of a protected route
router.get('/profile', authMiddleware_1.default, (req, res) => {
    // Only accessible if user is authenticated (i.e., has a valid JWT)
    res.json({ msg: 'Welcome to your profile', user: req.user });
});
exports.default = router;
