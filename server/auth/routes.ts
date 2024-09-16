export {};
const express = require("express");
const router = express.Router();
const controller = require("./controller");
// const reqAuth = require("../middleware/safeRoutes").reqAuth;
const sanitizeEmail = require("../middleware/sanitizeEmail");

router.post("/register", sanitizeEmail, async (req: any, res: any) => {
  return controller.register(req, res);
});

router.post("/login", sanitizeEmail, async (req: any, res: any) => {
  return controller.loginUser(req, res);
});

router.post("/forgotpassword", sanitizeEmail, (req: any, res: any) => {
  return controller.forgotPassword(req, res);
});

router.put("/resetpass/:id", (req: any, res: any) => {
  return controller.resetPassword(req, res);
});

router.get("/resetpass/check/:id", (req: any, res: any) => {
  return controller.checkResetPassword(req, res);
});

router.put("/verify/:id", (req: any, res: any) => {
  return controller.verifyAccount(req, res);
});

router.get("/checkSession/", (req: any, res: any) => {
  // router.get("/checkSession/", reqAuth, (req: any, res: any) => {
  res.status(200).json({ message: "Session is active and working." });
});

router.post("/logout", (req: any, res: any) => {
  return controller.logout(req, res);
});

router.post("/resendVerification/:id", (req: any, res: any) => {
  return controller.resendVerification(req, res);
});

module.exports = router;
