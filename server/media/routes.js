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
// router.get("/", async (req: any, res: any) => {
//   return controller.index(req, res);
// });
// router.get("/spaces/:id", async (req: any, res: any) => {
//   return controller.getBySpace(req, res);
// });
// router.get("/:id", async (req: any, res: any) => {
//   return controller.get(req, res);
// });
router.post("/upload", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return controller.upload(req, res);
}));
// router.put("/:id", async (req: any, res: any) => {
//   return controller.update(req, res);
// });
// router.delete("/:id", async (req: any, res: any) => {
//   return controller.delete(req, res);
// });
module.exports = router;
