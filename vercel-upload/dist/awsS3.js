"use strict";
// import AWS from "aws-sdk";
// import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import fs from "fs";
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
// // S3Client.config.update({
// //     region: 'us-east-1',
// //     accessKeyId:'AKIA2UC27G7TK7RX6IF6',
// //     secretAccessKey: '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'
// // });
// // const s3 = new AWS.S3();
// const client = new S3Client({
//     region: 'us-east-1',
//     credentials: {
//         accessKeyId: 'AKIA2UC27G7TK7RX6IF6',
//         secretAccessKey: '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'
//     }
// });
// // fileName => output/12312/src/App.jsx
// // filePath => /Users/harkiratsingh/vercel/dist/output/12312/src/App.jsx
// export const uploadFile = async (fileName: string, localFilePath: string) => {
//     console.log(fileName);
//     console.log(localFilePath);
//     const fileContent = fs.readFileSync(localFilePath);
//     const command = new PutObjectCommand({
//         Bucket: "project-vercel",
//         Key: fileName,
//         Body: fileContent
//     });
//     try {
//         const response = await client.send(command);
//         console.log(response);
//     } catch (err) {
//         console.error(err);
//     }
//     // (async () =>{
//     //     const response  = await s3.putObject({
//     //         Bucket: "project-vercel",
//     //         Key: fileName,
//     //         Body: fileContent
//     //     }).promise();
//     //     console.log(response);
//     // })();  
//     // const response = await s3.upload({
//     //     Body: fileContent,
//     //     Bucket: "vercel",
//     //     Key: fileName,
//     // }).promise();
//     // console.log(response);
// }
const aws_sdk_1 = require("aws-sdk");
const fs_1 = __importDefault(require("fs"));
// const s3 = new S3({
//     accessKeyId: "7ea9c3f8c7f0f26f0d21c5ce99d1ad6a",
//     secretAccessKey: "b4df203781dd711223ce931a2d7ca269cdbf81bb530de4548474584951b798be",
//     endpoint: "https://e21220f4758c0870ba9c388712d42ef2.r2.cloudflarestorage.com"
// })
const s3 = new aws_sdk_1.S3({
    region: 'us-east-1',
    accessKeyId: 'AKIA2UC27G7TK7RX6IF6',
    secretAccessKey: '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',
    // endpoint: 'https://s3.us-east-1.amazonaws.com'   
});
// fileName => output/12312/src/App.jsx
// filePath => /Users/harkiratsingh/vercel/dist/output/12312/src/App.jsx
const uploadFile = (fileName, localFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    const fileContent = fs_1.default.readFileSync(localFilePath);
    // const response = await s3.upload({
    //     Body: fileContent,
    //     Bucket: "project-vercel",
    //     Key: fileName,
    // }).promise();
    // console.log(response);
    const bucketPath = fileName.startsWith('/') ? fileName.slice(1) : fileName;
    const param = {
        Bucket: 'project-vercel',
        Key: bucketPath,
        Body: fileContent
    };
    const result = s3.putObject(param, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data);
        }
    });
    // const result = await s3.upload(param).promise();
    console.log(result);
});
exports.uploadFile = uploadFile;
