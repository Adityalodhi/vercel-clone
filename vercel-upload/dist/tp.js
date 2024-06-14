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
// import AWS form "aws-sdk";
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({
    region: 'us-east-1',
    accessKeyId: 'AKIA2UC27G7TK7RX6IF6',
    secretAccessKey: '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'
});
const s3 = new aws_sdk_1.default.S3();
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield s3.putObject({
        Bucket: "project-vercel",
        Key: "test.txt",
        Body: "Hello World!"
    }).promise();
}))();
