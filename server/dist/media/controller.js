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
const AWS = require("aws-sdk");
// const sharp = require("sharp");
// const fileUpload = require("express-fileupload");
const s3Client = new AWS.S3({
    endpoint: process.env.DO_SPACES_URL,
    region: "sgp1",
    credentials: {
        accessKeyId: process.env.DO_SPACES_ID,
        secretAccessKey: process.env.DO_SPACES_SECRET,
    },
});
module.exports.upload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.files.fileUpload;
        console.log(file);
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        // Convert the file into a buffer
        const fileBuffer = file.data; // No need for Buffer.from with express-fileupload
        const params = {
            Bucket: process.env.DO_SPACES_BUCKET,
            Key: file.name, // The file name
            Body: fileBuffer, // The file buffer
            ACL: "public-read",
            ContentType: file.mimetype, // The file MIME type
        };
        const uploadResult = yield s3Client.upload(params).promise();
        console.log(uploadResult);
        if (uploadResult) {
            return res.status(200).json({ photoUrl: uploadResult.Location });
        }
        else {
            return res.status(500).json({ message: "Error uploading file" });
        }
    }
    catch (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({ message: "Error uploading file" });
    }
});
