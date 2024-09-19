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
const Post = require("../models/post");
module.exports.index = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("here");
    return Post.find()
        .populate("user")
        .then((result) => {
        return result;
    });
});
module.exports.get = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (Post.findOne({ _id: id })
        // .populate("motorhomes")
        .then((result) => {
        return result;
    }));
});
module.exports.create = (values) => __awaiter(void 0, void 0, void 0, function* () {
    return Post.create(Object.assign({}, values)).then((result) => {
        return result;
    });
});
module.exports.update = (id, values) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(values);
    return Post.findByIdAndUpdate(id, Object.assign({}, values), { new: true }).then((result) => {
        console.log(result);
        return result;
    });
});
module.exports.delete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Post.findByIdAndDelete(id).then((result) => {
        return result;
    });
});
