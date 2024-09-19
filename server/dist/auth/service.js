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
const User = require("../models/user");
const bcrypt = require("bcrypt");
const ActiveSession = require("../models/activeSession");
const utils = require("../utils/generalUtils");
module.exports.createUser = (values) => __awaiter(void 0, void 0, void 0, function* () {
    //This layer is where data manipulation will occur. It's okay to have some logic here, but it should be minimal.
    // It's also OK to include some critical validation here in case the service is called by another service.
    const hashedPassword = yield bcrypt.hash(values.password, 10);
    return User.create(Object.assign(Object.assign({}, values), { password: hashedPassword })).then((user) => {
        return user;
    });
});
module.exports.createActiveSession = (userId, token, tokenExpiry) => __awaiter(void 0, void 0, void 0, function* () {
    return ActiveSession.create({
        userId,
        token,
        tokenExpiry,
    });
});
module.exports.getUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ email });
        // .populate({
        //   path: "locations",
        //   populate: {
        //     path: "spaces",
        //   },
        // })
        // .exec();
        return user;
    }
    catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
});
// might try to make this one with getUserbyEmail
module.exports.getUserbyID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return User.findOne({ _id: id }).then((user) => {
        return user;
    });
});
module.exports.generateToken = () => {
    return utils.generateToken();
};
module.exports.updateUser = (id, newvalues) => __awaiter(void 0, void 0, void 0, function* () {
    return User.updateOne({ _id: id }, {
        $set: Object.assign({}, newvalues),
    }).then((user) => {
        return user;
        // if (res.modifiedCount === 1) return true;
        // else return false;
    });
});
// module.exports.deleteSession = async (token: string) => {
//   return ActiveSession.deleteMany({ token: token });
// };
