"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const service = require("./service");
// const emailService = require("../email/service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const utils = require("../utils/generalUtils");
module.exports.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, email, password, acceptTerms } = req.body;
        console.log(req.body);
        if (!firstName || !email || !password) {
            return res.status(409).json({
                message: "All fields are mandatory.",
            });
        }
        // if (!acceptTerms) {
        //   return res.status(409).json({
        //     message: "Please read and accept our Terms and Conditions.",
        //   });
        // }
        const userExists = yield service.getUser(email);
        if (userExists) {
            return res.status(409).json({
                message: "User already registered.",
            });
        }
        if (password.length < 8) {
            return res.status(409).json({
                message: "Password must be at least 8 characters long",
            });
        }
        let user = yield service.createUser(req.body);
        if (user) {
            // await emailService.verifyEmail(email, user._id);
            // await emailService.listEmail(user, "owner");
            return res.status(200).json(user);
        }
        else {
            return res.status(400).json({
                message: "A problem occured when registering the user. Please advise the system administrator",
            });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
module.exports.loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(406).json({ message: "All fields are required." });
        }
        const user = yield service.getUser(email);
        const userDetails = {
            _id: user === null || user === void 0 ? void 0 : user._id,
            email: user === null || user === void 0 ? void 0 : user.email,
            password: user === null || user === void 0 ? void 0 : user.password,
        };
        if (user) {
            bcrypt.compare(password, userDetails.password, function (err, isMatch) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (isMatch) {
                        // const token = jwt.sign(userDetails.toJSON(), process.env.JWT_KEY, {
                        const token = jwt.sign(userDetails, process.env.JWT_SECRET, {
                            expiresIn: 2592000000,
                            // expiresIn: remember ? 2592000000 : 86400000, // 1 month (2592000000) , 1 day (86400000)
                        });
                        const currentTime = new Date().getTime();
                        const tokenExpiry = currentTime + 2592000000;
                        // currentTime + (remember ? 2592000000 : 86400000);
                        yield service.updateUser(user._id, { lastLoggedIn: currentTime });
                        const session = yield service.createActiveSession(user._id, token, tokenExpiry);
                        console.log(isMatch);
                        return res.status(200).json({ session, user, token });
                    }
                    else {
                        return res.status(401).json({ message: "Wrong credentials" });
                    }
                });
            });
        }
        else {
            return res.status(401).json({ message: "Wrong credentials" });
        }
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: "Error occurred while logging in." });
    }
});
module.exports.resendVerification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield service.getUserbyID(req.params.id);
        if (user) {
            // await emailService.verifyEmail(user.email, user.id);
            return res.status(200).json({
                message: "A reset link has been sent. Please check your email",
            });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
module.exports.forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const errors = [];
        if (!email) {
            errors.push({ message: "Please enter email." });
        }
        const user = yield service.getUser(email);
        if (!user || user.length == 0) {
            return res.status(401).json({ message: "User does not exist." });
        }
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors });
        }
        const token = utils.generateToken();
        const newvalues = {
            resetPass: true,
            accountVerification: true,
            resetToken: token,
        };
        let updatedUser = yield service.updateUser(user._id, newvalues);
        if (updatedUser) {
            // await emailService.forgotPassword(email, user._id);
            return res.status(200).json({
                message: "A reset link has been sent. Please check your email",
            });
        }
        else {
            return res.status(500).json({ message: "Updated user error." });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
module.exports.resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { password } = req.body;
        const errors = [];
        if (password.length < 8) {
            errors.push({ message: "Password must be at least 8 characters" });
        }
        if (errors.length > 0) {
            console.log("errors");
            return res.status(400).json({ message: errors });
        }
        // password hashing
        const hashedPassword = yield bcrypt.hash(password, 10);
        const newvalues = {
            resetToken: null,
            resetPass: false,
            password: hashedPassword,
        };
        let updatedUser = yield service.updateUser(id, newvalues);
        if (updatedUser) {
            return res.status(200).json({ message: "Password reset successful." });
        }
        else {
            return res.status(500).json({ message: "Password reset failed." });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
module.exports.checkResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield service.getUserbyID(id);
        if (user) {
            if (user.resetPass == true) {
                return res
                    .status(200)
                    .json({ message: "Reset password request is valid." }); // reset password was made for this user
            }
            else {
                return res.status(498).json({
                    message: "Link has expired.",
                });
            }
        }
        else {
            return res.status(404).json({ message: "No user found" });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Link is not valid." });
        // return res
        //   .status(500)
        //   .json({ message: "Error occurred while checking reset password." });
    }
});
module.exports.verifyAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recordExists = yield service.getUserbyID(req.params.id);
        if (!recordExists) {
            return res.status(401).json({ message: "Link is invalid." });
        }
        const newvalues = { accountVerification: true };
        let user = yield service.updateUser(req.params.id, newvalues);
        if (user) {
            return res
                .status(200)
                .json({ message: "Account verification successful." });
        }
        else {
            return res.status(404).json({ message: "Account verification failed." });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
module.exports.logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.headers.authorization;
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimStart();
        }
        yield service.deleteSession(token);
        res.status(200).json({ message: "User successfully logged out." });
    }
    catch (err) {
        res.status(500).json({ message: "Error occurred while logging out." });
    }
});
