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
const service = require("./service");
module.exports.index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service.index();
        if (response) {
            return res.status(200).json(response);
        }
        else {
            return res.status(404).json({ message: "No document found." });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
module.exports.get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service.get(req.params.id);
        if (response) {
            return res.status(200).json(response);
        }
        else {
            return res.status(404).json({ message: "Document does not exist." });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
module.exports.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const response = yield service.create(req.body);
        if (response) {
            return res.status(200).json(response);
        }
        else {
            return res.status(400).json({ message: "Error in creating document" });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
module.exports.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params.id, req.body);
        const response = yield service.update(req.params.id, req.body);
        console.log(response);
        if (response) {
            return res.status(200).json(response);
        }
        else {
            return res.status(400).json({ message: "Error updating the document." });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
module.exports.delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doesExist = yield service.get(req.params.id);
        if (!doesExist) {
            res.status(404).json("Document does not exist.");
        }
        const response = yield service.delete(req.params.id);
        if (response) {
            return res.status(200).json(response);
        }
        else {
            return res.status(400).json({ message: "Error deleting document" });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
