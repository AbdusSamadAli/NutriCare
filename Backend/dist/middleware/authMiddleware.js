"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        res.status(401).json({ msg: 'No token, authorization denied' });
        return; // Explicitly return void
    }
    try {
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Assign user properties to req.user
        req.user = {
            userId: decoded.userId, // Make sure this matches the JWT payload
            username: decoded.username,
            email: decoded.email,
            role: decoded.role,
        };
        next(); // Continue to the next middleware
    }
    catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
        return; // Explicitly return void
    }
};
exports.default = authMiddleware;
