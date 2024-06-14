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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const fs_1 = __importDefault(require("fs"));
// S3Client.config.update({
//     region: 'us-east-1',
//     accessKeyId:'AKIA2UC27G7TK7RX6IF6',
//     secretAccessKey: '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'
// });
// const s3 = new AWS.S3();
const client = new client_s3_1.S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'AKIA2UC27G7TK7RX6IF6',
        secretAccessKey: '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'
    }
});
// fileName => output/12312/src/App.jsx
// filePath => /Users/harkiratsingh/vercel/dist/output/12312/src/App.jsx
const uploadFile = (fileName, localFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(fileName);
    console.log(localFilePath);
    const fileContent = fs_1.default.readFileSync(localFilePath);
    const command = new client_s3_1.PutObjectCommand({
        Bucket: "project-vercel",
        Key: fileName,
        Body: fileContent
    });
    try {
        const response = yield client.send(command);
        console.log(response);
    }
    catch (err) {
        console.error(err);
    }
    // (async () =>{
    //     const response  = await s3.putObject({
    //         Bucket: "project-vercel",
    //         Key: fileName,
    //         Body: fileContent
    //     }).promise();
    //     console.log(response);
    // })();  
    // const response = await s3.upload({
    //     Body: fileContent,
    //     Bucket: "vercel",
    //     Key: fileName,
    // }).promise();
    // console.log(response);
});
exports.uploadFile = uploadFile;
