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
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return controller.index(req, res);
}));
// router.get("/spaces/:id", async (req: any, res: any) => {
//   return controller.getBySpace(req, res);
// });
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return controller.get(req, res);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return controller.create(req, res);
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return controller.update(req, res);
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return controller.delete(req, res);
}));
module.exports = router;
