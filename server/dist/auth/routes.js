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
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const controller = require("./controller");
// const reqAuth = require("../middleware/safeRoutes").reqAuth;
const sanitizeEmail = require("../middleware/sanitizeEmail");
router.post("/register", sanitizeEmail, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return controller.register(req, res);
}));
router.post("/login", sanitizeEmail, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return controller.loginUser(req, res);
}));
router.post("/forgotpassword", sanitizeEmail, (req, res) => {
    return controller.forgotPassword(req, res);
});
router.put("/resetpass/:id", (req, res) => {
    return controller.resetPassword(req, res);
});
router.get("/resetpass/check/:id", (req, res) => {
    return controller.checkResetPassword(req, res);
});
router.put("/verify/:id", (req, res) => {
    return controller.verifyAccount(req, res);
});
router.get("/checkSession/", (req, res) => {
    // router.get("/checkSession/", reqAuth, (req: any, res: any) => {
    res.status(200).json({ message: "Session is active and working." });
});
router.post("/logout", (req, res) => {
    return controller.logout(req, res);
});
router.post("/resendVerification/:id", (req, res) => {
    return controller.resendVerification(req, res);
});
module.exports = router;
