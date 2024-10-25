// controller--// userController.js


const UserModel = require('../models/userModel.js');
const HttpError = require('../models/httpErrorHaddle.js');
const bcrypt = require('bcrypt');
const emailService = require('../emailService/emailService.js');

const home = (req, res) => {
    res.status(200).json({
        message: "Hello, welcome"
    });
};

const signup = async (req, res, next) => {
    try {
        const { username, password, email, phone, password2 } = req.body;
        
        // Basic validation
        if (!username || !password || !email || !phone || !password2) {
            return next(new HttpError("Please fill all details", 422));
        }

        if (password !== password2) {
            return next(new HttpError("Passwords do not match", 422));
        }

        const newEmail = email.toLowerCase();

        // Check existing user
        const existingEmail = await UserModel.findOne({ email: newEmail });
        if (existingEmail) {
            return next(new HttpError("Email already exists", 422));
        }

        const existingPhone = await UserModel.findOne({ phone });
        if (existingPhone) {
            return next(new HttpError("Phone number already exists", 422));
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Create user first
        const newUser = new UserModel({
            username,
            email: newEmail,
            password: hashedPassword,
            phone,
            otp,
            isVerified: false
        });

        // Save user
        await newUser.save();

        // Send OTP
        const emailSent = await emailService.sendOtpEmail(newEmail, otp);
        
        if (!emailSent) {
            // If email fails, still return success but with a warning
            return res.status(201).json({
                success: true,
                message: "User created but verification email could not be sent. Please contact support.",
                data: {
                    username: newUser.username,
                    email: newUser.email,
                    phone: newUser.phone
                }
            });
        }

        return res.status(201).json({
            success: true,
            message: "Registration successful! Please check your email for OTP.",
            data: {
                username: newUser.username,
                email: newUser.email,
                phone: newUser.phone
            }
        });

    } catch (error) {
        console.error("Signup error:", error);
        return next(new HttpError("Registration failed. Please try again.", 500));
    }
};

const verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        const user = await UserModel.findOne({ email, otp });

        if (!user) {
            return next(new HttpError("Invalid OTP or email", 400));
        }

        user.isVerified = true;
        user.otp = undefined;
        await user.save();

        res.status(200).json({ 
            success: true,
            message: "Email verified successfully. You can now login." 
        });
    } catch (error) {
        next(new HttpError("OTP verification failed", 500));
    }
};

const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return next(new HttpError("User not found", 404));
        }

        if (!user.isVerified) {
            return next(new HttpError("Please verify your email first", 401));
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return next(new HttpError("Invalid password", 401));
        }

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                email: user.email,
                username: user.username
            }
        });
    } catch (error) {
        next(new HttpError("Login failed", 500));
    }
};

module.exports = {
    home,
    signup,
    signin,
    verifyOtp
};