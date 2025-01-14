"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Dummy User Model (replace with real database logic)
const users = new Map(); // In-memory store for demo
// Login controller
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if the user exists (replace with DB logic)
        const user = users.get(username);
        if (!user) {
            res.status(400).json({ msg: 'Invalid credentials' });
            return;
        }
        // Compare provided password with stored password
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ msg: 'Invalid credentials' });
            return;
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ msg: 'Login successful', token });
    }
    catch (error) {
        res.status(500).json({ msg: 'Internal server error' });
    }
};
exports.login = login;
// Signup controller
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Check if the user already exists (replace with DB logic)
        if (users.has(username)) {
            res.status(400).json({ msg: 'User already exists' });
            return;
        }
        // Hash the password before storing it
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Store the new user (replace with DB logic)
        users.set(username, { email, password: hashedPassword });
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ msg: 'Signup successful', token });
    }
    catch (error) {
        res.status(500).json({ msg: 'Internal server error' });
    }
};
exports.signup = signup;
